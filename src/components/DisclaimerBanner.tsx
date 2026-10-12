/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AI-Powered Symptom Checker & Triage Assistant
 * Comprehensive Educational Disclaimer Banner
 */

import React, { useState } from 'react';
import { AlertTriangle, Lock, Info, ChevronDown, ChevronUp } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-4 text-amber-900 transition-all shadow-xs">
      <div className="flex items-start gap-3">
        <div className="p-1.5 bg-amber-100 rounded-lg text-amber-800 shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-tight text-amber-950 flex items-center gap-2">
              <span>Important Educational Prototype Notice</span>
              <span className="text-[11px] font-normal text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full">
                Non-Diagnostic
              </span>
            </h2>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-semibold text-amber-900 hover:text-amber-950 flex items-center gap-1 focus:outline-none focus:underline"
              aria-expanded={isExpanded}
            >
              <span>{isExpanded ? 'Hide Details' : 'Read Scope & Limitations'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          <p className="text-xs text-amber-900/90 mt-1 leading-relaxed">
            This tool is an <strong>educational engineering prototype</strong> built for a student AI healthcare innovation showcase.
            It is <strong>NOT</strong> a medical diagnostic device, FDA-cleared software, or a clinical triage system.
            It cannot replace clinical evaluation by a licensed healthcare professional.
          </p>

          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-amber-200/80 text-xs space-y-2 text-amber-900 leading-relaxed">
              <div className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <p>
                  <strong>Strict On-Device Privacy:</strong> Symptom text is analyzed entirely inside your browser using client-side JavaScript.
                  No personal data is transmitted, stored, or processed by remote artificial intelligence models.
                  <strong> Please do not enter real names, birth dates, addresses, or identifying data.</strong>
                </p>
              </div>

              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <p>
                  <strong>Conservative Safety Rules:</strong> Life-threatening warning phrases trigger high-priority alerts to call 911.
                  However, the internal list of warning signs is non-exhaustive; lack of an alert does not prove absence of emergency.
                  Always trust clinical judgment over any software.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
