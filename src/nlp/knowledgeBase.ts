/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AI-Powered Symptom Checker & Triage Assistant
 * Transparent Demonstration Knowledge Base
 * 
 * CORE EDUCATIONAL CONSTRAINTS:
 * 1. NO PSEUDO-PROBABILITIES: We deliberately avoid outputting "92% likelihood"
 *    or Bayesian belief scores. Instead, we show an honest transparent overlap:
 *    "Matched 3 of 4 primary criteria in educational reference profile."
 * 2. TRANSPARENT CRITERIA: Every rule and criterion is open for inspection.
 * 3. NON-DIAGNOSTIC NATURE: Condition entries represent educational medical
 *    reference profiles, not personal clinical diagnoses.
 */

import { EducationalCondition } from '../types';

export const DEMO_KNOWLEDGE_BASE: EducationalCondition[] = [
  {
    id: 'cond_common_cold',
    name: 'Upper Respiratory Viral Infection (Common Cold)',
    icdReference: 'ICD-10 J00',
    category: 'Respiratory / Viral',
    summary: 'A benign, self-limiting viral infection of the upper respiratory tract commonly caused by rhinoviruses, coronaviruses, or adenoviruses.',
    pathologyNote: 'Infection causes local mucosal inflammation, hypersecretion of mucus, and vasodilation in nasal tissues. Usually peaks in 2-3 days.',
    primarySymptoms: [
      'runny nose',
      'nasal congestion',
      'sore throat',
      'sneezing'
    ],
    secondarySymptoms: [
      'mild cough',
      'low fever',
      'fatigue',
      'mild headache'
    ],
    typicalDuration: '7 to 10 days',
    supportiveCare: [
      'Adequate oral hydration (water, warm broth, herbal tea)',
      'Saline nasal spray or sinus rinses to ease congestion',
      'Sufficient rest to support immune recovery',
      'Honey or warm fluids for throat soothing (avoid honey for infants under 1 year)'
    ],
    redFlagWarningSigns: [
      'High fever persisting beyond 3 days (>38.5°C / 101.3°F)',
      'Severe difficulty breathing or wheezing',
      'Severe ear pain or purulent discharge',
      'Symptoms worsening significantly after starting to improve'
    ],
    questionsForDoctor: [
      'Is my symptom duration typical for a standard seasonal viral infection?',
      'Could my symptoms represent a secondary bacterial sinus or ear infection?',
      'Which over-the-counter symptomatic relief options are safe with my current medications?'
    ],
    educationalTriageLevel: 'self_care_monitoring'
  },
  {
    id: 'cond_allergic_rhinitis',
    name: 'Seasonal Allergic Rhinitis (Hay Fever)',
    icdReference: 'ICD-10 J30.1',
    category: 'Immunological / Allergic',
    summary: 'An IgE-mediated inflammatory response of the nasal membranes triggered by exposure to inhaled environmental allergens (pollen, molds, dust mites, pet dander).',
    pathologyNote: 'Allergen cross-linking of IgE on mast cells triggers histamine release, leading to vascular leakage, pruritus, and clear rhinorrhea without constitutional fever.',
    primarySymptoms: [
      'sneezing',
      'itchy watery eyes',
      'runny nose',
      'nasal congestion'
    ],
    secondarySymptoms: [
      'fatigue',
      'itchy throat',
      'dark under-eye circles',
      'post-nasal drip'
    ],
    typicalDuration: 'Variable; corresponds to ongoing allergen exposure',
    supportiveCare: [
      'Minimizing allergen exposure (keeping windows closed during high pollen counts, air purifiers)',
      'Showering and changing clothing after extended outdoor exposure',
      'Saline nasal irrigation to flush trapped allergens',
      'Consulting a healthcare provider regarding non-drowsy antihistamines or intranasal corticosteroids'
    ],
    redFlagWarningSigns: [
      'Wheezing, chest tightness, or respiratory distress (possible allergic asthma)',
      'Facial pain, swelling, or high fever (unlikely to be simple allergies)'
    ],
    questionsForDoctor: [
      'Would allergy testing (skin prick or specific IgE) be beneficial for identifying my exact triggers?',
      'Are prescription nasal steroid sprays recommended for my pattern of symptoms?'
    ],
    educationalTriageLevel: 'self_care_monitoring'
  },
  {
    id: 'cond_tension_headache',
    name: 'Tension-Type Headache (TTH)',
    icdReference: 'ICD-10 G44.2',
    category: 'Neurological / Primary Headache',
    summary: 'The most common form of primary headache, characterized by mild-to-moderate, non-pulsating bilateral dull ache, often described as a tight band around the head.',
    pathologyNote: 'Thought to involve heightened pericranial myofascial tenderness, prolonged muscle contraction of neck/scalp, and central sensory processing changes.',
    primarySymptoms: [
      'headache',
      'dull ache in head',
      'muscle aches',
      'neck stiffness'
    ],
    secondarySymptoms: [
      'fatigue',
      'mild light sensitivity without nausea',
      'difficulty concentrating'
    ],
    typicalDuration: '30 minutes to several hours, occasionally recurring over days',
    supportiveCare: [
      'Gentle neck and shoulder stretching exercises',
      'Taking regular screen breaks and practicing ergonomic posture',
      'Applying warm or cool compresses to the forehead and neck',
      'Hydration and stress management techniques (mindful breathing)'
    ],
    redFlagWarningSigns: [
      'Sudden onset "thunderclap" headache (reaching maximum intensity in seconds)',
      'Headache with high fever, neck stiffness, and confusion',
      'New onset headache after head injury or trauma',
      'Accompanying neurological deficits (focal weakness, visual loss)'
    ],
    questionsForDoctor: [
      'Could my screen time, ergonomic setup, or stress levels be contributing to these headaches?',
      'How frequently can I safely use over-the-counter analgesics without risking medication-overuse headaches?'
    ],
    educationalTriageLevel: 'self_care_monitoring'
  },
  {
    id: 'cond_migraine',
    name: 'Migraine Headache (Without Aura)',
    icdReference: 'ICD-10 G43.0',
    category: 'Neurological / Neurovascular',
    summary: 'A chronic neurological disorder characterized by recurrent attacks of moderate to severe pulsating, unilateral headache typically exacerbated by routine physical activity.',
    pathologyNote: 'Involves activation of the trigeminovascular system, neurogenic inflammation, and release of neuropeptides like CGRP, accompanied by autonomic and sensory dysfunction.',
    primarySymptoms: [
      'headache',
      'migraine',
      'nausea',
      'light sensitivity'
    ],
    secondarySymptoms: [
      'sound sensitivity',
      'throbbing head',
      'fatigue',
      'dizziness'
    ],
    typicalDuration: '4 to 72 hours per attack if untreated',
    supportiveCare: [
      'Resting in a quiet, dark, temperature-regulated room',
      'Cold compress applied to the forehead or temple',
      'Staying hydrated with cool water',
      'Tracking potential dietary, sleep, or stress triggers in a symptom log'
    ],
    redFlagWarningSigns: [
      'First-ever severe headache after age 50',
      'Sudden thunderclap onset or associated motor weakness/speech difficulty',
      'Accompanying fever, persistent vomiting preventing oral medication, or confusion'
    ],
    questionsForDoctor: [
      'Would prescription migraine-specific therapies (such as triptans or gepants) be appropriate for my attacks?',
      'At what frequency of attacks should we consider preventive prophylactic medication?'
    ],
    educationalTriageLevel: 'primary_care'
  },
  {
    id: 'cond_acute_gastroenteritis',
    name: 'Acute Viral Gastroenteritis ("Stomach Flu")',
    icdReference: 'ICD-10 A08.4',
    category: 'Gastrointestinal / Viral',
    summary: 'An inflammation of the stomach and small/large intestines typically caused by viral pathogens (norovirus, rotavirus), characterized by nausea, vomiting, and diarrhea.',
    pathologyNote: 'Viral replication damages enterocytes in intestinal villi, impairing fluid absorption and causing osmotic and secretory fluid loss.',
    primarySymptoms: [
      'nausea',
      'vomiting',
      'diarrhea',
      'abdominal pain'
    ],
    secondarySymptoms: [
      'low fever',
      'fatigue',
      'muscle aches',
      'headache'
    ],
    typicalDuration: '1 to 3 days (norovirus) or up to 7 days',
    supportiveCare: [
      'Prioritize oral rehydration solutions (ORS) with balanced electrolytes; take small sips frequently',
      'Gradual dietary reintroduction: bland foods (crackers, rice, applesauce, toast) once vomiting subsides',
      'Avoid high-sugar drinks, caffeine, dairy, and fatty foods during acute recovery',
      'Frequent handwashing with soap and water to prevent transmission'
    ],
    redFlagWarningSigns: [
      'Signs of severe dehydration: unable to keep fluids down for >24h, dark urine, extreme thirst, dizziness upon standing',
      'Bloody or black tarry stools',
      'High persistent fever (>38.5°C / 101.3°F)',
      'Severe localized abdominal tenderness (especially right lower quadrant)'
    ],
    questionsForDoctor: [
      'How can I ensure adequate electrolyte replacement if I am struggling to tolerate fluids?',
      'Are anti-diarrheal medications advisable in my situation, or could they prolong viral shedding?'
    ],
    educationalTriageLevel: 'primary_care'
  },
  {
    id: 'cond_acute_bronchitis',
    name: 'Acute Bronchitis (Lower Respiratory Inflammation)',
    icdReference: 'ICD-10 J20.9',
    category: 'Respiratory / Tracheobronchial',
    summary: 'Self-limiting inflammation of the large airways (bronchi) following a viral upper respiratory infection, presenting with persistent cough.',
    pathologyNote: 'Bronchial epithelium becomes hyperreactive following viral injury. Cough reflex hypersensitivity may persist for 2-3 weeks even after viral clearance.',
    primarySymptoms: [
      'cough',
      'fatigue',
      'sore throat',
      'shortness of breath'
    ],
    secondarySymptoms: [
      'low fever',
      'chest discomfort with coughing',
      'nasal congestion',
      'headache'
    ],
    typicalDuration: '10 to 21 days (cough frequently lingers)',
    supportiveCare: [
      'Humidified air or warm steam inhalation to loosen airway mucus',
      'Warm tea with honey (for individuals over age 1)',
      'Avoiding tobacco smoke, chemical fumes, and airborne irritants',
      'Adequate fluid intake and rest'
    ],
    redFlagWarningSigns: [
      'Severe shortness of breath or persistent chest pain',
      'Coughing up blood or rust-colored sputum',
      'High fever (>38.5°C) accompanied by chills and shaking',
      'Cough lasting longer than 3-4 weeks without improvement'
    ],
    questionsForDoctor: [
      'Is my prolonged cough indicative of acute bronchitis or could it be pneumonia or asthma?',
      'Since viruses cause >90% of acute bronchitis, are antibiotics necessary or contraindicated in my case?'
    ],
    educationalTriageLevel: 'primary_care'
  },
  {
    id: 'cond_musculoskeletal_strain',
    name: 'Musculoskeletal Strain / Overuse Myalgia',
    icdReference: 'ICD-10 M79.1',
    category: 'Musculoskeletal / Mechanical',
    summary: 'Stretching or tearing of muscle fibers or tendons resulting from unaccustomed exertion, heavy lifting, or repetitive mechanical stress.',
    pathologyNote: 'Microscopic muscle fiber tears incite local inflammatory cytokine cascades, resulting in localized tenderness, stiffness, and spasm on movement.',
    primarySymptoms: [
      'muscle aches',
      'sore muscles',
      'stiff muscles'
    ],
    secondarySymptoms: [
      'fatigue',
      'localized tenderness',
      'limited range of motion'
    ],
    typicalDuration: '3 to 14 days with progressive recovery',
    supportiveCare: [
      'Relative rest: avoiding aggravating activities while maintaining gentle gentle movement',
      'Ice packs for the first 48 hours to minimize acute swelling, followed by mild heat',
      'Gentle pain-free stretching as acute discomfort subsides',
      'Ergonomic adjustment of workstation or lifting posture'
    ],
    redFlagWarningSigns: [
      'Inability to bear weight on a joint or limb',
      'Visible gross deformity, severe localized swelling, or joint instability',
      'Numbness, tingling, or weakness radiating into limbs',
      'Loss of bladder or bowel control (spinal emergency)'
    ],
    questionsForDoctor: [
      'Could my muscle discomfort be related to ergonomic posture or improper lifting technique?',
      'Would physical therapy or targeted rehabilitation exercises prevent recurrent strain?'
    ],
    educationalTriageLevel: 'self_care_monitoring'
  }
];
