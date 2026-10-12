/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AI-Powered Symptom Checker & Triage Assistant
 * NLP Stop Words Dictionary
 * 
 * Purpose:
 * In natural language processing, stop words are common auxiliary words
 * that carry minimal discriminative semantic meaning for symptom classification.
 * Removing these words reduces noise before keyword mapping, while retaining
 * key symptom descriptors.
 */

export const STOP_WORDS: Set<string> = new Set([
  // Auxiliary & pronouns
  'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your',
  'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she',
  'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their',
  'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that',
  'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an',
  'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of',
  'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through',
  'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down',
  'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then',
  'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any',
  'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'only',
  'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will',
  'just', 'don', 'should', 'now',

  // Conversational conversational filler words common in symptom descriptions
  'feel', 'feeling', 'felt', 'started', 'starting', 'experiencing', 'experience',
  'seems', 'seemed', 'notice', 'noticed', 'got', 'getting', 'having', 'having been',
  'since', 'yesterday', 'today', 'days', 'hours', 'ago', 'lately', 'recently',
  'bit', 'kind', 'sort', 'little', 'lot', 'pretty', 'quite', 'really',
  'also', 'like', 'well', 'think', 'maybe', 'probably', 'around', 'about'
]);

/**
 * Checks whether a normalized single token is in the stop word list.
 */
export function isStopWord(token: string): boolean {
  return STOP_WORDS.has(token.toLowerCase().trim());
}
