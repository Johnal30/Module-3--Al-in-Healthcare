/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AI-Powered Symptom Checker & Triage Assistant
 * Type definitions for NLP pipeline, safety screening, knowledge base, and test suites.
 */

/** Age group categories for contextual educational guidance */
export type AgeRange = 'child' | 'adolescent' | 'adult' | 'older_adult' | 'unspecified';

/** Duration brackets for symptom onset */
export type SymptomDuration = 'less_24h' | '1_to_3_days' | '4_to_7_days' | '1_to_2_weeks' | 'more_2_weeks' | 'unspecified';

/** Triage urgency category (strictly educational; never clinical diagnosis) */
export type TriageUrgency = 'emergency' | 'urgent_care' | 'primary_care' | 'self_care_monitoring' | 'unclear';

/** Definition of an emergency rule */
export interface EmergencyRule {
  id: string;
  name: string;
  category: 'cardiovascular' | 'respiratory' | 'neurological' | 'anaphylaxis' | 'infection_critical' | 'severe_trauma_hemorrhage';
  keywords: string[];
  rationale: string;
  recommendedAction: string;
}

/** Result of an emergency screening evaluation */
export interface EmergencyCheckResult {
  isEmergency: boolean;
  matchedRules: EmergencyRule[];
  detectedPhrases: string[];
  immediateInstructions: string;
}

/** Normalized symptom phrase matched from input */
export interface RecognizedSymptom {
  originalText: string;
  canonicalName: string;
  category: 'respiratory' | 'systemic' | 'gastrointestinal' | 'neurological' | 'musculoskeletal' | 'dermatological' | 'other';
  confidenceReason: string;
}

/** Demonstration knowledge base condition entry */
export interface EducationalCondition {
  id: string;
  name: string;
  icdReference: string;
  category: string;
  summary: string;
  pathologyNote: string;
  primarySymptoms: string[];
  secondarySymptoms: string[];
  typicalDuration: string;
  supportiveCare: string[];
  redFlagWarningSigns: string[];
  questionsForDoctor: string[];
  educationalTriageLevel: TriageUrgency;
}

/** Result of matching against the demonstration knowledge base */
export interface ConditionMatch {
  condition: EducationalCondition;
  matchedPrimaryCount: number;
  matchedSecondaryCount: number;
  matchedTerms: string[];
  matchScoreDescription: string;
  matchRelevance: 'high' | 'moderate' | 'low';
}

/** Trace data for each stage in the NLP processing pipeline */
export interface PipelineTrace {
  rawInput: string;
  normalizedText: string;
  tokens: string[];
  filteredTokens: string[];
  extractedNgrams: string[];
  recognizedSymptoms: RecognizedSymptom[];
  emergencyScreening: EmergencyCheckResult;
  conditionMatches: ConditionMatch[];
  isUnrecognized: boolean;
  processingTimeMs: number;
}

/** Analysis result payload */
export interface AnalysisResult {
  id: string;
  timestamp: string;
  inputSummary: {
    rawText: string;
    ageRange: AgeRange;
    duration: SymptomDuration;
  };
  pipelineTrace: PipelineTrace;
  emergencyResult: EmergencyCheckResult;
  recognizedSymptoms: RecognizedSymptom[];
  matchedConditions: ConditionMatch[];
  isUnrecognized: boolean;
}

/** Test case structure for verification */
export interface TestCase {
  id: string;
  title: string;
  category: 'emergency' | 'common_symptom' | 'empty_input' | 'unrecognized' | 'mixed_symptoms';
  input: string;
  ageRange?: AgeRange;
  duration?: SymptomDuration;
  expectedEmergency: boolean;
  expectedRecognizedTerms: string[];
  expectedConditionId?: string;
  description: string;
}

/** Live test run execution result */
export interface TestRunResult {
  testCase: TestCase;
  passed: boolean;
  detectedEmergency: boolean;
  recognizedTerms: string[];
  durationMs: number;
  notes: string;
}
