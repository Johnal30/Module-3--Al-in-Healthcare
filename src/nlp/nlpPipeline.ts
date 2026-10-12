/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AI-Powered Symptom Checker & Triage Assistant
 * NLP Text Processing Pipeline & Matching Engine
 * 
 * PIPELINE STAGES:
 * 1. Sanitization & Normalization (lowercase, strip noise, expand contractions)
 * 2. Tokenization (word segmentation)
 * 3. Stop-Word Removal (filtering non-discriminative syntactic tokens)
 * 4. N-Gram Extraction (unigrams, bigrams, trigrams for compound phrases)
 * 5. Emergency Safety Screening (PRIORITY 1: deterministic hard-stop rules)
 * 6. Canonical Symptom Concept Extraction (using synonym mapping dictionary)
 * 7. Knowledge Base Reference Matching (calculating criteria overlap, NO fake probabilities)
 * 8. Conservative Uncertainty Evaluation (flagging unrecognized / ambiguous input)
 */

import {
  AnalysisResult,
  PipelineTrace,
  RecognizedSymptom,
  ConditionMatch,
  AgeRange,
  SymptomDuration
} from '../types';
import { isStopWord } from './stopWords';
import { matchSymptomConcepts, SYMPTOM_CONCEPTS } from './synonyms';
import { evaluateEmergencyRules } from './safetyRules';
import { DEMO_KNOWLEDGE_BASE } from './knowledgeBase';

/** Common contractions expansion map */
const CONTRACTIONS: Record<string, string> = {
  "can't": "cannot",
  "won't": "will not",
  "i'm": "i am",
  "im": "i am",
  "it's": "it is",
  "its": "it is",
  "didn't": "did not",
  "don't": "do not",
  "doesn't": "does not",
  "haven't": "have not",
  "hasn't": "has not",
  "couldn't": "could not",
  "shouldn't": "should not",
  "wouldn't": "would not",
  "wasn't": "was not",
  "weren't": "were not",
  "aren't": "are not",
  "isn't": "is not",
  "i've": "i have",
  "ive": "i have",
  "i'll": "i will",
  "ill": "i will",
  "i'd": "i would"
};

/**
 * Stage 1: Text Sanitization & Normalization
 * Converts to lowercase, expands contractions, strips unusual non-alphanumeric punctuation.
 */
export function normalizeText(rawInput: string): string {
  if (!rawInput) return '';

  let text = rawInput.toLowerCase().trim();

  // Expand contractions
  for (const [contraction, expansion] of Object.entries(CONTRACTIONS)) {
    // Regex matching word boundary
    const regex = new RegExp(`\\b${contraction}\\b`, 'gi');
    text = text.replace(regex, expansion);
  }

  // Replace punctuation (except hyphens and basic commas) with whitespace
  text = text.replace(/[^a-z0-9\s-]/g, ' ');

  // Collapse multiple whitespaces into a single space
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

/**
 * Stage 2: Tokenization
 * Splits normalized string into discrete word tokens.
 */
export function tokenize(normalizedText: string): string[] {
  if (!normalizedText) return [];
  return normalizedText
    .split(/\s+/)
    .map(t => t.trim())
    .filter(t => t.length > 0);
}

/**
 * Stage 3: Stop-Word Filtering
 * Removes non-discriminative grammar tokens while preserving medical terminology.
 */
export function filterStopWords(tokens: string[]): string[] {
  return tokens.filter(token => !isStopWord(token));
}

/**
 * Stage 4: N-Gram Extraction
 * Creates bigrams and trigrams so multi-word concepts like "sore throat" or "shortness of breath"
 * can be examined alongside unigrams.
 */
export function extractNgrams(tokens: string[], maxN: number = 3): string[] {
  const ngrams: string[] = [];

  // Add individual tokens
  for (const token of tokens) {
    ngrams.push(token);
  }

  // Bigrams
  if (maxN >= 2) {
    for (let i = 0; i < tokens.length - 1; i++) {
      ngrams.push(`${tokens[i]} ${tokens[i + 1]}`);
    }
  }

  // Trigrams
  if (maxN >= 3) {
    for (let i = 0; i < tokens.length - 2; i++) {
      ngrams.push(`${tokens[i]} ${tokens[i + 1]} ${tokens[i + 2]}`);
    }
  }

  return ngrams;
}

/**
 * Stage 6: Canonical Symptom Recognition
 * Matches tokens and phrases against known medical concepts.
 */
export function identifyRecognizedSymptoms(
  normalizedText: string,
  filteredTokens: string[]
): RecognizedSymptom[] {
  const recognizedList: RecognizedSymptom[] = [];
  const addedCanonicalNames = new Set<string>();

  // 1. Check multi-phrase concept aliases
  const conceptMatches = matchSymptomConcepts(normalizedText);
  for (const match of conceptMatches) {
    if (!addedCanonicalNames.has(match.concept.canonicalName)) {
      addedCanonicalNames.add(match.concept.canonicalName);
      recognizedList.push({
        originalText: match.matchedAlias,
        canonicalName: match.concept.canonicalName,
        category: match.concept.category,
        confidenceReason: `Matched synonym alias "${match.matchedAlias}" from knowledge taxonomy`
      });
    }
  }

  // 2. Check individual filtered tokens directly against concept keywords
  for (const token of filteredTokens) {
    for (const concept of SYMPTOM_CONCEPTS) {
      if (addedCanonicalNames.has(concept.canonicalName)) continue;

      if (concept.aliases.some(alias => alias === token)) {
        addedCanonicalNames.add(concept.canonicalName);
        recognizedList.push({
          originalText: token,
          canonicalName: concept.canonicalName,
          category: concept.category,
          confidenceReason: `Exact token match on concept "${concept.canonicalName}"`
        });
      }
    }
  }

  return recognizedList;
}

/**
 * Stage 7: Transparent Knowledge Base Reference Matching
 * 
 * CRITICAL RULE:
 * We deliberately DO NOT generate pseudo-probability percentages (e.g., "You have a 78% probability of X").
 * Doing so is unvalidated, ethically hazardous, and misleads patients.
 * Instead, we compute explicit criteria overlap:
 * e.g., "Matches 3 of 4 primary criteria: sore throat, runny nose, sneezing".
 */
export function matchAgainstKnowledgeBase(
  normalizedText: string,
  recognizedSymptoms: RecognizedSymptom[]
): ConditionMatch[] {
  const matches: ConditionMatch[] = [];
  const scannedText = ` ${normalizedText.toLowerCase()} `;
  const recognizedNamesLower = recognizedSymptoms.map(r => r.canonicalName.toLowerCase());

  for (const condition of DEMO_KNOWLEDGE_BASE) {
    const matchedTerms: string[] = [];
    let primaryMatchCount = 0;
    let secondaryMatchCount = 0;

    // Check primary symptoms
    for (const symptom of condition.primarySymptoms) {
      const symLower = symptom.toLowerCase();
      // Match if symptom text is in scannedText or in recognized symptom names
      if (
        scannedText.includes(symLower) ||
        recognizedNamesLower.some(r => r.includes(symLower) || symLower.includes(r.split(' ')[0]))
      ) {
        primaryMatchCount++;
        matchedTerms.push(symptom);
      }
    }

    // Check secondary symptoms
    for (const symptom of condition.secondarySymptoms) {
      const symLower = symptom.toLowerCase();
      if (
        scannedText.includes(symLower) ||
        recognizedNamesLower.some(r => r.includes(symLower) || symLower.includes(r.split(' ')[0]))
      ) {
        secondaryMatchCount++;
        if (!matchedTerms.includes(symptom)) {
          matchedTerms.push(symptom);
        }
      }
    }

    // Only include conditions where at least 1 primary symptom or 2 secondary symptoms matched
    if (primaryMatchCount >= 1 || secondaryMatchCount >= 2) {
      const totalPrimary = condition.primarySymptoms.length;
      let relevance: 'high' | 'moderate' | 'low' = 'low';

      if (primaryMatchCount >= 2 || (primaryMatchCount >= 1 && secondaryMatchCount >= 2)) {
        relevance = 'high';
      } else if (primaryMatchCount === 1 || secondaryMatchCount >= 2) {
        relevance = 'moderate';
      }

      const matchScoreDescription = `${primaryMatchCount} of ${totalPrimary} primary criteria matched (${matchedTerms.length} total symptom overlap)`;

      matches.push({
        condition,
        matchedPrimaryCount: primaryMatchCount,
        matchedSecondaryCount: secondaryMatchCount,
        matchedTerms,
        matchScoreDescription,
        matchRelevance: relevance
      });
    }
  }

  // Sort by highest primary match count first, then total matched terms
  matches.sort((a, b) => {
    if (b.matchedPrimaryCount !== a.matchedPrimaryCount) {
      return b.matchedPrimaryCount - a.matchedPrimaryCount;
    }
    return b.matchedTerms.length - a.matchedTerms.length;
  });

  return matches;
}

/**
 * Primary Analysis Entry Point
 * Executes all 8 pipeline stages in sequence, collecting intermediate traces for complete transparency.
 */
export function analyzeSymptomInput(
  rawInput: string,
  ageRange: AgeRange = 'unspecified',
  duration: SymptomDuration = 'unspecified'
): AnalysisResult {
  const startTime = performance.now();

  // Stage 1: Normalize
  const normalizedText = normalizeText(rawInput);

  // Stage 2: Tokenize
  const tokens = tokenize(normalizedText);

  // Stage 3: Stop-word filtering
  const filteredTokens = filterStopWords(tokens);

  // Stage 4: N-grams
  const extractedNgrams = extractNgrams(tokens, 3);

  // Stage 5: Emergency Screening (PRIORITY 1)
  // Evaluated on normalizedText to capture multi-word red flags
  const emergencyScreening = evaluateEmergencyRules(normalizedText);

  // Stage 6: Recognized symptoms
  const recognizedSymptoms = identifyRecognizedSymptoms(normalizedText, filteredTokens);

  // Stage 7: Knowledge base matching
  const conditionMatches = matchAgainstKnowledgeBase(normalizedText, recognizedSymptoms);

  // Stage 8: Uncertainty & Unrecognized Input Check
  // Input is marked unrecognized if:
  // - No emergency was detected AND
  // - No recognized medical concepts were identified AND
  // - No condition matched
  const isUnrecognized =
    !emergencyScreening.isEmergency &&
    recognizedSymptoms.length === 0 &&
    conditionMatches.length === 0;

  const durationMs = Math.round(performance.now() - startTime);

  const pipelineTrace: PipelineTrace = {
    rawInput,
    normalizedText,
    tokens,
    filteredTokens,
    extractedNgrams,
    recognizedSymptoms,
    emergencyScreening,
    conditionMatches,
    isUnrecognized,
    processingTimeMs: durationMs
  };

  return {
    id: `eval_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    inputSummary: {
      rawText: rawInput,
      ageRange,
      duration
    },
    pipelineTrace,
    emergencyResult: emergencyScreening,
    recognizedSymptoms,
    matchedConditions: conditionMatches,
    isUnrecognized
  };
}
