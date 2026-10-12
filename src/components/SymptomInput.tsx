/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AI-Powered Symptom Checker & Triage Assistant
 * Symptom Input Form & Presets
 */

import React, { useState } from 'react';
import { AgeRange, SymptomDuration } from '../types';
import { Sparkles, Trash2, ShieldCheck, AlertCircle, Play, Clock, UserCheck } from 'lucide-react';

interface SymptomInputProps {
  onAnalyze: (text: string, ageRange: AgeRange, duration: SymptomDuration) => void;
  onClear: () => void;
  isLoading?: boolean;
}

interface ExamplePreset {
  label: string;
  tag: string;
  isEmergency?: boolean;
  text: string;
  age: AgeRange;
  duration: SymptomDuration;
}

const PRESETS: ExamplePreset[] = [
  {
    label: 'Common Cold',
    tag: 'Viral URI',
    text: 'I have had a runny nose, mild sore throat, sneezing and low fever for 3 days.',
    age: 'adult',
    duration: '1_to_3_days'
  },
  {
    label: 'Seasonal Allergies',
    tag: 'Rhinitis',
    text: 'Itchy watery eyes, clear runny nose, and sneezing after being outside in the garden.',
    age: 'adult',
    duration: '4_to_7_days'
  },
  {
    label: 'Tension Headache',
    tag: 'Primary cephalea',
    text: 'Dull aching pain across both sides of forehead and tight neck stiffness from staring at screens.',
    age: 'adult',
    duration: '1_to_3_days'
  },
  {
    label: 'Gastroenteritis',
    tag: 'GI viral',
    text: 'Nausea, vomiting, stomach cramps, and diarrhea since yesterday morning.',
    age: 'adult',
    duration: 'less_24h'
  },
  {
    label: 'EMERGENCY: Chest Pain',
    tag: 'Red Flag',
    isEmergency: true,
    text: 'Experiencing severe chest pain, crushing pressure radiating to left arm and jaw with cold sweat.',
    age: 'older_adult',
    duration: 'less_24h'
  },
  {
    label: 'EMERGENCY: Stroke (FAST)',
    tag: 'Red Flag',
    isEmergency: true,
    text: 'Sudden facial drooping, arm weakness on one side, and slurred speech.',
    age: 'older_adult',
    duration: 'less_24h'
  },
  {
    label: 'Unrecognized Input',
    tag: 'Out-of-domain',
    text: 'The weather in the mountains was very chilly yesterday and my bicycle tire feels soft.',
    age: 'adult',
    duration: 'unspecified'
  }
];

export const SymptomInput: React.FC<SymptomInputProps> = ({
  onAnalyze,
  onClear,
  isLoading = false
}) => {
  const [inputText, setInputText] = useState('');
  const [ageRange, setAgeRange] = useState<AgeRange>('adult');
  const [duration, setDuration] = useState<SymptomDuration>('1_to_3_days');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleAnalyze = () => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      setValidationError('Please enter a description of symptoms before analyzing. Empty input cannot be evaluated.');
      return;
    }

    if (trimmed.length < 5) {
      setValidationError('Please provide a slightly more descriptive symptom entry (at least 5 characters).');
      return;
    }

    setValidationError(null);
    onAnalyze(trimmed, ageRange, duration);
  };

  const handleClear = () => {
    setInputText('');
    setValidationError(null);
    onClear();
  };

  const handleLoadPreset = (preset: ExamplePreset) => {
    setInputText(preset.text);
    setAgeRange(preset.age);
    setDuration(preset.duration);
    setValidationError(null);
    onAnalyze(preset.text, preset.age, preset.duration);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-6">
      {/* Header and explanation */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Describe Current Symptoms</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Natural Language Processing (NLP)
          </span>
        </div>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          Type symptoms in plain words (e.g., <em>“sore throat, runny nose, and low fever”</em>).
          Our browser-based NLP pipeline extracts key clinical phrases, scans safety red-flag rules, and compares against demonstration reference profiles.
        </p>
      </div>

      {/* Preset shortcuts for quick testing */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Preset Demonstration Test Scenarios:</span>
          </label>
          <span className="text-[11px] text-slate-400">Click to autofill & test</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleLoadPreset(preset)}
              className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-all text-left flex items-center gap-1.5 ${
                preset.isEmergency
                  ? 'border-rose-200 bg-rose-50/70 text-rose-800 hover:bg-rose-100 hover:border-rose-300'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-900'
              }`}
            >
              <span>{preset.label}</span>
              <span className={`text-[10px] px-1 py-0.2 rounded font-normal ${
                preset.isEmergency ? 'bg-rose-200/60 text-rose-900' : 'bg-slate-200/60 text-slate-600'
              }`}>
                {preset.tag}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Symptom Text Area */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label htmlFor="symptom-textarea" className="text-xs font-semibold text-slate-800">
            Symptom Description <span className="text-rose-500">*</span>
          </label>
          <span className="text-[11px] text-slate-400">
            {inputText.length} characters
          </span>
        </div>

        <div className="relative">
          <textarea
            id="symptom-textarea"
            rows={4}
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              if (validationError) setValidationError(null);
            }}
            placeholder="Describe what you are experiencing in your own words. For example: 'I have had a throbbing headache, mild nausea, and sensitivity to bright light since this morning...'"
            className={`w-full rounded-xl border p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
              validationError
                ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                : 'border-slate-300 focus:ring-teal-200 focus:border-teal-600 bg-white'
            }`}
          />
        </div>

        {/* Validation Error Message */}
        {validationError && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-600 font-medium bg-rose-50 border border-rose-200 px-3 py-2 rounded-lg">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}
      </div>

      {/* Optional Metadata: Age Range & Duration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        <div>
          <label htmlFor="age-select" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
            <UserCheck className="w-3.5 h-3.5 text-slate-500" />
            <span>Age Category (Optional)</span>
          </label>
          <select
            id="age-select"
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value as AgeRange)}
            className="w-full text-xs rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-600"
          >
            <option value="unspecified">Unspecified / General</option>
            <option value="child">Child (&lt; 12 years)</option>
            <option value="adolescent">Adolescent (12–17 years)</option>
            <option value="adult">Adult (18–64 years)</option>
            <option value="older_adult">Older Adult (65+ years)</option>
          </select>
          <p className="text-[11px] text-slate-400 mt-1">
            Age context helps identify age-specific considerations in reference profiles.
          </p>
        </div>

        <div>
          <label htmlFor="duration-select" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Symptom Duration (Optional)</span>
          </label>
          <select
            id="duration-select"
            value={duration}
            onChange={(e) => setDuration(e.target.value as SymptomDuration)}
            className="w-full text-xs rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-600"
          >
            <option value="unspecified">Unspecified</option>
            <option value="less_24h">Less than 24 hours (Acute onset)</option>
            <option value="1_to_3_days">1 to 3 days</option>
            <option value="4_to_7_days">4 to 7 days</option>
            <option value="1_to_2_weeks">1 to 2 weeks</option>
            <option value="more_2_weeks">More than 2 weeks (Subacute / Chronic)</option>
          </select>
          <p className="text-[11px] text-slate-400 mt-1">
            Duration informs when symptoms exceed typical viral self-limiting timeframes.
          </p>
        </div>
      </div>

      {/* Privacy and Non-Identifying Information Reminder */}
      <div className="p-3 bg-slate-50 border border-slate-200/90 rounded-xl flex items-start gap-2.5 text-xs text-slate-600">
        <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-slate-800">Privacy & De-Identification Safeguard: </span>
          Do <strong>NOT</strong> enter real names, phone numbers, email addresses, street addresses, or identification numbers.
          All NLP operations happen locally in your browser memory; zero text is sent to cloud servers.
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing NLP Pipeline...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>Analyze Symptoms</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleClear}
          disabled={isLoading || (!inputText && !validationError)}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium text-sm transition-all flex items-center justify-center gap-1.5 disabled:opacity-40 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Input</span>
        </button>
      </div>
    </div>
  );
};
