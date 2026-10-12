/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AI-Powered Symptom Checker & Triage Assistant
 * Emergency Safety Rules Engine (Priority 1 Check)
 * 
 * SAFETY ARCHITECTURE PRINCIPLES:
 * 1. PRE-SCREENING PRIORITY:
 *    Emergency checks are always executed prior to and independently of any
 *    general symptom knowledge base matching. If an emergency phrase is detected,
 *    it triggers an unyielding high-priority emergency alert.
 * 
 * 2. ZERO FALSE-SAFETY REASSURANCE:
 *    An algorithm CANNOT prove the absence of life-threatening disease based
 *    on absence of keyword matches. The system never reassures a user that they
 *    are "safe" or "cleared" from danger.
 * 
 * 3. NO INDEPENDENT TRIAGE OR DEFINITIVE DIAGNOSIS:
 *    This educational prototype does not calculate clinical risk scores (like ESI or NEWS2)
 *    and never assigns a definitive clinical diagnosis.
 * 
 * 4. KNOWN INCOMPLETE LIST WARNING:
 *    All user alerts emphasize that keyword matching is non-exhaustive; atypical
 *    presentations (e.g. silent ischemia, diabetic ketoacidosis, atypical stroke)
 *    cannot be reliably ruled out by simple string search.
 */

import { EmergencyRule, EmergencyCheckResult } from '../types';

/**
 * Predefined Demonstration Emergency Warning Rules
 * Grounded in standard emergency medicine red-flag triage protocols (e.g., AHA/ASA, CDC, WHO).
 */
export const EMERGENCY_RULES: EmergencyRule[] = [
  {
    id: 'emg-cardiac',
    name: 'Cardiovascular Emergency / Acute Coronary Syndrome',
    category: 'cardiovascular',
    keywords: [
      'chest pain',
      'chest pressure',
      'crushing chest pain',
      'crushing pain',
      'tightness in chest',
      'chest tightness',
      'pain radiating to arm',
      'pain in left arm',
      'pain radiating to jaw',
      'heavy pressure on chest',
      'squeezing chest',
      'heart attack'
    ],
    rationale: 'Chest discomfort accompanied by pressure, crushing sensation, or radiation can indicate myocardial infarction or acute coronary syndrome requiring immediate revascularization.',
    recommendedAction: 'Call 911 (or local emergency services) immediately. Sit down, stay calm, and do not drive yourself to the hospital.'
  },
  {
    id: 'emg-respiratory',
    name: 'Severe Respiratory Distress / Hypoxia Warning',
    category: 'respiratory',
    keywords: [
      'severe breathing difficulty',
      'severe shortness of breath',
      'struggling to breathe',
      'cannot breathe',
      'can not breathe',
      'can\'t breathe',
      'unable to breathe',
      'gasping for air',
      'blue lips',
      'blue fingernails',
      'suffocating',
      'choking',
      'severe asthma attack'
    ],
    rationale: 'Acute respiratory compromise or signs of cyanosis indicate potential airway obstruction, acute pulmonary embolism, severe asthma exacerbation, or respiratory failure.',
    recommendedAction: 'Call 911 immediately. Keep the patient upright and calm. Seek emergency oxygen and advanced airway support.'
  },
  {
    id: 'emg-neurological-stroke',
    name: 'Acute Neurological Deficit / Stroke Warning (FAST)',
    category: 'neurological',
    keywords: [
      'facial drooping',
      'drooping face',
      'arm weakness',
      'weakness on one side',
      'slurred speech',
      'cannot speak',
      'can\'t speak',
      'sudden numbness',
      'sudden paralysis',
      'stroke',
      'loss of balance and speech',
      'one side of body numb'
    ],
    rationale: 'Sudden focal neurological deficits (Face drooping, Arm weakness, Speech difficulty) are hallmark warning signs of acute ischemic or hemorrhagic stroke, where time is brain tissue.',
    recommendedAction: 'Call 911 immediately. Note the exact time when symptoms first began for clot-dissolving (thrombolytic) eligibility.'
  },
  {
    id: 'emg-neurological-consciousness',
    name: 'Altered Consciousness / Syncope / Seizure',
    category: 'neurological',
    keywords: [
      'loss of consciousness',
      'passed out',
      'passing out',
      'unresponsive',
      'cannot wake up',
      'fainted and not waking',
      'active seizure',
      'violent convulsions',
      'blacked out'
    ],
    rationale: 'Acute loss of consciousness, persistent unresponsiveness, or prolonged seizure activity may reflect intracranial hemorrhage, severe hypoglycemia, cardiac arrhythmia, or status epilepticus.',
    recommendedAction: 'Call 911 immediately. Place the person in the recovery position (on their side) if breathing, protect the head, and ensure the airway is clear. Do not place objects in their mouth.'
  },
  {
    id: 'emg-headache-thunderclap',
    name: 'Thunderclap Headache / Subarachnoid Hemorrhage',
    category: 'neurological',
    keywords: [
      'worst headache of my life',
      'worst headache of life',
      'thunderclap headache',
      'sudden severe explosive headache',
      'headache reaching peak in seconds'
    ],
    rationale: 'Headaches that reach maximum intensity within 1 minute ("thunderclap") suggest subarachnoid hemorrhage from a ruptured cerebral aneurysm until proven otherwise.',
    recommendedAction: 'Call 911 or proceed immediately to the nearest Emergency Department for emergent non-contrast head CT neuroimaging.'
  },
  {
    id: 'emg-anaphylaxis',
    name: 'Systemic Anaphylaxis / Severe Allergic Reaction',
    category: 'anaphylaxis',
    keywords: [
      'throat closing',
      'throat swelling',
      'swollen tongue',
      'swollen lips',
      'difficulty swallowing with hives',
      'anaphylaxis',
      'allergic reaction unable to breathe'
    ],
    rationale: 'Rapid airway compromise accompanied by mucosal edema or respiratory stridor is life-threatening anaphylaxis requiring intramuscular epinephrine and airway protection.',
    recommendedAction: 'Administer an epinephrine auto-injector (EpiPen) immediately if available into the outer thigh, and call 911 immediately.'
  },
  {
    id: 'emg-hemorrhage',
    name: 'Severe Hemorrhage / Massive Bleeding',
    category: 'severe_trauma_hemorrhage',
    keywords: [
      'coughing up blood',
      'vomiting blood',
      'large amount of blood',
      'severe uncontrolled bleeding',
      'massive bleeding',
      'coughing blood'
    ],
    rationale: 'Massive hemoptysis, hematemesis, or uncontrolled arterial/venous hemorrhage threatens hemodynamic stability and airway patency.',
    recommendedAction: 'Call 911 immediately. For visible wounds, apply firm, continuous direct pressure with a clean cloth.'
  },
  {
    id: 'emg-infection-meningismus',
    name: 'Meningismus / Severe Central Nervous System Infection',
    category: 'infection_critical',
    keywords: [
      'stiff neck with high fever',
      'stiff neck and fever and confusion',
      'inability to flex neck with fever',
      'purple rash with high fever'
    ],
    rationale: 'Nuchal rigidity co-occurring with fever, confusion, or a non-blanching petechial purpuric rash is a clinical triad indicative of acute bacterial meningitis.',
    recommendedAction: 'Call 911 immediately. Bacterial meningitis is a medical emergency requiring rapid intravenous antimicrobial therapy.'
  }
];

/**
 * Evaluates user input against safety rules.
 * 
 * Safety check logic:
 * - Converts input to lowercase normalized text.
 * - Checks for exact phrase substring matches against each emergency keyword.
 * - Collects all matching rules and exact triggered phrases.
 * - Always handles uncertainty conservatively: if any rule matches, flags emergency.
 * - Emphasizes that absence of match does NOT mean safe.
 * 
 * @param normalizedInput Text normalized by NLP pre-processing
 * @returns EmergencyCheckResult with matched rules, detected phrases, and emergency instructions
 */
export function evaluateEmergencyRules(normalizedInput: string): EmergencyCheckResult {
  const matchedRules: EmergencyRule[] = [];
  const detectedPhrasesSet = new Set<string>();

  const textToScan = ` ${normalizedInput.toLowerCase()} `;

  for (const rule of EMERGENCY_RULES) {
    let ruleMatched = false;
    for (const keyword of rule.keywords) {
      // Normalize keyword for consistent comparison
      const normalizedKeyword = keyword.toLowerCase().trim();
      
      // Match phrase within word boundaries or substring
      if (textToScan.includes(normalizedKeyword)) {
        ruleMatched = true;
        detectedPhrasesSet.add(keyword);
      }
    }

    if (ruleMatched) {
      matchedRules.push(rule);
    }
  }

  const detectedPhrases = Array.from(detectedPhrasesSet);
  const isEmergency = matchedRules.length > 0;

  const immediateInstructions = isEmergency
    ? 'POTENTIAL MEDICAL EMERGENCY DETECTED: If you or someone you are assisting is experiencing acute or life-threatening symptoms, immediately call 911 (in the US) or your local emergency number. Do not wait for symptoms to improve, and do not drive yourself.'
    : 'No predefined emergency warning phrases were matched. However, this prototype cannot rule out an emergency. If symptoms are severe, worsening, or concerning, seek immediate medical attention.';

  return {
    isEmergency,
    matchedRules,
    detectedPhrases,
    immediateInstructions
  };
}
