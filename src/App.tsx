/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AI-Powered Symptom Checker and Triage Assistant
 * Student AI Healthcare Innovation Project Prototype
 * 
 * Main Application Component
 */

import React, { useState } from 'react';
import { Header, ActiveTab } from './components/Header';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { SymptomInput } from './components/SymptomInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { PipelineInspector } from './components/PipelineInspector';
import { TestRunner } from './components/TestRunner';
import { DocViewer } from './components/DocViewer';
import { AnalysisResult, AgeRange, SymptomDuration } from './types';
import { analyzeSymptomInput } from './nlp/nlpPipeline';
import {
  ShieldAlert,
  Stethoscope,
  BookOpen,
  CheckCircle2,
  Lock,
  ArrowRight,
  Heart,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('checker');
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Handle user triggering analysis
  const handleAnalyze = (
    text: string,
    ageRange: AgeRange = 'unspecified',
    duration: SymptomDuration = 'unspecified'
  ) => {
    setIsAnalyzing(true);
    // Brief setTimeout creates a natural accessible sensory transition for the user
    setTimeout(() => {
      const result = analyzeSymptomInput(text, ageRange, duration);
      setCurrentResult(result);
      setIsAnalyzing(false);
    }, 200);
  };

  // Handle clear action
  const handleClear = () => {
    setCurrentResult(null);
  };

  // Handle loading a case from the Test Runner directly into the Symptom Checker
  const handleLoadTestCase = (
    text: string,
    ageRange: AgeRange = 'unspecified',
    duration: SymptomDuration = 'unspecified'
  ) => {
    setActiveTab('checker');
    handleAnalyze(text, ageRange, duration);
  };

  const hasEmergencyActive = Boolean(currentResult?.emergencyResult.isEmergency);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        hasEmergencyActive={hasEmergencyActive}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Educational Disclaimer Banner - Visible on all screens */}
        <DisclaimerBanner />

        {/* TAB 1: SYMPTOM CHECKER & RESULTS */}
        {activeTab === 'checker' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Symptom Input Form */}
              <div className="lg:col-span-5 space-y-6">
                <SymptomInput
                  onAnalyze={handleAnalyze}
                  onClear={handleClear}
                  isLoading={isAnalyzing}
                />

                {/* Educational Architecture Callout */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs text-xs space-y-3">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-teal-600" />
                    <span>How This Prototype Analyzes Text</span>
                  </h3>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-600 leading-relaxed">
                    <li>
                      <strong className="text-slate-800">Normalization:</strong> Cleans punctuation, expands contractions, and segments tokens.
                    </li>
                    <li>
                      <strong className="text-slate-800">Priority 1 Safety Screening:</strong> Scans for emergency red flags (chest pain, stroke signs) before general matching.
                    </li>
                    <li>
                      <strong className="text-slate-800">Synonym Mapping:</strong> Links lay terms (e.g. <em>"scratchy throat"</em>) to clinical concepts.
                    </li>
                    <li>
                      <strong className="text-slate-800">Criteria Overlap:</strong> Compares symptoms against educational reference conditions without fake probabilities.
                    </li>
                  </ol>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">100% Client-Side JS</span>
                    <button
                      onClick={() => setActiveTab('pipeline')}
                      className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore NLP Pipeline</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Analysis Results or Initial Guidance */}
              <div className="lg:col-span-7">
                {currentResult ? (
                  <ResultsDisplay
                    result={currentResult}
                    onViewPipelineTrace={() => setActiveTab('pipeline')}
                  />
                ) : (
                  /* Empty state encouraging user to get started */
                  <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 sm:p-12 text-center space-y-5">
                    <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto shadow-xs">
                      <Stethoscope className="w-8 h-8" />
                    </div>

                    <div className="max-w-md mx-auto space-y-2">
                      <h3 className="text-lg font-bold text-slate-900">
                        Ready for Symptom Analysis
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Enter your symptoms on the left or click one of the quick preset test buttons to observe the natural language processing pipeline in action.
                      </p>
                    </div>

                    {/* Feature highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-left">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                          <span>Emergency First</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-normal">
                          Red-flag safety rules are evaluated before ordinary matching.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                          <span>No Fake Probabilities</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-normal">
                          Reports honest criteria overlap instead of misleading certainty.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-slate-600" />
                          <span>Strict Privacy</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-normal">
                          Executed 100% locally in your browser. Zero data transmission.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: NLP PIPELINE INSPECTOR */}
        {activeTab === 'pipeline' && (
          <PipelineInspector
            trace={currentResult?.pipelineTrace || null}
            onGoToChecker={() => setActiveTab('checker')}
          />
        )}

        {/* TAB 3: AUTOMATED TEST SUITE RUNNER */}
        {activeTab === 'tests' && (
          <TestRunner onLoadTestCase={handleLoadTestCase} />
        )}

        {/* TAB 4: IN-APP DOCUMENTATION & RESEARCH */}
        {activeTab === 'docs' && <DocViewer />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">AI-Powered Symptom Checker</span>
            <span>·</span>
            <span>Student Healthcare Innovation Showcase</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <button
              onClick={() => setActiveTab('checker')}
              className="hover:text-slate-900 hover:underline cursor-pointer"
            >
              Checker
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className="hover:text-slate-900 hover:underline cursor-pointer"
            >
              NLP Pipeline
            </button>
            <button
              onClick={() => setActiveTab('tests')}
              className="hover:text-slate-900 hover:underline cursor-pointer"
            >
              Test Suite
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className="hover:text-slate-900 hover:underline cursor-pointer"
            >
              Documentation
            </button>
          </div>

          <div className="text-[11px] text-slate-400">
            Educational Prototype · Not for Clinical Use · Non-Diagnostic
          </div>
        </div>
      </footer>
    </div>
  );
}
