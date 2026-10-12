/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AI-Powered Symptom Checker & Triage Assistant
 * In-App Documentation & Research Paper Viewer
 */

import React, { useState } from 'react';
import { DOCUMENTATION_ARTICLES, DocArticle } from '../data/documentationData';
import { BookOpen, FileText, CheckCircle2, Award, Download, Copy, ExternalLink, Check } from 'lucide-react';

export const DocViewer: React.FC = () => {
  const [selectedDocId, setSelectedDocId] = useState<'readme' | 'testing' | 'research'>('readme');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const activeDoc = DOCUMENTATION_ARTICLES.find(d => d.id === selectedDocId) || DOCUMENTATION_ARTICLES[0];

  const handleCopyDoc = (doc: DocArticle) => {
    let fullText = `# ${doc.title} (${doc.filename})\n\n`;
    fullText += `${doc.summary}\n\n`;
    doc.sections.forEach(s => {
      fullText += `## ${s.heading}\n\n${s.content}\n\n`;
    });

    navigator.clipboard.writeText(fullText);
    setCopiedNotification(doc.id);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-600" />
              <span>Project Documentation & Research Viewer</span>
            </h2>
            <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Student Innovation Showcase
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Browse the project specification, test harness records, and academic research paper required for presentation.
          </p>
        </div>

        <button
          onClick={() => handleCopyDoc(activeDoc)}
          className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
        >
          {copiedNotification === activeDoc.id ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Copied {activeDoc.filename}!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-600" />
              <span>Copy {activeDoc.filename} Markdown</span>
            </>
          )}
        </button>
      </div>

      {/* Document Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {DOCUMENTATION_ARTICLES.map(doc => (
          <button
            key={doc.id}
            type="button"
            onClick={() => setSelectedDocId(doc.id)}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              selectedDocId === doc.id
                ? 'border-teal-500 bg-teal-50/50 text-teal-950 ring-1 ring-teal-500 shadow-xs'
                : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                {doc.filename}
              </span>
              {selectedDocId === doc.id && (
                <span className="w-2 h-2 rounded-full bg-teal-600" />
              )}
            </div>
            <div className="text-xs font-bold">{doc.title}</div>
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
              {doc.summary}
            </p>
          </button>
        ))}
      </div>

      {/* Document Content Display */}
      <div className="border border-slate-200 rounded-xl p-5 sm:p-6 bg-slate-50/40 space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              {activeDoc.title}
            </h3>
            <span className="font-mono text-xs font-semibold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
              {activeDoc.filename}
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
            {activeDoc.summary}
          </p>
        </div>

        <div className="space-y-5">
          {activeDoc.sections.map((sec, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-2 shadow-xs">
              <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                {sec.heading}
              </h4>
              <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed font-sans">
                {sec.content}
              </div>
            </div>
          ))}
        </div>

        {/* References Footer */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs space-y-2">
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-teal-600" />
            <span>Authoritative Regulatory & Academic Citations:</span>
          </div>
          <ul className="space-y-1 text-[11px] text-slate-600 list-disc list-inside">
            <li>U.S. Food and Drug Administration (FDA) · Clinical Decision Support Software Guidance (2022)</li>
            <li>World Health Organization (WHO) · Ethics and Governance of AI for Health Guidance (2021)</li>
            <li>Semigran, H. L., et al. · Evaluation of symptom checkers for self diagnosis and triage (BMJ 2015; 351:h3480)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
