/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AI-Powered Symptom Checker & Triage Assistant
 * Canonical Symptom Normalization & Synonym Mapping
 * 
 * Purpose:
 * Patients rarely describe their condition using clinical taxonomy (e.g., "acute pharyngitis").
 * Instead, they use colloquial expressions like "my throat is scratchy and burning".
 * This dictionary maps common lay terms and colloquial phrases to normalized,
 * canonical symptom identifiers for rule-based matching.
 */

export interface SymptomConcept {
  id: string;
  canonicalName: string;
  category: 'respiratory' | 'systemic' | 'gastrointestinal' | 'neurological' | 'musculoskeletal' | 'dermatological' | 'other';
  aliases: string[];
  description: string;
}

export const SYMPTOM_CONCEPTS: SymptomConcept[] = [
  {
    id: 'symp_sore_throat',
    canonicalName: 'Sore Throat (Pharyngitis)',
    category: 'respiratory',
    aliases: ['sore throat', 'scratchy throat', 'throat hurts', 'throat burning', 'pain swallowing', 'hurts to swallow', 'raw throat', 'inflamed throat'],
    description: 'Pain, scratchiness, or irritation of the throat that often worsens when swallowing.'
  },
  {
    id: 'symp_nasal_congestion',
    canonicalName: 'Nasal Congestion / Runny Nose',
    category: 'respiratory',
    aliases: ['runny nose', 'stuffy nose', 'congested', 'nasal congestion', 'blocked nose', 'sniffling', 'rhinorrhea', 'stuffed up', 'mucus in nose'],
    description: 'Obstruction or excessive secretion in the nasal passages.'
  },
  {
    id: 'symp_cough',
    canonicalName: 'Cough',
    category: 'respiratory',
    aliases: ['cough', 'coughing', 'dry cough', 'wet cough', 'hacking cough', 'chest cough', 'productive cough', 'tickle in throat cough'],
    description: 'A sudden, repetitive reflex clearing the breathing passages of secretions, irritants, or foreign particles.'
  },
  {
    id: 'symp_sneezing',
    canonicalName: 'Sneezing',
    category: 'respiratory',
    aliases: ['sneezing', 'sneeze', 'sneezed', 'fits of sneezing'],
    description: 'Involuntary expulsion of air from the nose and mouth caused by irritation of nasal mucosa.'
  },
  {
    id: 'symp_fever',
    canonicalName: 'Fever (Pyrexia)',
    category: 'systemic',
    aliases: ['fever', 'feverish', 'high temperature', 'chills', 'elevated temp', 'feeling hot and cold', 'sweating with fever', 'temperature'],
    description: 'An elevation of body temperature above the normal physiological range (>38.0°C / 100.4°F).'
  },
  {
    id: 'symp_fatigue',
    canonicalName: 'Fatigue / Malaise',
    category: 'systemic',
    aliases: ['fatigue', 'tired', 'tiredness', 'exhausted', 'exhaustion', 'run down', 'lethargic', 'low energy', 'weakness', 'malaise'],
    description: 'Persistent feeling of tiredness, lack of energy, or physical exhaustion not relieved by typical rest.'
  },
  {
    id: 'symp_headache',
    canonicalName: 'Headache (Cephalea)',
    category: 'neurological',
    aliases: ['headache', 'head ache', 'head pounding', 'throbbing head', 'pain in head', 'temple pain', 'frontal headache', 'dull ache in head'],
    description: 'Pain or discomfort in the head, scalp, or forehead region.'
  },
  {
    id: 'symp_migraine_characteristics',
    canonicalName: 'Migraine Symptoms (Unilateral / Throbbing / Aura)',
    category: 'neurological',
    aliases: ['migraine', 'light sensitivity', 'photophobia', 'sound sensitivity', 'visual aura', 'pulsating headache', 'one sided headache', 'flashing lights'],
    description: 'Recurrent severe headache disorder frequently unilateral, throbbing, and associated with nausea and sensory hypersensitivity.'
  },
  {
    id: 'symp_nausea_vomiting',
    canonicalName: 'Nausea and Vomiting',
    category: 'gastrointestinal',
    aliases: ['nausea', 'vomiting', 'throwing up', 'threw up', 'queasy', 'sick to stomach', 'emesis', 'barfing', 'upset stomach'],
    description: 'Sensation of unease and discomfort in the stomach with an urge to vomit, or involuntary expulsion of gastric contents.'
  },
  {
    id: 'symp_diarrhea',
    canonicalName: 'Diarrhea',
    category: 'gastrointestinal',
    aliases: ['diarrhea', 'loose stools', 'watery stool', 'watery stools', 'frequent bowel movements', 'the runs'],
    description: 'Passage of three or more loose, liquid, or watery stools per day.'
  },
  {
    id: 'symp_abdominal_pain',
    canonicalName: 'Abdominal Pain / Cramping',
    category: 'gastrointestinal',
    aliases: ['abdominal pain', 'stomach pain', 'belly pain', 'stomach cramps', 'tummy ache', 'abdominal cramps', 'gut ache', 'stomach hurts'],
    description: 'Pain, aching, or cramping sensation localized between the chest and groin.'
  },
  {
    id: 'symp_muscle_aches',
    canonicalName: 'Muscle Aches (Myalgia)',
    category: 'musculoskeletal',
    aliases: ['muscle aches', 'body aches', 'sore muscles', 'myalgia', 'aching all over', 'aching joints', 'muscle soreness', 'stiff muscles'],
    description: 'Generalized or localized muscular pain, tenderness, or aching.'
  },
  {
    id: 'symp_itchy_watery_eyes',
    canonicalName: 'Itchy / Watery Eyes (Allergic Conjunctivitis)',
    category: 'respiratory',
    aliases: ['itchy eyes', 'watery eyes', 'eye itching', 'red itchy eyes', 'tearing eyes', 'swollen eyes from allergies'],
    description: 'Bilateral ocular pruritus, conjunctival injection, and tearing, often allergy-mediated.'
  },
  {
    id: 'symp_shortness_of_breath_mild',
    canonicalName: 'Shortness of Breath (Dyspnea)',
    category: 'respiratory',
    aliases: ['shortness of breath', 'winded', 'out of breath', 'breathless', 'mild wheezing', 'hard to catch breath'],
    description: 'Subjective feeling of breathing discomfort or increased effort of breathing.'
  },
  {
    id: 'symp_skin_rash',
    canonicalName: 'Skin Rash / Pruritus',
    category: 'dermatological',
    aliases: ['skin rash', 'itchy rash', 'red spots', 'hives', 'urticaria', 'itchy skin', 'welts', 'flaky skin'],
    description: 'Noticeable change in the texture or color of the skin, often accompanied by irritation or itching.'
  },
  {
    id: 'symp_dizziness',
    canonicalName: 'Dizziness / Lightheadedness',
    category: 'neurological',
    aliases: ['dizziness', 'dizzy', 'lightheaded', 'woozy', 'feeling faint', 'spinning sensation', 'vertigo'],
    description: 'Impairment in spatial perception and stability, feeling lightheaded or experiencing an illusion of movement.'
  }
];

/**
 * Searches the text for any known symptom concept aliases.
 */
export function matchSymptomConcepts(normalizedText: string): {
  concept: SymptomConcept;
  matchedAlias: string;
}[] {
  const matches: { concept: SymptomConcept; matchedAlias: string }[] = [];
  const scanned = ` ${normalizedText.toLowerCase()} `;

  for (const concept of SYMPTOM_CONCEPTS) {
    for (const alias of concept.aliases) {
      const target = ` ${alias.toLowerCase()} `;
      if (scanned.includes(target) || scanned.includes(alias.toLowerCase())) {
        matches.push({
          concept,
          matchedAlias: alias
        });
        break; // Match once per concept
      }
    }
  }

  return matches;
}
