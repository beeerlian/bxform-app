/**
 * Importance Performance Analysis (IPA) implementation
 * Used for evaluating the relative importance and performance of different aspects
 */

import { IPAAnalysisResult, IPADataPoint, IPAQuadrant, IPAResult } from './types';

/**
 * IPA (Importance Performance Analysis) analytics implementation
 * Analyzes the relationship between importance and performance ratings
 */
export class IPAAnalytics {
  /**
   * Perform IPA analysis on the provided data points
   * @param dataPoints IPA data points with importance and performance scores
   * @param useGrandMean Whether to use grand mean or aspect-specific means for quadrant determination
   * @returns Complete IPA analysis result
   */
  static performAnalysis(
    dataPoints: IPADataPoint[],
    useGrandMean: boolean = true
  ): IPAAnalysisResult {
    if (dataPoints.length === 0) {
      return {
        aspects: [],
        overall: {
          avgImportance: 0,
          avgPerformance: 0,
          totalResponses: 0,
        },
      };
    }

    // Group data points by aspect
    const aspectGroups = this.groupByAspect(dataPoints);

    // Calculate overall statistics
    const overall = this.calculateOverallStatistics(dataPoints);

    // Determine thresholds for quadrant classification
    const thresholds = useGrandMean
      ? { importance: overall.avgImportance, performance: overall.avgPerformance }
      : this.calculateDynamicThresholds(aspectGroups);

    // Analyze each aspect
    const aspects = Array.from(aspectGroups.entries()).map(([aspect, points]) =>
      this.analyzeAspect(aspect, points, thresholds.importance, thresholds.performance)
    );

    // Group results by segment if available
    const bySegment = this.groupResultsBySegment(aspects);

    return {
      aspects: aspects.sort((a, b) => b.importance - a.importance), // Sort by importance
      overall,
      bySegment: Object.keys(bySegment).length > 1 ? bySegment : undefined,
    };
  }

  /**
   * Group data points by aspect
   * @param dataPoints IPA data points
   * @returns Map of aspect to data points
   */
  private static groupByAspect(dataPoints: IPADataPoint[]): Map<string, IPADataPoint[]> {
    const groups = new Map<string, IPADataPoint[]>();

    dataPoints.forEach((point) => {
      if (!groups.has(point.aspect)) {
        groups.set(point.aspect, []);
      }
      groups.get(point.aspect)!.push(point);
    });

    return groups;
  }

  /**
   * Calculate overall statistics across all data points
   * @param dataPoints All IPA data points
   * @returns Overall statistics
   */
  private static calculateOverallStatistics(dataPoints: IPADataPoint[]): {
    avgImportance: number;
    avgPerformance: number;
    totalResponses: number;
  } {
    const totalImportance = dataPoints.reduce((sum, point) => sum + point.importance, 0);
    const totalPerformance = dataPoints.reduce((sum, point) => sum + point.performance, 0);

    return {
      avgImportance: totalImportance / dataPoints.length,
      avgPerformance: totalPerformance / dataPoints.length,
      totalResponses: dataPoints.length,
    };
  }

  /**
   * Calculate dynamic thresholds based on aspect means
   * @param aspectGroups Grouped data points by aspect
   * @returns Dynamic thresholds
   */
  private static calculateDynamicThresholds(aspectGroups: Map<string, IPADataPoint[]>): {
    importance: number;
    performance: number;
  } {
    const aspectMeans = Array.from(aspectGroups.entries()).map(([aspect, points]) => {
      const avgImportance = points.reduce((sum, p) => sum + p.importance, 0) / points.length;
      const avgPerformance = points.reduce((sum, p) => sum + p.performance, 0) / points.length;
      return { aspect, avgImportance, avgPerformance };
    });

    const totalImportance = aspectMeans.reduce((sum, a) => sum + a.avgImportance, 0);
    const totalPerformance = aspectMeans.reduce((sum, a) => sum + a.avgPerformance, 0);

    return {
      importance: totalImportance / aspectMeans.length,
      performance: totalPerformance / aspectMeans.length,
    };
  }

  /**
   * Analyze a single aspect
   * @param aspect Aspect name
   * @param points Data points for this aspect
   * @param importanceThreshold Threshold for importance classification
   * @param performanceThreshold Threshold for performance classification
   * @returns IPA result for the aspect
   */
  private static analyzeAspect(
    aspect: string,
    points: IPADataPoint[],
    importanceThreshold: number,
    performanceThreshold: number
  ): IPAResult {
    const importance = points.reduce((sum, p) => sum + p.importance, 0) / points.length;
    const performance = points.reduce((sum, p) => sum + p.performance, 0) / points.length;

    // Determine quadrant
    const quadrant = this.determineQuadrant(
      importance,
      performance,
      importanceThreshold,
      performanceThreshold
    );

    // Calculate statistics
    const statistics = this.calculateAspectStatistics(points);

    // Determine segment (use most common segment)
    const segment = this.determinePrimarySegment(points);

    return {
      aspect,
      importance,
      performance,
      quadrant,
      responseCount: points.length,
      segment,
      statistics,
    };
  }

  /**
   * Determine IPA quadrant based on importance and performance scores
   * @param importance Importance score
   * @param performance Performance score
   * @param importanceThreshold Importance threshold
   * @param performanceThreshold Performance threshold
   * @returns IPA quadrant
   */
  private static determineQuadrant(
    importance: number,
    performance: number,
    importanceThreshold: number,
    performanceThreshold: number
  ): IPAQuadrant {
    const highImportance = importance >= importanceThreshold;
    const highPerformance = performance >= performanceThreshold;

    if (highImportance && highPerformance) {
      return IPAQuadrant.KEEP_UP_GOOD_WORK;
    } else if (highImportance && !highPerformance) {
      return IPAQuadrant.CONCENTRATE_HERE;
    } else if (!highImportance && !highPerformance) {
      return IPAQuadrant.LOW_PRIORITY;
    } else {
      return IPAQuadrant.POSSIBLE_OVERKILL;
    }
  }

  /**
   * Calculate statistical measures for an aspect
   * @param points Data points for the aspect
   * @returns Statistical measures
   */
  private static calculateAspectStatistics(points: IPADataPoint[]): {
    importanceStdDev: number;
    performanceStdDev: number;
    correlation: number;
  } {
    if (points.length <= 1) {
      return {
        importanceStdDev: 0,
        performanceStdDev: 0,
        correlation: 0,
      };
    }

    const avgImportance = points.reduce((sum, p) => sum + p.importance, 0) / points.length;
    const avgPerformance = points.reduce((sum, p) => sum + p.performance, 0) / points.length;

    // Calculate standard deviations
    const importanceVariances = points.map((p) => Math.pow(p.importance - avgImportance, 2));
    const performanceVariances = points.map((p) => Math.pow(p.performance - avgPerformance, 2));

    const importanceStdDev = Math.sqrt(
      importanceVariances.reduce((sum, v) => sum + v, 0) / (points.length - 1)
    );
    const performanceStdDev = Math.sqrt(
      performanceVariances.reduce((sum, v) => sum + v, 0) / (points.length - 1)
    );

    // Calculate correlation coefficient
    let numerator = 0;
    let denomImportance = 0;
    let denomPerformance = 0;

    points.forEach((point) => {
      const impDiff = point.importance - avgImportance;
      const perfDiff = point.performance - avgPerformance;

      numerator += impDiff * perfDiff;
      denomImportance += impDiff * impDiff;
      denomPerformance += perfDiff * perfDiff;
    });

    const correlation =
      denomImportance * denomPerformance === 0
        ? 0
        : numerator / Math.sqrt(denomImportance * denomPerformance);

    return {
      importanceStdDev,
      performanceStdDev,
      correlation,
    };
  }

  /**
   * Determine primary segment for an aspect
   * @param points Data points for the aspect
   * @returns Primary segment name
   */
  private static determinePrimarySegment(points: IPADataPoint[]): string | undefined {
    const segmentCounts = new Map<string, number>();

    points.forEach((point) => {
      if (point.segment) {
        segmentCounts.set(point.segment, (segmentCounts.get(point.segment) || 0) + 1);
      }
    });

    if (segmentCounts.size === 0) return undefined;

    let primarySegment = '';
    let maxCount = 0;

    segmentCounts.forEach((count, segment) => {
      if (count > maxCount) {
        maxCount = count;
        primarySegment = segment;
      }
    });

    return primarySegment;
  }

  /**
   * Group results by segment
   * @param aspects Array of IPA results
   * @returns Results grouped by segment
   */
  private static groupResultsBySegment(aspects: IPAResult[]): Record<string, IPAResult[]> {
    const groups: Record<string, IPAResult[]> = {};

    aspects.forEach((aspect) => {
      const segment = aspect.segment || 'unknown';
      if (!groups[segment]) {
        groups[segment] = [];
      }
      groups[segment].push(aspect);
    });

    return groups;
  }

  /**
   * Get aspects in a specific quadrant
   * @param analysisResult IPA analysis result
   * @param quadrant Target quadrant
   * @returns Aspects in the specified quadrant
   */
  static getAspectsByQuadrant(
    analysisResult: IPAAnalysisResult,
    quadrant: IPAQuadrant
  ): IPAResult[] {
    return analysisResult.aspects.filter((aspect) => aspect.quadrant === quadrant);
  }

  /**
   * Get priority recommendations based on IPA analysis
   * @param analysisResult IPA analysis result
   * @returns Priority recommendations
   */
  static getPriorityRecommendations(analysisResult: IPAAnalysisResult): {
    concentrateHere: IPAResult[];
    keepUpGoodWork: IPAResult[];
    lowPriority: IPAResult[];
    possibleOverkill: IPAResult[];
    actionItems: string[];
  } {
    const concentrateHere = this.getAspectsByQuadrant(analysisResult, IPAQuadrant.CONCENTRATE_HERE);
    const keepUpGoodWork = this.getAspectsByQuadrant(analysisResult, IPAQuadrant.KEEP_UP_GOOD_WORK);
    const lowPriority = this.getAspectsByQuadrant(analysisResult, IPAQuadrant.LOW_PRIORITY);
    const possibleOverkill = this.getAspectsByQuadrant(
      analysisResult,
      IPAQuadrant.POSSIBLE_OVERKILL
    );

    const actionItems: string[] = [];

    // Generate action items
    if (concentrateHere.length > 0) {
      actionItems.push(
        `Focus immediate attention on ${concentrateHere.length} high-importance, low-performance aspects: ` +
          concentrateHere
            .slice(0, 3)
            .map((a) => a.aspect)
            .join(', ') +
          (concentrateHere.length > 3 ? ` and ${concentrateHere.length - 3} others` : '')
      );
    }

    if (keepUpGoodWork.length > 0) {
      actionItems.push(
        `Maintain current performance in ${keepUpGoodWork.length} well-performing aspects`
      );
    }

    if (possibleOverkill.length > 0) {
      actionItems.push(
        `Consider reallocating resources from ${possibleOverkill.length} over-performing aspects: ` +
          possibleOverkill
            .slice(0, 2)
            .map((a) => a.aspect)
            .join(', ')
      );
    }

    if (lowPriority.length > 0) {
      actionItems.push(
        `Monitor ${lowPriority.length} low-priority aspects for any changes in importance`
      );
    }

    return {
      concentrateHere: concentrateHere.sort((a, b) => b.importance - a.importance),
      keepUpGoodWork: keepUpGoodWork.sort((a, b) => b.performance - a.performance),
      lowPriority,
      possibleOverkill,
      actionItems,
    };
  }

  /**
   * Calculate gap analysis (performance - importance)
   * @param analysisResult IPA analysis result
   * @returns Gap analysis with sorted aspects
   */
  static calculateGapAnalysis(analysisResult: IPAAnalysisResult): {
    aspect: string;
    importance: number;
    performance: number;
    gap: number;
    gapType: 'deficit' | 'surplus' | 'balanced';
  }[] {
    return analysisResult.aspects
      .map((aspect) => {
        const gap = aspect.performance - aspect.importance;
        let gapType: 'deficit' | 'surplus' | 'balanced';

        if (gap < -0.5) {
          gapType = 'deficit';
        } else if (gap > 0.5) {
          gapType = 'surplus';
        } else {
          gapType = 'balanced';
        }

        return {
          aspect: aspect.aspect,
          importance: aspect.importance,
          performance: aspect.performance,
          gap,
          gapType,
        };
      })
      .sort((a, b) => a.gap - b.gap); // Sort by gap (most deficit first)
  }

  /**
   * Generate IPA chart data for visualization
   * @param analysisResult IPA analysis result
   * @returns Chart data suitable for plotting
   */
  static generateChartData(analysisResult: IPAAnalysisResult): {
    data: {
      x: number;
      y: number;
      label: string;
      quadrant: IPAQuadrant;
      segment?: string;
      size: number;
    }[];
    thresholds: {
      importance: number;
      performance: number;
    };
  } {
    const data = analysisResult.aspects.map((aspect) => ({
      x: aspect.importance,
      y: aspect.performance,
      label: aspect.aspect,
      quadrant: aspect.quadrant,
      segment: aspect.segment,
      size: Math.log(aspect.responseCount + 1) * 5, // Size based on response count
    }));

    const thresholds = {
      importance: analysisResult.overall.avgImportance,
      performance: analysisResult.overall.avgPerformance,
    };

    return { data, thresholds };
  }

  /**
   * Compare IPA results across different time periods or segments
   * @param baseline Baseline IPA analysis result
   * @param comparison Comparison IPA analysis result
   * @returns Comparison analysis
   */
  static compareAnalyses(
    baseline: IPAAnalysisResult,
    comparison: IPAAnalysisResult
  ): {
    aspect: string;
    baselineImportance: number;
    comparisonImportance: number;
    importanceChange: number;
    baselinePerformance: number;
    comparisonPerformance: number;
    performanceChange: number;
    quadrantChange: boolean;
  }[] {
    const baselineMap = new Map(baseline.aspects.map((a) => [a.aspect, a]));
    const comparisonMap = new Map(comparison.aspects.map((a) => [a.aspect, a]));

    const commonAspects = Array.from(baselineMap.keys()).filter((aspect) =>
      comparisonMap.has(aspect)
    );

    return commonAspects
      .map((aspect) => {
        const baselineAspect = baselineMap.get(aspect)!;
        const comparisonAspect = comparisonMap.get(aspect)!;

        return {
          aspect,
          baselineImportance: baselineAspect.importance,
          comparisonImportance: comparisonAspect.importance,
          importanceChange: comparisonAspect.importance - baselineAspect.importance,
          baselinePerformance: baselineAspect.performance,
          comparisonPerformance: comparisonAspect.performance,
          performanceChange: comparisonAspect.performance - baselineAspect.performance,
          quadrantChange: baselineAspect.quadrant !== comparisonAspect.quadrant,
        };
      })
      .sort((a, b) => Math.abs(b.performanceChange) - Math.abs(a.performanceChange));
  }
}
