/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * AnalyticsService
 *
 * - Input: array of answerSheet objects (same shape as your sample)
 * - Output: KMeans result, DBSCAN per-cluster result, IPA per cluster,
 *           and cluster members (with full answerSheet attached)
 *
 * Libraries:
 *  - ml-kmeans (K-Means)
 *  - density-clustering (DBSCAN)
 *
 * Usage example (see bottom of file).
 */

import { Answer_Sheets } from "@/__generated__/graphql";
import * as DC from "density-clustering";
import { kmeans } from "ml-kmeans";
import { buildClusterSummaries } from "./clusterNarratives";

/* ===========================
   Types / Interfaces
   =========================== */

// export interface AnswerSheet {
//   id: string;
//   form_id?: string;
//   user_id?: string;
//   user?: any;
//   question_answers: any[]; // as in your object
//   [k: string]: any;
// }

 

export interface FeatureMeta {
  featureKey: string; // e.g. "c0ca410b__value" or "57ec4f97__imp"
  questionId: string;
  questionContent?: string;
  rawOption?: any;
  answer? : any
}

export interface PreprocessResult {
  X: number[][]; // n x p
  featureMeta: FeatureMeta[];
  ids: string[]; // answerSheet ids in same order as X rows
  originalSheets: Answer_Sheets[]; // same order
  colMin: number[];
  colMax: number[];
}

export interface KMeansResult {
  labels: number[]; // length n
  centroids: number[][];
  k: number;
  inertia: number;
}

export interface DBSCANResult {
  // mapping rowIndex -> subcluster label (-1 = noise)
  labels: Map<number, number>;
  params: { eps: number; minPts: number };
}

export interface IPAAttr {
  attributeQuestionId: string;
  attributeQuestionContent?: string;
  impMean: number;
  perfMean: number;
  gap: number;
  quadrant: 1 | 2 | 3 | 4;
}

export interface IPAClusterResult {
  clusterId: number;
  size: number;
  attrs: IPAAttr[];
}

/* ===========================
   Utility helpers
   =========================== */

/** Safe JSON parse, returns original if not JSON string */
function safeParseMaybeJson(value: any): any {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
}

/** convert value-like to number or NaN */
function toNumberSafe(v: any): number {
  if (v == null) return NaN;
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const n = Number(v);
    return Number.isFinite(n) ? n : NaN;
  }
  if (typeof v === "boolean") return v ? 1 : 0;
  return NaN;
}

/** Min-max normalize a column; returns normalized array, min, max */
function minMaxNormalize(col: number[]): { norm: number[]; min: number; max: number } {
  let min = Infinity;
  let max = -Infinity;
  for (const v of col) {
    if (Number.isFinite(v)) {
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }
  if (!isFinite(min) || !isFinite(max) || max === min) {
    // fallback: all zeros
    return { norm: col.map(() => 0), min: isFinite(min) ? min : 0, max: isFinite(max) ? max : 0 };
  }
  const denom = max - min;
  const norm = col.map((v) => (Number.isFinite(v) ? (v - min) / denom : 0));
  return { norm, min, max };
}

/** Euclidean distance between two vectors */
function euclidean(a: number[], b: number[]): number {
  try {
       let s = 0;
       for (let i = 0; i < a.length; i++) {
       const d = (a[i] ?? 0) - (b[i] ?? 0);
       s += d * d;
  }
  return Math.sqrt(s);
  } catch (error) {
       console.log("Error calculating Euclidean distance:", error);
       console.dir({ a, b });
       throw error;
  }
}

/* ===========================
   Preprocessing: extract features from answer sheets
   - builds feature columns in deterministic order
   - supports: Importance Performance, Ratio, Multiple
   - ignores textual/number id fields for clustering but keeps sheet metadata
   =========================== */

export function preprocessAnswerSheets(answerSheets: Answer_Sheets[]): PreprocessResult {
  // Build list of features by iterating questions in the first sheet (order stable across sheets)
  // We'll inspect all sheets to discover all question IDs and their option types, but keep deterministic ordering by sorted question order.
  const questionMap = new Map<string, any>(); // questionId -> question object (use last seen)
  const questionOrder = new Set<string>();

  for (const s of answerSheets) {
    for (const qa of s.question_answers) {
      const qid = qa.question_id;
      questionOrder.add(qid);
      if (qa.question) questionMap.set(qid, qa.question);
    }
  }

  const orderedQids = Array.from(questionOrder); // deterministic in insertion order (based on traversal)
  const featureMeta: FeatureMeta[] = [];

  // For each question id, determine produced feature(s)
  for (const qid of orderedQids) {
    const q = questionMap.get(qid) || null;
    const optType = q?.option?.type ?? null; // e.g. "Multiple", "Ratio", "Importance Performance", "Number"
    if (optType === "Importance Performance") {
      const rawOption = q?.option ? (typeof q.option === 'string' ? JSON.parse(q.option) : q.option) : null;
      featureMeta.push({ featureKey: `${qid}__imp`, questionId: qid, questionContent: q?.content, rawOption });
      featureMeta.push({ featureKey: `${qid}__perf`, questionId: qid, questionContent: q?.content, rawOption });
    } else if (optType === "Ratio") {
      const rawOption = q?.option ? (typeof q.option === 'string' ? JSON.parse(q.option) : q.option) : null;
      featureMeta.push({ featureKey: `${qid}__value`, questionId: qid, questionContent: q?.content, rawOption });
    } else if (optType === "Multiple") {
      // enumerate options if available
      const opts = q?.option?.option ?? [];
      if (Array.isArray(opts) && opts.length > 0) {
        for (const o of opts) {
          featureMeta.push({ featureKey: `${qid}__opt__${o.id}`, questionId: qid, questionContent: q?.content, rawOption: o });
        }
      } else {
        // fallback: single count-of-selected feature
        const rawOption = q?.option ? (typeof q.option === 'string' ? JSON.parse(q.option) : q.option) : null;
        featureMeta.push({ featureKey: `${qid}__multi_count`, questionId: qid, questionContent: q?.content, rawOption });
      }
    } else {
      // other types ignored for clustering (but still present in sheets)
    }
  }

  const n = answerSheets.length;
  const p = featureMeta.length;

  // create columns (col-major) to normalize later
  const cols: number[][] = Array.from({ length: p }, () => new Array<number>(n).fill(NaN));
  const ids: string[] = [];
  
  // Collect sample answers for each feature (for metadata enhancement)
  const featureAnswers: Map<string, any[]> = new Map();
  featureMeta.forEach(meta => {
    featureAnswers.set(meta.featureKey, []);
  });
  for (let i = 0; i < n; i++) {
    const sheet = answerSheets[i];
    ids.push(sheet.id);
    // index questions by id for quick lookup
    const qaById = new Map<string, any>();
    for (const qa of sheet.question_answers) qaById.set(qa.question_id, qa);

    // for each feature, compute value
    for (let j = 0; j < p; j++) {
      const meta = featureMeta[j];
      const qid = meta.questionId;
      const qa = qaById.get(qid);
      if (!qa) {
        cols[j][i] = NaN;
        continue;
      }
      const parsed = safeParseMaybeJson(qa.answer);

      // handle importance-performance
      if (meta.featureKey.endsWith("__imp")) {
        const imp = parsed?.importance?.value ?? parsed?.imp ?? parsed?.importance ?? NaN;
        cols[j][i] = toNumberSafe(imp);
        // Collect sample answer
        if (featureAnswers.get(meta.featureKey)!.length < 5) {
          featureAnswers.get(meta.featureKey)!.push({ 
            answerSheetId: sheet.id, 
            rawAnswer: qa.answer, 
            parsedAnswer: parsed, 
            extractedValue: imp 
          });
        }
      } else if (meta.featureKey.endsWith("__perf")) {
        const perf = parsed?.performance?.value ?? parsed?.perf ?? parsed?.performance ?? NaN;
        cols[j][i] = toNumberSafe(perf);
        // Collect sample answer
        if (featureAnswers.get(meta.featureKey)!.length < 5) {
          featureAnswers.get(meta.featureKey)!.push({ 
            answerSheetId: sheet.id, 
            rawAnswer: qa.answer, 
            parsedAnswer: parsed, 
            extractedValue: perf 
          });
        }
      } else if (meta.featureKey.endsWith("__value")) {
        // ratio single
        const val = parsed?.value ?? parsed;
        cols[j][i] = toNumberSafe(val);
        // Collect sample answer
        if (featureAnswers.get(meta.featureKey)!.length < 5) {
          featureAnswers.get(meta.featureKey)!.push({ 
            answerSheetId: sheet.id, 
            rawAnswer: qa.answer, 
            parsedAnswer: parsed, 
            extractedValue: val 
          });
        }
      } else if (meta.featureKey.includes("__opt__")) {
        // multiple: check whether option id was selected in parsed (array of objects) or object map
        const optId = meta.featureKey.split("__opt__")[1];
        let selected = 0;
        if (Array.isArray(parsed)) {
          const item = parsed.find((x: any) => x.id === optId || String(x.value) === String(optId) || x.label === optId);
          selected = item ? (item.selected ? 1 : 0) : 0;
        } else if (parsed && typeof parsed === "object") {
          // maybe parsed is object map key->selected
          selected = parsed[optId] ? 1 : 0;
        }
        cols[j][i] = selected;
        // Collect sample answer
        if (featureAnswers.get(meta.featureKey)!.length < 5) {
          featureAnswers.get(meta.featureKey)!.push({ 
            answerSheetId: sheet.id, 
            rawAnswer: qa.answer, 
            parsedAnswer: parsed, 
            extractedValue: selected 
          });
        }
      } else if (meta.featureKey.endsWith("__multi_count")) {
        let cnt = 0;
        if (Array.isArray(parsed)) {
          cnt = parsed.filter((x: any) => x.selected).length;
        }
        cols[j][i] = cnt;
        // Collect sample answer
        if (featureAnswers.get(meta.featureKey)!.length < 5) {
          featureAnswers.get(meta.featureKey)!.push({ 
            answerSheetId: sheet.id, 
            rawAnswer: qa.answer, 
            parsedAnswer: parsed, 
            extractedValue: cnt 
          });
        }
      } else {
        cols[j][i] = NaN;
      }
    } // end feature loop
  } // end sheet loop
  
  // Add collected sample answers to feature metadata
  featureMeta.forEach(meta => {
    const sampleAnswers = featureAnswers.get(meta.featureKey) || [];
    meta.answer = sampleAnswers;
  });

  // Debug: Log feature metadata structure (first few features)
  console.log('Feature metadata with answers and options:');
  featureMeta.slice(0, 3).forEach((meta, idx) => {
    console.log(`Feature ${idx}:`, {
      featureKey: meta.featureKey,
      questionId: meta.questionId,
      questionContent: meta.questionContent,
      hasRawOption: !!meta.rawOption,
      rawOption: meta.rawOption,
      sampleAnswersCount: meta.answer?.length || 0,
      sampleAnswers: meta.answer?.slice(0, 2) // Show first 2 sample answers
    });
  });

  // normalize columns to [0,1]
  const X: number[][] = Array.from({ length: n }, () => new Array<number>(p).fill(0));
  const colMin: number[] = [];
  const colMax: number[] = [];
  for (let j = 0; j < p; j++) {
    const { norm, min, max } = minMaxNormalize(cols[j]);
    colMin.push(min);
    colMax.push(max);
    for (let i = 0; i < n; i++) {
      X[i][j] = norm[i];
    }
  }

  return {
    X,
    featureMeta,
    ids,
    originalSheets: answerSheets,
    colMin,
    colMax,
  };
}

export function getRatioAnswerValue(answer: string): any {
  const parsed = safeParseMaybeJson(answer);
  const answerValue = (parsed as any[]).find((x: any) => x.selected == true);
  return answerValue ?? null;
}

/* ===========================
   KMeans wrapper
   =========================== */

export function runKMeans(X: number[][], options: { k: number; maxIter?: number; seed?: number }): KMeansResult {
  if (!X || X.length === 0) throw new Error("Empty X provided to KMeans");
  const { k, maxIter = 100, seed = 42 } = options;
  const res: any = kmeans(X, k, { maxIterations: maxIter, seed });
  
  // ml-kmeans returns clusters and centroids
  const labels: number[] = res.clusters;
  const centroids: number[][] = res.centroids.map((c: any) => {
         return c as number[];
  });
  // compute inertia (WCSS)
  let inertia = 0;
  for (let i = 0; i < X.length; i++) {
    inertia += Math.pow(euclidean(X[i], centroids[labels[i]]), 2);
  }
  return { labels, centroids, k, inertia };
}

/* ===========================
   DBSCAN per KMeans cluster (hierarchical)
   =========================== */

export function runDBSCANPerKMeansCluster(X: number[][], labels: number[], params: { eps?: number; minPts?: number } = {}): Map<number, DBSCANResult> {
  const eps = params.eps ?? 0.05;
  const minPts = params.minPts ?? 5;
  const db = new (DC as any).DBSCAN();
  const map = new Map<number, DBSCANResult>();

  // group indices by KMeans label
  const groups = new Map<number, number[]>();
  for (let i = 0; i < labels.length; i++) {
    const lbl = labels[i];
    if (!groups.has(lbl)) groups.set(lbl, []);
    groups.get(lbl)!.push(i);
  }

  for (const [clusterId, indices] of groups.entries()) {
    if (indices.length === 0) {
      map.set(clusterId, { labels: new Map(), params: { eps, minPts } });
      continue;
    }
    const subset: number[][] = indices.map(idx => X[idx]);
    const clusters = db.run(subset, eps, minPts); // returns array of arrays of local indices
    const labelMap = new Map<number, number>();
    // initialize as noise
    for (const idx of indices) labelMap.set(idx, -1);
    for (let c = 0; c < clusters.length; c++) {
      for (const localIdx of clusters[c]) {
        const globalIdx = indices[localIdx];
        labelMap.set(globalIdx, c);
      }
    }
    map.set(clusterId, { labels: labelMap, params: { eps, minPts } });
  }

  return map;
}

/* ===========================
   IPA computation
   - uses raw answerSheets to compute means (not normalized)
   - expects featureMeta to include IPA questionIds
   =========================== */

/**
 * Compute IPA per cluster (clusters defined by labels array)
 * - answerSheets: original answer sheets in same order as labels
 * - labels: KMeans labels array (length n)
 * - featureMeta: from preprocessAnswerSheets
 *
 * Returns array of IPAClusterResult
 */
export function computeIPA(answerSheets: Answer_Sheets[], labels: number[], featureMeta: FeatureMeta[]): IPAClusterResult[] {
  // discover IPA questions from featureMeta (those with __imp/__perf suffix)
  const ipaQids = new Map<string, { impFeatureIdx: number; perfFeatureIdx: number; questionContent?: string }>();
  for (let i = 0; i < featureMeta.length; i++) {
    const fm = featureMeta[i];
    if (fm.featureKey.endsWith("__imp")) {
      const qid = fm.questionId;
      ipaQids.set(qid, ipaQids.get(qid) ?? { impFeatureIdx: -1, perfFeatureIdx: -1, questionContent: fm.questionContent });
      ipaQids.get(qid)!.impFeatureIdx = i;
    } else if (fm.featureKey.endsWith("__perf")) {
      const qid = fm.questionId;
      ipaQids.set(qid, ipaQids.get(qid) ?? { impFeatureIdx: -1, perfFeatureIdx: -1, questionContent: fm.questionContent });
      ipaQids.get(qid)!.perfFeatureIdx = i;
    }
  }

  const n = answerSheets.length;
  const groups = new Map<number, number[]>();
  for (let i = 0; i < labels.length; i++) {
    const lbl = labels[i];
    if (!groups.has(lbl)) groups.set(lbl, []);
    groups.get(lbl)!.push(i);
  }

  // compute overall cutoffs (global mean for each attribute) using raw values
  const overallImpMeanByQ: Map<string, number> = new Map();
  const overallPerfMeanByQ: Map<string, number> = new Map();

  for (const [qid, idxs] of ipaQids.entries()) {
    const imps: number[] = [];
    const perfs: number[] = [];
    for (let i = 0; i < n; i++) {
      const sheet = answerSheets[i];
      const qa = sheet.question_answers.find((x: any) => x.question_id === qid);
      if (!qa) continue;
      const parsed = safeParseMaybeJson(qa.answer);
      const imp = parsed?.importance?.value ?? parsed?.imp ?? parsed?.importance ?? NaN;
      const perf = parsed?.performance?.value ?? parsed?.perf ?? parsed?.performance ?? NaN;
      if (Number.isFinite(toNumberSafe(imp))) imps.push(toNumberSafe(imp));
      if (Number.isFinite(toNumberSafe(perf))) perfs.push(toNumberSafe(perf));
    }
    overallImpMeanByQ.set(qid, imps.length ? imps.reduce((a, b) => a + b, 0) / imps.length : 0);
    overallPerfMeanByQ.set(qid, perfs.length ? perfs.reduce((a, b) => a + b, 0) / perfs.length : 0);
  }

  const results: IPAClusterResult[] = [];
  for (const [clusterId, indices] of groups.entries()) {
    const res: IPAClusterResult = { clusterId, size: indices.length, attrs: [] };
    for (const [qid, idxs] of ipaQids.entries()) {
      const imps: number[] = [];
      const perfs: number[] = [];
      for (const i of indices) {
        const sheet = answerSheets[i];
        const qa = sheet.question_answers.find((x: any) => x.question_id === qid);
        if (!qa) continue;
        const parsed = safeParseMaybeJson(qa.answer);
        const imp = parsed?.importance?.value ?? parsed?.imp ?? parsed?.importance ?? NaN;
        const perf = parsed?.performance?.value ?? parsed?.perf ?? parsed?.performance ?? NaN;
        if (Number.isFinite(toNumberSafe(imp))) imps.push(toNumberSafe(imp));
        if (Number.isFinite(toNumberSafe(perf))) perfs.push(toNumberSafe(perf));
      }
      const impMean = imps.length ? imps.reduce((a, b) => a + b, 0) / imps.length : 0;
      const perfMean = perfs.length ? perfs.reduce((a, b) => a + b, 0) / perfs.length : 0;
      const gap = impMean - perfMean;
      const impCut = overallImpMeanByQ.get(qid) ?? 0;
      const perfCut = overallPerfMeanByQ.get(qid) ?? 0;
      let quadrant: 1 | 2 | 3 | 4 = 3;
      if (impMean > impCut && perfMean < perfCut) quadrant = 1;
      else if (impMean > impCut && perfMean >= perfCut) quadrant = 2;
      else if (impMean <= impCut && perfMean < perfCut) quadrant = 3;
      else quadrant = 4;

      res.attrs.push({
        attributeQuestionId: qid,
        attributeQuestionContent: ipaQids.get(qid)!.questionContent,
        impMean,
        perfMean,
        gap,
        quadrant,
      });
    }
    results.push(res);
  }

  return results;
}

/* ===========================
   Convenience full pipeline
   =========================== */

export interface AnalyzeOptions {
  answerSheets: Answer_Sheets[];
  k?: number;
  kmeansMaxIter?: number;
  seed?: number;
  dbscan?: { eps?: number; minPts?: number };
  // optionally let caller pass selected IPA question ids, otherwise we use any discovered IPA questions
  ipaQuestionIds?: string[] | null;
}

export function analyzePipeline(opts: AnalyzeOptions) {
  const { answerSheets, k = 3, kmeansMaxIter = 200, seed = 42, dbscan = {}, ipaQuestionIds = null } = opts;

  // 1) preprocess -> X matrix + metadata
  const pre = preprocessAnswerSheets(answerSheets);
  
  // 2) run KMeans
  const kres = runKMeans(pre.X, { k, maxIter: kmeansMaxIter, seed });

  // 3) attach members (with full answerSheet) per cluster
  const membersPerCluster = new Map<number, Answer_Sheets[]>();
  for (let i = 0; i < kres.labels.length; i++) {
    const lbl = kres.labels[i];
    if (!membersPerCluster.has(lbl)) membersPerCluster.set(lbl, []);
    membersPerCluster.get(lbl)!.push(pre.originalSheets[i]);
  }

  // 4) run DBSCAN per KMeans cluster
  const dbmap = runDBSCANPerKMeansCluster(pre.X, kres.labels, dbscan);

  // 5) compute IPA (by default uses all discovered IPA questions)
  const ipaResults = computeIPA(pre.originalSheets, kres.labels, pre.featureMeta);

  // 6) 
  const summaries = buildClusterSummaries(pre, kres, dbmap, ipaResults);

  return {
    preprocess: pre,
    kmeans: kres,
    membersPerCluster,
    dbscanMap: dbmap,
    ipa: ipaResults,
    summaries
  };
}

/* ===========================
   Usage Example (React)
   ===========================

import { analyzePipeline } from "./analyticsService";
import answerSheetsFromServer from "./data";

const { preprocess, kmeans, membersPerCluster, dbscanMap, ipa } = analyzePipeline({
  answerSheets: answerSheetsFromServer,
  k: 3,
  dbscan: { eps: 0.06, minPts: 4 }
});

// UI can render clusters using membersPerCluster (which contain full answer sheets)
// IPA per cluster is in ipa (array of IPAClusterResult)
// preprocess.featureMeta helps map feature columns to question ids for explanations

   =========================== */
