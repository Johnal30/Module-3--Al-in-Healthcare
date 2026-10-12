/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AI-Powered Symptom Checker & Triage Assistant
 * Formal Test Suite Definitions
 * 
 * Categories:
 * 1. Emergency Warning Phrases (Life-threatening indicators that MUST trigger immediate 911 alert)
 * 2. Common Symptom Presentations (Standard upper respiratory, migraine, GI, allergy)
 * 3. Empty / Whitespace Inputs (Input validation handling)
 * 4. Unrecognized / Ambiguous Inputs (Conservative failure handling)
 * 5. Mixed / Complex Symptom Descriptions (Multi-system presentation)
 */

import { TestCase } from '../types';

export const FORMAL_TEST_SUITE: TestCase[] = [
  // 1. Emergency Cases
  {
    id: 'tc-emg-01',
    title: 'Acute Coronary Warning (Chest Pain & Radiation)',
    category: 'emergency',
    input: 'I have severe chest pain and crushing pressure radiating to my left arm and jaw with profuse cold sweats.',
    ageRange: 'adult',
    duration: 'less_24h',
    expectedEmergency: true,
    expectedRecognizedTerms: ['chest pain', 'crushing chest pain'],
    description: 'Verifies that cardiac emergency warning triggers immediate high-priority 911 warning.'
  },
  {
    id: 'tc-emg-02',
    title: 'Acute Neurological Deficit (Stroke Signs / FAST)',
    category: 'emergency',
    input: 'My mother has sudden facial drooping on the right side and arm weakness with slurred speech.',
    ageRange: 'older_adult',
    duration: 'less_24h',
    expectedEmergency: true,
    expectedRecognizedTerms: ['facial drooping', 'arm weakness', 'slurred speech'],
    description: 'Verifies detection of classic FAST stroke signs.'
  },
  {
    id: 'tc-emg-03',
    title: 'Severe Respiratory Distress & Cyanosis',
    category: 'emergency',
    input: 'Patient has severe breathing difficulty, gasping for air, and notice blue lips.',
    ageRange: 'adult',
    duration: 'less_24h',
    expectedEmergency: true,
    expectedRecognizedTerms: ['severe breathing difficulty', 'blue lips', 'gasping for air'],
    description: 'Verifies critical airway compromise and cyanosis triggers emergency triage.'
  },
  {
    id: 'tc-emg-04',
    title: 'Unresponsiveness & Loss of Consciousness',
    category: 'emergency',
    input: 'Person passed out suddenly and is unresponsive on the floor.',
    ageRange: 'adult',
    duration: 'less_24h',
    expectedEmergency: true,
    expectedRecognizedTerms: ['passed out', 'unresponsive'],
    description: 'Verifies syncope / loss of consciousness red flag detection.'
  },
  {
    id: 'tc-emg-05',
    title: 'Thunderclap Headache (Aneurysmal Red Flag)',
    category: 'emergency',
    input: 'Experiencing the worst headache of my life that came on suddenly like a thunderclap.',
    ageRange: 'adult',
    duration: 'less_24h',
    expectedEmergency: true,
    expectedRecognizedTerms: ['worst headache of my life'],
    description: 'Verifies detection of catastrophic headache presentation.'
  },

  // 2. Common Symptoms
  {
    id: 'tc-common-01',
    title: 'Viral Upper Respiratory Infection (Common Cold)',
    category: 'common_symptom',
    input: 'I have a runny nose, mild sore throat, sneezing and a low fever for the past two days.',
    ageRange: 'adult',
    duration: '1_to_3_days',
    expectedEmergency: false,
    expectedRecognizedTerms: ['runny nose', 'sore throat', 'sneezing', 'fever'],
    expectedConditionId: 'cond_common_cold',
    description: 'Verifies standard viral rhinitis symptom extraction without emergency false-positives.'
  },
  {
    id: 'tc-common-02',
    title: 'Seasonal Allergic Rhinitis (Hay Fever)',
    category: 'common_symptom',
    input: 'Itchy watery eyes, clear runny nose, and constant sneezing after walking outside near blooming trees.',
    ageRange: 'adult',
    duration: '4_to_7_days',
    expectedEmergency: false,
    expectedRecognizedTerms: ['itchy watery eyes', 'runny nose', 'sneezing'],
    expectedConditionId: 'cond_allergic_rhinitis',
    description: 'Verifies allergic symptom extraction and proper linkage to allergy profile.'
  },
  {
    id: 'tc-common-03',
    title: 'Tension-Type Headache & Neck Strain',
    category: 'common_symptom',
    input: 'Dull aching headache across my forehead and tight neck stiffness after long hours at the computer.',
    ageRange: 'adult',
    duration: '1_to_3_days',
    expectedEmergency: false,
    expectedRecognizedTerms: ['headache', 'muscle aches'],
    expectedConditionId: 'cond_tension_headache',
    description: 'Verifies recognition of non-emergency tension headache features.'
  },
  {
    id: 'tc-common-04',
    title: 'Acute Viral Gastroenteritis',
    category: 'common_symptom',
    input: 'Experiencing nausea, vomiting, stomach cramps, and diarrhea since early morning.',
    ageRange: 'adult',
    duration: 'less_24h',
    expectedEmergency: false,
    expectedRecognizedTerms: ['nausea', 'vomiting', 'diarrhea', 'abdominal pain'],
    expectedConditionId: 'cond_acute_gastroenteritis',
    description: 'Verifies acute GI symptom cluster detection.'
  },

  // 3. Empty / Whitespace Input
  {
    id: 'tc-empty-01',
    title: 'Completely Empty String',
    category: 'empty_input',
    input: '',
    expectedEmergency: false,
    expectedRecognizedTerms: [],
    description: 'Verifies graceful rejection with user-friendly validation error.'
  },
  {
    id: 'tc-empty-02',
    title: 'Whitespace-Only Characters',
    category: 'empty_input',
    input: '     \n  \t   ',
    expectedEmergency: false,
    expectedRecognizedTerms: [],
    description: 'Verifies whitespace trim validation.'
  },

  // 4. Unrecognized / Ambiguous Input
  {
    id: 'tc-unrec-01',
    title: 'Gibberish / Non-Medical String',
    category: 'unrecognized',
    input: 'qwerty asdf zxcv blorg flimflam 12345',
    expectedEmergency: false,
    expectedRecognizedTerms: [],
    description: 'Verifies conservative handling: does NOT invent fake diagnoses or confidence.'
  },
  {
    id: 'tc-unrec-02',
    title: 'Non-Symptomatic Narrative Description',
    category: 'unrecognized',
    input: 'The weather in the mountains was very chilly yesterday and we went grocery shopping.',
    expectedEmergency: false,
    expectedRecognizedTerms: [],
    description: 'Verifies conversational English without symptoms is classified as unrecognized.'
  },

  // 5. Mixed / Complex Symptoms
  {
    id: 'tc-mixed-01',
    title: 'Mixed Upper Respiratory with Gastrointestinal Symptoms',
    category: 'mixed_symptoms',
    input: 'I have had a runny nose and dry cough for 3 days, but today I also felt nausea and stomach cramps.',
    ageRange: 'adult',
    duration: '1_to_3_days',
    expectedEmergency: false,
    expectedRecognizedTerms: ['runny nose', 'cough', 'nausea', 'abdominal pain'],
    description: 'Verifies multi-system symptom parsing without crash or incorrect single-system pigeonholing.'
  }
];
