/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * clusterNarrative.service.ts
 *
 * Produces human-friendly summaries for clusters using:
 *  - PreprocessResult (X matrix + featureMeta + originalSheets)
 *  - KMeansResult (labels, centroids)
 *  - DBSCANMap (Map<kmeansClusterId, DBSCANResult>)
 *  - IPA results (IPAClusterResult[])
 *
 * Output: ClusterSummary[] — includes top features, DBSCAN summary, IPA highlights, narrative.
 *
 * Usage:
 *   const summaries = buildClusterSummaries(preprocessResult, kmeansResult, dbscanMap, ipaResults);
 */

import {
       DBSCANResult,
       FeatureMeta,
       IPAAttr,
       IPAClusterResult,
       KMeansResult,
       PreprocessResult,
} from "./analytics"; // adjust path to where your types live

/* ===========================
   Output Type
   =========================== */

export interface ClusterSummary {
  clusterId: number;
  size: number;
  topFeatures: Array<{ featureIndex: number; featureMeta: FeatureMeta; score: number }>;
  dbscanSummary?: { subclusterCount: number; noiseRatio: number };
  ipaHighlights?: Array<{ attributeQuestionId: string; impMean: number; perfMean: number; gap: number; quadrant: number }>;
  narrative: string;
}

/* ===========================
   Helper functions
   =========================== */

/**
 * Compute global mean per feature and cluster mean per feature.
 * - pre.X: n x p normalized matrix
 * - labels: KMeansResult.labels length n
 *
 * Returns:
 *  - globalMeans: number[p]
 *  - clusterMeans: Map<clusterId, number[p]>
 */
function computeFeatureMeans(pre: PreprocessResult, labels: number[]): {
  globalMeans: number[];
  clusterMeans: Map<number, number[]>;
} {
  const { X } = pre;
  const n = X.length;
  const p = pre.featureMeta.length;

  const globalSums = new Array<number>(p).fill(0);
  const globalCounts = new Array<number>(p).fill(0);

  // cluster accumulator
  const clusterSums = new Map<number, number[]>();
  const clusterCounts = new Map<number, number[]>();

  for (let i = 0; i < n; i++) {
    const row = X[i];
    const lbl = labels[i];

    if (!clusterSums.has(lbl)) {
      clusterSums.set(lbl, new Array<number>(p).fill(0));
      clusterCounts.set(lbl, new Array<number>(p).fill(0));
    }

    const cs = clusterSums.get(lbl)!;
    const cc = clusterCounts.get(lbl)!;

    for (let j = 0; j < p; j++) {
      const v = Number.isFinite(row[j]) ? row[j] : 0;
      globalSums[j] += v;
      globalCounts[j] += 1;

      cs[j] += v;
      cc[j] += 1;
    }
  }

  const globalMeans = globalSums.map((s, j) => (globalCounts[j] ? s / globalCounts[j] : 0));

  const clusterMeans = new Map<number, number[]>();
  for (const [k, sums] of clusterSums.entries()) {
    const counts = clusterCounts.get(k)!;
    const means = sums.map((s, j) => (counts[j] ? s / counts[j] : 0));
    clusterMeans.set(k, means);
  }

  return { globalMeans, clusterMeans };
}

/**
 * Compute importance score per feature for a cluster.
 * Score = abs(clusterMean - globalMean)
 */
function computeFeatureImportanceForCluster(globalMeans: number[], clusterMean: number[]): number[] {
  const p = globalMeans.length;
  const scores: number[] = new Array<number>(p);
  for (let j = 0; j < p; j++) {
    scores[j] = Math.abs(clusterMean[j] - globalMeans[j]);
  }
  return scores;
}

/**
 * Get top N features by score for a single cluster.
 */
function getTopFeaturesForCluster(pre: PreprocessResult, scores: number[], topN = 5) {
  const indexed = scores.map((s, idx) => ({ idx, score: s, meta: pre.featureMeta[idx] }));
  indexed.sort((a, b) => b.score - a.score);
  return indexed.slice(0, topN).map((it) => ({ featureIndex: it.idx, featureMeta: it.meta, score: it.score }));
}

/**
 * Summarize DBSCAN result for a KMeans cluster:
 * - count unique subcluster labels (excluding -1)
 * - noise ratio = (#noise points) / clusterSize
 *
 * dbmap: Map<kmeansClusterId, DBSCANResult>
 * labels: KMeansResult.labels used to know which rows belong to that cluster
 */
function summarizeDbscanForCluster(clusterId: number, indicesInCluster: number[], dbmap: Map<number, DBSCANResult>) {
  const db = dbmap.get(clusterId);
  if (!db) return undefined;
  const labelMap = db.labels;
  let noise = 0;
  const subclusterSet = new Set<number>();
  for (const idx of indicesInCluster) {
    const lbl = labelMap.get(idx) ?? -1;
    if (lbl === -1) noise++;
    else subclusterSet.add(lbl);
  }
  const subclusterCount = subclusterSet.size;
  const noiseRatio = indicesInCluster.length ? noise / indicesInCluster.length : 0;
  return { subclusterCount, noiseRatio };
}

/**
 * Pull IPA highlights for a cluster:
 * - picks top attributes by gap in that cluster
 */
function extractIpaHighlightsForCluster(clusterId: number, ipaResults: IPAClusterResult[] | undefined, topN = 3) {
  if (!ipaResults) return undefined;
  const r = ipaResults.find((x) => x.clusterId === clusterId);
  if (!r) return undefined;
  // sort by gap desc
  const sorted = [...r.attrs].sort((a, b) => Math.abs(b.gap) - Math.abs(a.gap));
  return sorted.slice(0, topN).map((a) => a);
}

/**
 * Generate a short human-readable narrative using top features,
 * dbscan summary and IPA highlights.
 *
 * The narrative is kept concise (2-4 sentences) and can be localized later.
 */
function generateNarrative(clusterId: number, size: number, topFeatures: Array<{ featureIndex: number; featureMeta: FeatureMeta; score: number }>, dbSummary?: { subclusterCount: number; noiseRatio: number }, ipaHighlights?: Array<IPAAttr>): string {
  const parts: string[] = [];

  parts.push(`Cluster ${clusterId} terdiri dari ${size} responden.`);

  if (topFeatures.length) {
    // make decent readable phrases: show up to 3 features with short labels
    const described: string[] = [];
    for (let i = 0; i < Math.min(3, topFeatures.length); i++) {
      const f = topFeatures[i];
      // create readable label: prefer questionContent, else featureKey
      const label = f.featureMeta.questionContent ?? f.featureMeta.featureKey;
      described.push(`"${label}"`);
    }
    parts.push(`Fitur pembeda utama cluster meliputi ${described.join(", ")} (urutan berdasarkan dampak).`);
  }

  if (dbSummary) {
    const { subclusterCount, noiseRatio } = dbSummary;
    const noisePct = Math.round(noiseRatio * 100);
    if (subclusterCount > 0) {
      parts.push(`DBSCAN menemukan ${subclusterCount} subkelompok dalam klaster ini; ${noisePct}% titik dikategorikan sebagai noise.`);
    } else {
      parts.push(`DBSCAN tidak menemukan subkelompok padat (subcluster) yang signifikan di klaster ini; ${noisePct}% titik noise.`);
    }
  }

  if (ipaHighlights && ipaHighlights.length) {
    // show top IPA attribute and its gap
    const top = ipaHighlights[0];
    const qid = top.attributeQuestionId;
    const aspect = top.attributeQuestionContent
    const gap = Number((top.gap).toFixed(2));
    const quad = top.quadrant;
    parts.push(`Analisis IPA: atribut "${qid} (${aspect})" memiliki gap = ${gap} dan berada di kuadran ${quad} (prioritas/performa).`);
  }

  return parts.join(" ");
}

/* ===========================
   Main: buildClusterSummaries
   =========================== */

/**
 * Build cluster summaries integrating KMeans, DBSCAN, and IPA
 *
 * - pre: PreprocessResult (X, featureMeta, originalSheets)
 * - kmeans: KMeansResult
 * - dbscanMap: Map<kmeansClusterId, DBSCANResult>
 * - ipaResults: IPAClusterResult[] (optional)
 *
 * Returns ClusterSummary[] ordered by clusterId ascending.
 */
export function buildClusterSummaries(
  pre: PreprocessResult,
  kmeans: KMeansResult,
  dbscanMap: Map<number, DBSCANResult> | undefined,
  ipaResults?: IPAClusterResult[]
): ClusterSummary[] {
  const n = pre.X.length;
  const p = pre.featureMeta.length;

  // compute means
  const { globalMeans, clusterMeans } = computeFeatureMeans(pre, kmeans.labels);

  const summaries: ClusterSummary[] = [];

  // prepare index lists per cluster
  const indicesPerCluster = new Map<number, number[]>();
  for (let i = 0; i < kmeans.labels.length; i++) {
    const lbl = kmeans.labels[i];
    if (!indicesPerCluster.has(lbl)) indicesPerCluster.set(lbl, []);
    indicesPerCluster.get(lbl)!.push(i);
  }

  // for each cluster in KMeans centroids
  for (let clusterId = 0; clusterId < kmeans.k; clusterId++) {
    const indices = indicesPerCluster.get(clusterId) ?? [];
    const size = indices.length;

    // cluster means vector
    const clusterMean = clusterMeans.get(clusterId) ?? new Array<number>(p).fill(0);
    // compute importance scores
    const scores = computeFeatureImportanceForCluster(globalMeans, clusterMean);
    // get top features
    const topFeatures = getTopFeaturesForCluster(pre, scores, 5);

    // dbscan summary
    const dbSummary = dbscanMap ? summarizeDbscanForCluster(clusterId, indices, dbscanMap) : undefined;

    // ipa highlights
    const ipaHighlights = ipaResults ? extractIpaHighlightsForCluster(clusterId, ipaResults, 3) : undefined;

    // narrative
    const narrative = generateNarrative(clusterId, size, topFeatures, dbSummary, ipaHighlights);

    summaries.push({
      clusterId,
      size,
      topFeatures,
      dbscanSummary: dbSummary,
      ipaHighlights,
      narrative,
    });
  }

  return summaries;
}

/* ===========================
   Example usage (commented)
   ===========================

import { preprocessAnswerSheets, runKMeans, runDBSCANPerKMeansCluster, computeIPA } from "./analyticsService"; // your existing functions
import { buildClusterSummaries } from "./clusterNarrative.service";

const pre = preprocessAnswerSheets(answerSheets);
const kmeans = runKMeans(pre.X, { k: 3 });
const dbmap = runDBSCANPerKMeansCluster(pre.X, kmeans.labels, { eps: 0.06, minPts: 4 });
const ipa = computeIPA(pre.originalSheets, kmeans.labels, pre.featureMeta);

const summaries = buildClusterSummaries(pre, kmeans, dbmap, ipa);
console.log(JSON.stringify(summaries, null, 2));

 */
