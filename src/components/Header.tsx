/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AI-Powered Symptom Checker & Triage Assistant
 * Main Header Component
 */

import React from 'react';
import { Stethoscope, ShieldAlert, Cpu, BookOpen, CheckCircle2, PhoneCall } from 'lucide-react';

export type ActiveTab = 'checker' | 'pipeline' | 'tests' | 'docs';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  hasEmergencyActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  hasEmergencyActive = false
}) => {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-xs">
      {/* Topmost emergency notice banner */}
      <div className="bg-slate-900 text-slate-200 px-4 py-1.5 text-xs font-medium flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Student Healthcare Innovation Prototype · Local On-Device NLP · Non-Diagnostic</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-slate-400">In a medical crisis:</span>
          <a
            href="tel:911"
            className="flex items-center gap-1 text-rose-300 hover:text-rose-200 font-semibold"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call 911</span>
          </a>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('checker')}>
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                  AI-Powered Symptom Checker
                </h1>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded">
                  Prototype
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Rule-Based NLP & Conservative Triage Assistant
              </p>
            </div>
          </div>

          {/* Navigation tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onTabChange('checker')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'checker'
                  ? 'bg-teal-50 text-teal-800 border border-teal-200/80 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-teal-600" />
              <span>Symptom Checker</span>
              {hasEmergencyActive && (
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse ml-0.5" />
              )}
            </button>

            <button
              onClick={() => onTabChange('pipeline')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'pipeline'
                  ? 'bg-teal-50 text-teal-800 border border-teal-200/80 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Cpu className="w-4 h-4 text-teal-600" />
              <span className="hidden sm:inline">NLP Pipeline</span>
              <span className="sm:hidden">NLP</span>
            </button>

            <button
              onClick={() => onTabChange('tests')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'tests'
                  ? 'bg-teal-50 text-teal-800 border border-teal-200/80 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span className="hidden sm:inline">Test Suite</span>
              <span className="sm:hidden">Tests</span>
            </button>

            <button
              onClick={() => onTabChange('docs')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'docs'
                  ? 'bg-teal-50 text-teal-800 border border-teal-200/80 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span className="hidden sm:inline">Documentation</span>
              <span className="sm:hidden">Docs</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
