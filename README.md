# AI-Powered Symptom Checker and Triage Assistant
**Student AI Healthcare Innovation Project Prototype**

> **IMPORTANT DISCLAIMER:**  
> This application is an **educational engineering prototype** developed exclusively for academic study and demonstration. It is **NOT** a medical diagnostic device, FDA-cleared Software as a Medical Device (SaMD), or clinical triage system. It does not provide medical diagnoses, clinical treatment plans, or definitive safety clearances. Anyone experiencing severe or life-threatening symptoms must immediately call **911** (in the United States) or their local emergency services.

---

## 1. Project Purpose & Objectives

In healthcare informatics, conversational symptom triage poses both tremendous opportunities and critical safety hazards. While modern large language models (LLMs) can produce fluent prose, clinical safety demands **strict determinism, auditable logic, zero hallucinations, conservative risk handling, and patient privacy**.

The objectives of this student project are:
1. **Auditable NLP Architecture:** Demonstrate how classical, transparent natural language processing (text normalization, tokenization, stop-word elimination, and canonical taxonomy mapping) provides explainable symptom extraction without black-box opacity.
2. **Deterministic Emergency Pre-Screening (Priority 1):** Implement hard-stop safety rules that intercept acute red flags (e.g., chest pain, stroke signs, respiratory failure, altered consciousness) *before* general symptom evaluation occurs.
3. **Zero False-Safety Guarantee:** Prevent algorithmic over-reassurance by explicitly rejecting pseudo-probabilities and affirming that no keyword check can ever prove the absence of an emergency.
4. **100% Client-Side Privacy:** Ensure sensitive health inquiries remain entirely on the user's device, with zero telemetry, zero remote server transmission, and no storage of personal identifiable health data.

---

## 2. Key Features

- **Home & Educational Triage Dashboard:**
  - Accessible healthcare user interface styled with clean medical white, teal, and blue palettes.
  - Transparent orientation explaining the four-phase evaluation pipeline.
- **Natural Language Symptom Input:**
  - Large free-form text input allowing users to express symptoms in everyday lay terminology.
  - Contextual modifiers: Age Range (Child, Adolescent, Adult, Older Adult) and Duration of Symptoms.
  - Instant demonstration preset scenarios (Common Cold, Seasonal Allergies, Tension Headache, Acute Gastroenteritis, Cardiac Emergency, Stroke FAST, Unrecognized Input).
  - Validation guards rejecting empty or whitespace-only queries.
  - De-identification notices prohibiting entry of names, phone numbers, or addresses.
- **Auditable Multi-Stage NLP Pipeline:**
  - Stage 1: Text sanitization, lowercasing, and colloquial contraction expansion (`can't` &rarr; `cannot`).
  - Stage 2: Tokenization & whitespace boundary segmentation.
  - Stage 3: Stop-word filtering removing non-discriminative grammar while retaining medical terms.
  - Stage 4: N-gram construction (unigrams, bigrams, trigrams).
  - Stage 5: Hard-stop Emergency Screening (Priority 1).
  - Stage 6: Canonical medical concept mapping via colloquial synonym dictionary.
  - Stage 7: Transparent demonstration knowledge base overlap scoring (e.g., "3 of 4 primary criteria matched", avoiding fake percentage probabilities).
  - Stage 8: Conservative handling of unrecognized or ambiguous input.
- **Emergency Safety Interception (Priority 1):**
  - Prominent emergency alerts with one-click crisis dialing (`tel:911`).
  - Explicit notification that the safety rule database is non-exhaustive.
- **Educational Knowledge Base:**
  - Standardized reference entries for Upper Respiratory Infection, Seasonal Allergic Rhinitis, Tension-Type Headache, Migraine without aura, Acute Gastroenteritis, Acute Bronchitis, and Musculoskeletal Strain.
  - Detailed pathology notes, supportive home care guidelines, physician consultation questions, and red-flag warning signs.
- **Physician Consultation Prep Report:**
  - One-click copy or formatted print generation of patient notes for real-world physician visits.
- **In-Browser Interactive Test Suite Runner:**
  - Real-time execution of the formal test cases specified in `TESTING.md`.
  - Pass/fail assertions with millisecond latency logging.

---

## 3. Technology Stack

- **Frontend Framework:** React 19 + TypeScript (Strict typing enabled)
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4 (Clean, modern clinical design with WCAG AA compliance)
- **Icons:** Lucide React
- **Runtime Environment:** Pure client-side browser execution (100% on-device processing)
- **No External AI API Transmission:** Symptom descriptions are parsed locally without transmitting sensitive health queries to external cloud endpoints.

---

## 4. Setup and Installation Instructions

### Prerequisites
- Node.js (version 20.x or later recommended)
- npm or yarn

### Installation Steps
```bash
# 1. Clone the repository
git clone https://github.com/your-username/symptom-checker-triage-prototype.git
cd symptom-checker-triage-prototype

# 2. Install dependencies
npm install

# 3. Start the local development server
npm run dev

# The application will be accessible at http://localhost:3000
```

### Production Build
```bash
# Build production bundle
npm run build

# Preview production build
npm run preview
```

---

## 5. Usage Instructions

1. **Step 1 - Navigation:** Open the web app and review the Educational Disclaimer Banner.
2. **Step 2 - Input Entry:** In the Symptom Checker tab, describe your symptoms in plain words or select one of the demonstration preset buttons (e.g. *Common Cold* or *EMERGENCY: Chest Pain*).
3. **Step 3 - Optional Modifiers:** Select an approximate age range and duration of symptoms.
4. **Step 4 - Analyze:** Click **Analyze Symptoms**.
5. **Step 5 - Review Results:**
   - If an emergency warning sign is detected, observe the high-priority red alert instructing immediate contact with 911.
   - For non-emergency symptoms, review mapped clinical concepts, matching educational reference conditions, supportive care, and questions for your doctor.
6. **Step 6 - Deep Inspection:** Click the **NLP Pipeline** tab to inspect the raw tokens, stop-word filtering, and criteria overlap table.
7. **Step 7 - Automated Verification:** Click the **Test Suite** tab and hit **Execute All Test Cases** to audit the test matrix live.

---

## 6. Limitations & Conservative Design Choices

1. **Rule-Based Lexical Matching:** The prototype uses an auditable, deterministic keyword/synonym matcher. It does not parse complex dependent syntactic clauses (e.g. *“My friend had chest pain, but I just have a runny nose”*). In production clinical informatics, robust dependency parsing or validated transformer architectures would be required.
2. **Incomplete Red-Flag Inventory:** No rule set can encompass every atypical presentation of myocardial infarction, stroke, or sepsis. Absence of an alert does not prove safety.
3. **No Probabilistic Diagnostic Claims:** The application explicitly refuses to calculate percentage probabilities (e.g., "78% probability of influenza") because such numbers from unvalidated systems create dangerous false confidence.
4. **Pediatric and Geriatric Caution:** Extreme age cohorts exhibit non-classical disease presentations; educational notes urge direct clinical consultation.

---

## 7. Ethical Considerations

- **Non-Maleficence (Do No Harm):** Safety screening always overrides general informational matching. The software handles uncertainty conservatively.
- **Privacy by Design:** Health data is highly sensitive. By processing all inputs client-side and omitting user registration, patient telemetry, and cookies, user confidentiality is preserved.
- **Algorithmic Transparency:** Users and reviewers can inspect every intermediate step in the NLP pipeline, contrasting sharply with unexplainable commercial black boxes.
- **Accountability & Scope:** The prototype never attempts to function as an autonomous clinical triage officer.

---

## 8. Authoritative References

1. **U.S. Food and Drug Administration (FDA):**
   - *Policy for Device Software Functions and Mobile Medical Applications (Guidance for Industry and Food and Drug Administration Staff)*, U.S. Department of Health and Human Services, 2022.
   - *Clinical Decision Support Software: Guidance for Industry and Food and Drug Administration Staff*, FDA-2017-D-6569, September 2022.
2. **World Health Organization (WHO):**
   - *Ethics and Governance of Artificial Intelligence for Health: WHO Guidance*, World Health Organization, Geneva, 2021. ISBN: 978-92-4-002920-0.
3. **American Heart Association / American Stroke Association:**
   - *Guidelines for the Early Management of Patients With Acute Ischemic Stroke*, Stroke. 2019;50:e344–e418.
4. **Semigran, H. L., et al. (2015):**
   - *Evaluation of symptom checkers for self diagnosis and triage: audit study*, BMJ 2015; 351:h3480.
