/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AI-Powered Symptom Checker & Triage Assistant
 * NLP Pipeline Inspector & Transparent Architecture Visualizer
 */

import React, { useState } from 'react';
import { PipelineTrace } from '../types';
import { Cpu, ShieldAlert, Filter, ListOrdered, CheckCircle, Search, ArrowRight, Layers } from 'lucide-react';

interface PipelineInspectorProps {
  trace: PipelineTrace | null;
  onGoToChecker: () => void;
}

export const PipelineInspector: React.FC<PipelineInspectorProps> = ({
  trace,
  onGoToChecker
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  if (!trace) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
          <Cpu className="w-6 h-6" />
        </div>
        <div className="max-w-md mx-auto">
          <h3 className="text-base font-bold text-slate-900">
            No Active NLP Trace Available
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Run an analysis from the Symptom Checker tab or load a test scenario to view the live, step-by-step tokenization, normalization, and safety rules audit trace.
          </p>
        </div>
        <button
          onClick={onGoToChecker}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          Go to Symptom Checker
        </button>
      </div>
    );
  }

  const steps = [
    {
      num: 1,
      title: 'Raw Input & Sanitization',
      desc: 'Lowercasing, contraction expansion, noise stripping'
    },
    {
      num: 2,
      title: 'Tokenization & Stop-Words',
      desc: 'Splitting words & filtering non-discriminative grammar'
    },
    {
      num: 3,
      title: 'N-Gram Construction',
      desc: 'Extracting unigrams, bigrams, and trigrams'
    },
    {
      num: 4,
      title: 'Safety Rules (Priority 1)',
      desc: 'Hard-stop emergency phrase evaluation'
    },
    {
      num: 5,
      title: 'Taxonomy Concept Mapping',
      desc: 'Mapping lay terms to canonical medical concepts'
    },
    {
      num: 6,
      title: 'Knowledge Base Overlap',
      desc: 'Deterministic criteria comparison without fake probabilities'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
      {/* Title & Execution stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Cpu className="w-5 h-5 text-teal-600" />
              <span>NLP Text Processing Pipeline Inspector</span>
            </h2>
            <span className="text-[11px] font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              {trace.processingTimeMs} ms latency
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Auditable, deterministic local pipeline — zero black-box hidden weights or unvalidated hallucinated outputs.
          </p>
        </div>

        <button
          onClick={onGoToChecker}
          className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
        >
          <span>Return to Results</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Pipeline Step Navigator */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {steps.map((s) => (
          <button
            key={s.num}
            type="button"
            onClick={() => setActiveStep(s.num)}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeStep === s.num
                ? 'border-teal-500 bg-teal-50 text-teal-900 shadow-xs ring-1 ring-teal-500'
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center ${
                activeStep === s.num ? 'bg-teal-600 text-white' : 'bg-slate-300 text-slate-700'
              }`}>
                {s.num}
              </span>
              {s.num === 4 && trace.emergencyScreening.isEmergency && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              )}
            </div>
            <div className="text-xs font-bold truncate">{s.title}</div>
            <div className="text-[10px] text-slate-500 truncate mt-0.5">{s.desc}</div>
          </button>
        ))}
      </div>

      {/* Step Content Visualizer */}
      <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-4">
        {/* Step 1: Raw & Normalized */}
        {activeStep === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Stage 1: Input Normalization & Contraction Expansion</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Converts text to lower-case, expands colloquial contractions (e.g. "can't" to "cannot"), and strips non-diagnostic punctuation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Raw Input Text:
                </div>
                <div className="font-mono text-xs text-slate-900 bg-slate-50 p-2.5 rounded-lg break-words">
                  "{trace.rawInput}"
                </div>
              </div>

              <div className="bg-white border border-teal-200 rounded-xl p-3.5 space-y-1.5">
                <div className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">
                  Normalized Cleaned Text:
                </div>
                <div className="font-mono text-xs text-teal-950 bg-teal-50/50 p-2.5 rounded-lg break-words">
                  "{trace.normalizedText}"
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Tokenization & Stop-Words */}
        {activeStep === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Filter className="w-4 h-4 text-teal-600" />
                <span>Stage 2: Word Tokenization & Stop-Word Filtering</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Splits text into discrete word tokens and removes high-frequency conversational stop words ("i", "have", "the", "my", "started").
              </p>
            </div>

            <div className="space-y-3">
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Raw Token Stream ({trace.tokens.length} total tokens):
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
                  {trace.tokens.map((tok, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-xs font-mono bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      {tok}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-teal-200 rounded-xl p-3.5 space-y-2">
                <div className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">
                  Filtered Discriminative Tokens ({trace.filteredTokens.length} tokens retained):
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {trace.filteredTokens.map((tok, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-xs font-mono bg-teal-50 text-teal-900 border border-teal-200 font-semibold"
                    >
                      {tok}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: N-Gram Construction */}
        {activeStep === 3 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-teal-600" />
                <span>Stage 3: Multi-Word N-Gram Extraction</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Clinical symptoms frequently span multiple words (e.g., "sore throat", "shortness of breath"). We extract unigrams, bigrams, and trigrams.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Extracted Phrases &amp; N-Grams ({trace.extractedNgrams.length} candidate windows):
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-52 overflow-y-auto">
                {trace.extractedNgrams.map((ng, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded text-xs font-mono bg-slate-100 text-slate-800 border border-slate-200"
                  >
                    "{ng}"
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Safety Rules (Priority 1) */}
        {activeStep === 4 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Stage 4: Emergency Safety Rules Pre-Screening (PRIORITY 1)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Deterministic screening for life-threatening keywords (chest pain, stroke signs, severe dyspnea, syncope). Always evaluated prior to general symptom matching.
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${
              trace.emergencyScreening.isEmergency
                ? 'bg-rose-50 border-rose-300 text-rose-950'
                : 'bg-emerald-50 border-emerald-200 text-emerald-950'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                <span>Status:</span>
                <span className={`px-2 py-0.5 rounded text-xs font-black uppercase ${
                  trace.emergencyScreening.isEmergency
                    ? 'bg-rose-600 text-white'
                    : 'bg-emerald-600 text-white'
                }`}>
                  {trace.emergencyScreening.isEmergency ? 'Emergency Warning Sign Flagged' : 'No Emergency Red Flags Triggered'}
                </span>
              </div>

              {trace.emergencyScreening.isEmergency && (
                <div className="mt-3 space-y-2 text-xs">
                  <div className="font-semibold">Detected Warning Phrases:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {trace.emergencyScreening.detectedPhrases.map((phrase, i) => (
                      <span key={i} className="px-2 py-1 rounded bg-white font-mono font-bold text-rose-900 border border-rose-300">
                        "{phrase}"
                      </span>
                    ))}
                  </div>
                  <div className="text-[11px] text-rose-900 mt-1">
                    Matched Rules: {trace.emergencyScreening.matchedRules.map(r => r.name).join(', ')}
                  </div>
                </div>
              )}

              <p className="text-[11px] mt-3 pt-2 border-t border-slate-200/50 opacity-90">
                Rule check is non-exhaustive. Absence of match never guarantees safety.
              </p>
            </div>
          </div>
        )}

        {/* Step 5: Taxonomy Concept Mapping */}
        {activeStep === 5 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-teal-600" />
                <span>Stage 5: Canonical Symptom Concept Mapping</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Maps matched input words to standardized clinical concepts via colloquial synonym dictionaries.
              </p>
            </div>

            {trace.recognizedSymptoms.length > 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="p-2.5 font-bold">User Text Matched</th>
                      <th className="p-2.5 font-bold">Canonical Concept</th>
                      <th className="p-2.5 font-bold">Domain</th>
                      <th className="p-2.5 font-bold">Resolution Reason</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {trace.recognizedSymptoms.map((s, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-2.5 font-mono text-slate-900">"{s.originalText}"</td>
                        <td className="p-2.5 font-bold text-teal-900">{s.canonicalName}</td>
                        <td className="p-2.5 text-slate-500 capitalize">{s.category}</td>
                        <td className="p-2.5 text-slate-600 italic text-[11px]">{s.confidenceReason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-500">
                No canonical symptoms recognized from this input.
              </div>
            )}
          </div>
        )}

        {/* Step 6: Knowledge Base Overlap */}
        {activeStep === 6 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-teal-600" />
                <span>Stage 6: Knowledge Base Criteria Comparison</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Transparently counts symptom overlap against demonstration profiles. We deliberately avoid inventing unvalidated clinical probabilities.
              </p>
            </div>

            {trace.conditionMatches.length > 0 ? (
              <div className="space-y-2">
                {trace.conditionMatches.map((m, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-3.5 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{m.condition.name}</span>
                      <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                        {m.matchScoreDescription}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600">
                      Criteria Overlap: {m.matchedTerms.map(t => `"${t}"`).join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-500">
                No educational conditions matched criteria.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
