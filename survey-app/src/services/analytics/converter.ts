/**
 * Data converter utility for transforming raw survey data to analytics format
 */

import { Answer_Sheets, Question_Answers, Questions } from '../../__generated__/graphql';
import { DataPoint, IPADataPoint, QuestionAnswer, SurveyResponse } from './types';

/**
 * Converts raw answer sheets from GraphQL to standardized survey responses
 */
export class SurveyDataConverter {
  /**
   * Convert GraphQL answer sheets to survey responses
   * @param answerSheets Raw answer sheets from database
   * @returns Array of standardized survey responses
   */
  static convertAnswerSheets(answerSheets: Answer_Sheets[]): SurveyResponse[] {
    return answerSheets.map((sheet) => ({
      answer_sheet_id: sheet.id,
      user_id: sheet.user_id,
      user_name: sheet.user?.name || undefined,
      user_email: sheet.user?.email || undefined,
      created_at: sheet.created_at,
      question_answers: this.convertQuestionAnswers(sheet.question_answers),
    }));
  }

  /**
   * Convert GraphQL question answers to standardized format
   * @param questionAnswers Raw question answers from database
   * @returns Array of standardized question answers
   */
  private static convertQuestionAnswers(questionAnswers: Question_Answers[]): QuestionAnswer[] {
    return questionAnswers.map((qa) => ({
      question_id: qa.question_id,
      answer: qa.answer,
      question: qa.question
        ? {
            content: qa.question.content,
            type: qa.question.question_type?.name || 'unknown',
            segment: qa.question.topic || undefined,
            weight: this.extractWeight(qa.question),
          }
        : undefined,
    }));
  }

  /**
   * Extract weight from question options if available
   * @param question Question object
   * @returns Weight value or 1 as default
   */
  private static extractWeight(question: Questions): number {
    try {
      if (question.option && typeof question.option === 'object') {
        const options = question.option as any;
        return options.weight || 1;
      }
    } catch (error) {
      console.warn('Could not extract weight from question options:', error);
    }
    return 1;
  }

  /**
   * Convert survey responses to numerical data points for clustering
   * @param responses Survey responses
   * @param questionMapping Map of question IDs to feature indices
   * @returns Array of data points for clustering
   */
  static convertToDataPoints(
    responses: SurveyResponse[],
    questionMapping?: Map<string, number>
  ): DataPoint[] {
    // If no mapping provided, create one from first response
    if (!questionMapping) {
      questionMapping = this.createQuestionMapping(responses);
    }

    return responses.map((response) => {
      const features = new Array(questionMapping!.size).fill(0);

      response.question_answers.forEach((qa) => {
        const featureIndex = questionMapping!.get(qa.question_id);
        if (featureIndex !== undefined) {
          features[featureIndex] = this.extractNumericalValue(qa.answer);
        }
      });

      return {
        id: response.answer_sheet_id,
        features,
        metadata: {
          user_id: response.user_id,
          user_name: response.user_name,
          user_email: response.user_email,
          created_at: response.created_at,
          question_count: response.question_answers.length,
        },
      };
    });
  }

  /**
   * Convert survey responses to IPA data points
   * @param responses Survey responses
   * @param importanceQuestions Map of aspect to importance question ID
   * @param performanceQuestions Map of aspect to performance question ID
   * @returns Array of IPA data points
   */
  static convertToIPADataPoints(
    responses: SurveyResponse[],
    importanceQuestions: Map<string, string>,
    performanceQuestions: Map<string, string>
  ): IPADataPoint[] {
    const ipaPoints: IPADataPoint[] = [];

    responses.forEach((response) => {
      // Create a map of question answers for quick lookup
      const answerMap = new Map(response.question_answers.map((qa) => [qa.question_id, qa]));

      // Process each aspect
      importanceQuestions.forEach((importanceQId, aspect) => {
        const performanceQId = performanceQuestions.get(aspect);

        if (!performanceQId) return;

        const importanceAnswer = answerMap.get(importanceQId);
        const performanceAnswer = answerMap.get(performanceQId);

        if (importanceAnswer && performanceAnswer) {
          const importance = this.extractNumericalValue(importanceAnswer.answer);
          const performance = this.extractNumericalValue(performanceAnswer.answer);

          ipaPoints.push({
            id: `${response.answer_sheet_id}_${aspect}`,
            features: [importance, performance],
            importance,
            performance,
            aspect,
            segment: importanceAnswer.question?.segment || performanceAnswer.question?.segment,
            metadata: {
              user_id: response.user_id,
              answer_sheet_id: response.answer_sheet_id,
              importance_question_id: importanceQId,
              performance_question_id: performanceQId,
              created_at: response.created_at,
            },
          });
        }
      });
    });

    return ipaPoints;
  }

  /**
   * Create question mapping from survey responses
   * @param responses Survey responses
   * @returns Map of question ID to feature index
   */
  private static createQuestionMapping(responses: SurveyResponse[]): Map<string, number> {
    const questionIds = new Set<string>();

    responses.forEach((response) => {
      response.question_answers.forEach((qa) => {
        questionIds.add(qa.question_id);
      });
    });

    const mapping = new Map<string, number>();
    Array.from(questionIds)
      .sort()
      .forEach((qId, index) => {
        mapping.set(qId, index);
      });

    return mapping;
  }

  /**
   * Extract numerical value from answer data
   * @param answer Answer data (can be various types)
   * @returns Numerical value
   */
  private static extractNumericalValue(answer: any): number {
    // Handle different answer formats
    if (typeof answer === 'number') {
      return answer;
    }

    if (typeof answer === 'string') {
      const parsed = parseFloat(answer);
      if (!isNaN(parsed)) {
        return parsed;
      }
      // For non-numeric strings, could implement mapping logic
      return 0;
    }

    if (typeof answer === 'object' && answer !== null) {
      // Handle JSON objects - look for common patterns
      if (answer.value !== undefined) {
        return this.extractNumericalValue(answer.value);
      }
      if (answer.score !== undefined) {
        return this.extractNumericalValue(answer.score);
      }
      if (answer.rating !== undefined) {
        return this.extractNumericalValue(answer.rating);
      }
      // For arrays, take first numerical value or length
      if (Array.isArray(answer)) {
        if (answer.length > 0 && typeof answer[0] === 'number') {
          return answer[0];
        }
        return answer.length;
      }
    }

    if (typeof answer === 'boolean') {
      return answer ? 1 : 0;
    }

    return 0;
  }

  /**
   * Normalize features to 0-1 range
   * @param dataPoints Data points to normalize
   * @returns Normalized data points
   */
  static normalizeFeatures(dataPoints: DataPoint[]): DataPoint[] {
    if (dataPoints.length === 0) return dataPoints;

    const featureCount = dataPoints[0].features.length;
    const mins = new Array(featureCount).fill(Infinity);
    const maxs = new Array(featureCount).fill(-Infinity);

    // Find min and max for each feature
    dataPoints.forEach((point) => {
      point.features.forEach((value, index) => {
        mins[index] = Math.min(mins[index], value);
        maxs[index] = Math.max(maxs[index], value);
      });
    });

    // Normalize features
    return dataPoints.map((point) => ({
      ...point,
      features: point.features.map((value, index) => {
        const range = maxs[index] - mins[index];
        return range === 0 ? 0 : (value - mins[index]) / range;
      }),
    }));
  }

  /**
   * Filter responses by date range
   * @param responses Survey responses
   * @param startDate Start date (ISO string)
   * @param endDate End date (ISO string)
   * @returns Filtered responses
   */
  static filterByDateRange(
    responses: SurveyResponse[],
    startDate?: string,
    endDate?: string
  ): SurveyResponse[] {
    return responses.filter((response) => {
      const responseDate = new Date(response.created_at);

      if (startDate && responseDate < new Date(startDate)) {
        return false;
      }

      if (endDate && responseDate > new Date(endDate)) {
        return false;
      }

      return true;
    });
  }

  /**
   * Group responses by segment
   * @param responses Survey responses
   * @returns Map of segment to responses
   */
  static groupBySegment(responses: SurveyResponse[]): Map<string, SurveyResponse[]> {
    const segments = new Map<string, SurveyResponse[]>();

    responses.forEach((response) => {
      // Try to determine segment from question answers
      let segment = 'unknown';

      for (const qa of response.question_answers) {
        if (qa.question?.segment) {
          segment = qa.question.segment;
          break;
        }
      }

      if (!segments.has(segment)) {
        segments.set(segment, []);
      }
      segments.get(segment)!.push(response);
    });

    return segments;
  }
}
