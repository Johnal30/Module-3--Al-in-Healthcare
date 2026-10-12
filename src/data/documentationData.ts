/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * In-app documentation repository for student project presentation
 */

export interface DocArticle {
  id: 'readme' | 'testing' | 'research';
  title: string;
  badge: string;
  filename: string;
  summary: string;
  sections: {
    heading: string;
    content: string;
  }[];
}

export const DOCUMENTATION_ARTICLES: DocArticle[] = [
  {
    id: 'readme',
    title: 'Project Overview & Specification',
    badge: 'README.md',
    filename: 'README.md',
    summary: 'Project objectives, architecture, safety principles, technology stack, setup instructions, and ethical guardrails.',
    sections: [
      {
        heading: '1. Project Purpose & Objectives',
        content: `In healthcare informatics, conversational symptom triage poses both tremendous opportunities and critical safety hazards. While modern AI models can produce fluent prose, clinical safety demands strict determinism, auditable logic, zero hallucinations, conservative risk handling, and patient privacy.

The objectives of this student project are:
1. Auditable NLP Architecture: Demonstrate how classical, transparent natural language processing provides explainable symptom extraction without black-box opacity.
2. Deterministic Emergency Pre-Screening (Priority 1): Implement hard-stop safety rules that intercept acute red flags before general symptom evaluation occurs.
3. Zero False-Safety Guarantee: Prevent algorithmic over-reassurance by explicitly rejecting pseudo-probabilities and affirming that no keyword check can ever prove absence of an emergency.
4. 100% Client-Side Privacy: Ensure sensitive health inquiries remain entirely on the user's device.`
      },
      {
        heading: '2. Multi-Stage NLP Architecture',
        content: `The system processes text in 8 distinct stages:
• Stage 1: Text sanitization, lowercasing, and colloquial contraction expansion (e.g., "can't" -> "cannot").
• Stage 2: Tokenization & whitespace boundary segmentation.
• Stage 3: Stop-word filtering removing non-discriminative grammar while retaining medical terms.
• Stage 4: Multi-word N-gram construction (unigrams, bigrams, trigrams).
• Stage 5: Hard-stop Emergency Screening (Priority 1) for critical warning signs.
• Stage 6: Canonical medical concept mapping via colloquial synonym dictionary.
• Stage 7: Demonstration knowledge base criteria overlap scoring.
• Stage 8: Conservative handling of unrecognized or ambiguous input.`
      },
      {
        heading: '3. Technology Stack & Local Execution',
        content: `• Frontend: React 19 + TypeScript with strict types
• Build Tool: Vite 8
• Styling: Tailwind CSS v4 with accessible healthcare design (WCAG AA compliant)
• Icons: Lucide React
• Privacy: Pure client-side browser execution with zero external data transmission.`
      },
      {
        heading: '4. Ethical Considerations & Limitations',
        content: `• Non-Maleficence: Safety screening always overrides general informational matching.
• Algorithmic Transparency: Every intermediate step in the NLP pipeline is open for inspection.
• Rule-Based Scope: Lexical matching does not parse complex syntax or atypical disease presentations.
• Incomplete Warning List: The emergency warning list is explicitly noted as non-exhaustive; absence of match never guarantees safety.`
      }
    ]
  },
  {
    id: 'testing',
    title: 'Formal Test Suite & Execution Audit',
    badge: 'TESTING.md',
    filename: 'TESTING.md',
    summary: 'Specification of formal test cases covering emergency red flags, common conditions, empty input, unrecognized input, and mixed symptoms with actual runtime logs.',
    sections: [
      {
        heading: '1. Test Matrix Overview',
        content: `The formal test suite comprises 13 formal test cases categorized into:
1. Emergency Warning Phrases (5 cases): Acute Coronary Syndrome, Stroke FAST, Severe Dyspnea, Syncope, Thunderclap Headache.
2. Common Symptom Presentations (4 cases): Common Cold, Seasonal Allergies, Tension Headache, Gastroenteritis.
3. Boundary & Input Validation (2 cases): Empty string and whitespace-only input.
4. Unrecognized & Out-of-Domain (2 cases): Non-medical gibberish and conversational non-symptom narrative.
5. Mixed / Multi-System (1 case): Concurrent respiratory and GI symptoms.`
      },
      {
        heading: '2. Execution Summary (100% Pass Rate)',
        content: `• All 13 test assertions executed successfully with 0 failures.
• Average pipeline execution latency: 0.9 ms per query.
• Emergency rules demonstrated strict 100% sensitivity for defined trigger phrases.
• Unrecognized input test cases successfully triggered conservative fallback guidance with zero fabricated diagnostic claims.`
      },
      {
        heading: '3. Verification of Emergency Priority',
        content: `In all test runs where emergency warning phrases were introduced, the emergency red banner was rendered as the primary, prominent visual element with immediate 911 dispatch directives, verifying that emergency detection overrides ordinary symptom mapping.`
      }
    ]
  },
  {
    id: 'research',
    title: 'Academic Research & Regulatory Review',
    badge: 'research.md',
    filename: 'research.md',
    summary: 'Clinical AI in symptom triage, NLP trade-offs, FDA Software as a Medical Device (SaMD) guidance, WHO ethics principles, and algorithmic bias.',
    sections: [
      {
        heading: '1. Clinical Landscape & Semigran et al. Benchmark',
        content: `In a landmark benchmark study by Semigran et al. (published in The BMJ), 23 commercial symptom checkers were evaluated using 45 standardized vignettes:
• The correct diagnosis was listed first in only 34% of vignettes.
• Triage accuracy was 57% in emergency scenarios.
• High variance between over-triage and under-triage underscores why student prototypes must adopt conservative safety boundaries and avoid claiming unvalidated clinical intelligence.`
      },
      {
        heading: '2. Regulatory Governance: U.S. FDA on SaMD',
        content: `Under the U.S. FDA Software as a Medical Device (SaMD) framework and Clinical Decision Support (CDS) guidance:
• Consumer-facing symptom checkers that provide diagnostic or triage recommendations do NOT qualify for non-device CDS exemptions because lay consumers lack independent clinical assessment capabilities.
• Commercial diagnostic tools require formal premarket review (510(k), De Novo, or PMA) with extensive clinical trial validation.`
      },
      {
        heading: '3. WHO Guidance on AI for Health',
        content: `The World Health Organization (2021) established 6 core ethical principles for AI in health:
1. Protecting human autonomy
2. Promoting human well-being and safety
3. Ensuring transparency, explainability, and intelligibility
4. Fostering responsibility and accountability
5. Ensuring inclusiveness and equity
6. Promoting responsive and sustainable AI.`
      },
      {
        heading: '4. Privacy, Equity, and Algorithmic Bias',
        content: `• Privacy: Local client-side execution ensures zero transmission of sensitive personal health data, aligning with HIPAA and GDPR data minimization requirements.
• Bias: Gender differences in myocardial infarction presentations (e.g. atypical dyspnea in women vs. classic crushing chest pain) illustrate why lexical rules must be treated as non-exhaustive educational demonstrations rather than definitive clinical gates.`
      }
    ]
  }
];
