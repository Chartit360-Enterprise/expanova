# Expanova – Website Knowledge Base (info.md)

This document is the single source of truth for the new website. Share content in chat and I will append, organize, and refine it here.

—

## How this file is used
- Add raw content in any order; I will place it in the correct section.
- I will maintain a Decisions Log and Change Log at the bottom.
- When sections are complete, I will mark them with a status tag.

## Status Tags
- [draft] needs more info
- [review] ready for your review
- [final] approved content

## Table of Contents
- Strategy
- Audience
- Value Proposition
- Brand Architecture
- Expanova Group Overview
- Product: Criterion
- Agency: BlackBox Dev
- Portfolio: Chartit360
- Information Architecture (IA)
- Page Blueprints
- Content Assets
- Brand & Visual Language
- Copy Guidelines & Tone
- SEO & Metadata
- Legal
- Technical Notes
- Open Questions
- Decisions Log
- Change Log

## Strategy [draft]
Short vision, goals, and success metrics for the website.

## Audience [draft]
- Primary audience:
- Secondary audience:
- Key pains / jobs-to-be-done:

## Value Proposition [draft]
- Core promise:
- Differentiators:
- Proof (social, results, credentials):

## Brand Architecture [draft]
| Level | Example Name | Description |
| --- | --- | --- |
| Parent Company | Expanova Group / Expanova Labs | Umbrella for all ventures and funds. |
| AI Validation Tool | Criterion | Startup idea evaluator (first flagship product). |
| Angel / VC Arm | Expanova Capital | Invests in high-score Criterion ideas. |
| Development Studio | Expanova Foundry | Builds or scales validated ideas. |
| Community / Platform | Expanova Signal | Network layer for founders + investors. |
| Agency Wing | BlackBox Dev | Our software agency wing. |

## Expanova Group Overview [draft]
Source: `WF - Expanova Group - 251105-201114.md` (workspace copy). If any item conflicts with approved decisions above, the approved decisions take precedence.

### Priorities
- Criterion AI — Priority #1 (flagship product focus)

### Long-term Vision
- Captured in the WF document; to be synthesized into concise site-ready copy.

### Brand Decisions (confirmed)
- Expanova is the parent brand across fund + studio + AI tools.
- Criterion is the flagship product under the Expanova umbrella.

### Next Integration Pass
- Pull refined mission/vision statements and value themes from the WF for Strategy and Value Proposition sections.
- Add any additional sub-brand details that do not conflict with Brand Architecture.

## Product: Criterion [draft]
Source reference: https://criterion.expanova.io/

### Overview
- Name: Criterion (by Expanova)
- Purpose: Transform LLM evaluations from subjective scores into objectively reliable binary decisions
- Current scope: Pre-Launch Idea Evaluation available now; Post-Launch Product Audit and Learning & Reflection System coming soon

### Philosophy – The Core Breakthrough
- Problem: Traditional LLM evaluations yield subjective, fragile outputs (e.g., “7/10”), highly sensitive to prompt framing
- Solution: Replace one vague score with 10–20 binary (0/1) micro-evaluations with clear pass/fail criteria
- Outcome: Eliminates ambiguity of middle-ground ratings; increases accuracy from ~70% to 85%+
- Approach: LLMs execute extracted, proven points of view from success patterns (e.g., Lovable, Scale AI, Tesla) rather than originating opinions

### Economic Impact
- 5–10 minutes vs 140+ minute meetings for comparable decisions
- ~100x more ideas tested at same cost
- 85%+ prediction accuracy with full transparency

### Methodology – System Architecture
- Part 1: Pre-Launch Idea Evaluation (Available Now)
  - Competition Research Engine: LLM-powered competitor discovery; multi-source review mining (Trustpilot, Reddit, App Store, X); pattern detection; global search with native language; cross-country opportunity mapping
  - Binary Evaluation Framework: 10–20 binary micro-evaluations per major criterion; each decision is pass/fail; aggregates into reliable 0–10 scores; complete reasoning trails; results stored for pattern learning/reuse
  - Proven Principles Integration: Peter Thiel’s 7 questions; Elon Musk’s requirement questioning; Y Combinator’s 10-dimension grid; tiered importance (Essential/Medium/Optional); Insight Analyzer across business principles
- Part 2: Post-Launch Product Audit (Coming Soon)
  - Multi‑modal analysis of live products (websites, screenshots, docs); detect promise–delivery gaps; benchmark vs category leaders
- Part 3: Learning & Reflection System (Coming Soon)
  - Failure analysis and knowledge preservation; institutional memory that compounds with each evaluation

### Technical Architecture
- Multi‑Modal Processing: text, images, data; smart routing to specialized models for cost optimization
- Persistent Job Tracking: progress persistence; resume from checkpoints; complete audit trails
- Async Operations: long‑running evaluations in background; polling for status
- Database Flexibility: PostgreSQL and SQLite support; automatic placeholder conversion

### Five Core Principles
1) Language Matters; ChatGPT outputs are framing-sensitive → eliminate linguistic bias; LLMs execute proven opinions
2) Binary Decomposition → 10–20 small binary prompts beat one big subjective score; increases accuracy to 85%+
3) Speed Determines Innovation Velocity → 5–10 min evaluations enable 20x experiments at same cost
4) Extract and Execute Proven POVs → from Lovable, Scale AI, Apple, Microsoft
5) VC Evaluation as Ultimate Validation → if used for dealflow, Criterion becomes infrastructure for innovation evaluation

### Frameworks Used
- Peter Thiel’s 7 Critical Questions (Engineering; Timing; Monopoly; People; Distribution; Durability; Secret)
- Lean Startup Build–Measure–Learn loop (hypothesis → smallest test → measure behavior → learn → decide)
- YC’s 10 Dimensions (Demand, Retention, Revenue Growth, Engagement, Market Size, Feedback Quality, Competitive Advantage, Scalability, Usage, Efficiency)

### Quality Standards
- 85%+ prediction accuracy minimum
- 90%+ schema compliance required
- 100% audit trail transparency

### CTA
- Ready to evaluate your idea? Try Criterion by Expanova

### Owners
- Stan — Product Owner
- Alexey — Technical Lead
- Daniel — Product Manager
- Eve — Product Lead

### Performance Thresholds
- Speed: 5–10 minute evaluations (vs 140+ minute meetings)
- Scale: Enable testing of 100 ideas (vs 5)
- Reliability: Binary (0/1) evaluation with 10–20 micro‑checks per step
- Transparency: Complete trail of thought for every decision for compliance
- ROI Target: Build $20,000–$50,000 businesses from validated ideas

### DOK4 – Spiky Points of View
- Language Matters; ChatGPT is Unreliable (CRITICAL): subtle prompt framing flips outcomes; eliminate linguistic bias; make LLMs the executor of proven opinions, not the originator
- Binary Decomposition Beats Everything (TECHNICAL): replace a single score with 10–20 binary checks; forces clear boundaries; yields reproducibility
- Speed of Evaluation Determines Innovation Velocity (STRATEGIC): 5–10 minute evaluations unlock 20× more experiments; test 100 ideas to find one $20–50K business
- Extract and Execute Proven POVs (OPERATIONAL): encode principles from Lovable, Scale AI, Apple, Microsoft; tier criteria (Essential, Medium, Optional)
- VC Evaluation as Ultimate Market Validation (MARKET): target VC partnerships within 12 months; if trusted for deal flow, Criterion becomes evaluation infrastructure

### DOK3 – Domain Insights
- MARKET
  - 140‑minute meetings for single‑idea reviews waste cycles; 80%+ of innovation budget often misallocated
  - VC due‑diligence bottlenecks limit deal flow; structured binary evaluation removes subjective bias
  - Best startups dominate tiny markets first (Facebook@Harvard, Amazon/books, PayPal/eBay)
- TECHNICAL
  - Effective evaluation requires multi‑modal processing and smart routing; single prompts are fragile
  - Binary frameworks with 10–20 micro‑evaluations ensure reproducibility and transparency
  - "Question every requirement with the name of who made it" drives auditability
- OPERATIONAL
  - Real investment is curating 20+ high‑quality examples and full reasoning trails
  - Human validation checkpoints remain for critical calls; automation augments, doesn’t replace
- QUALITY
  - Users must see why a score was assigned; maintain complete reasoning trails and learn from misses
  - Minimum standards: ≥85% prediction accuracy; ≥90% schema compliance
- GOVERNANCE
  - Systematic bias elimination, clear ownership per criterion, and complete audit trails
  - Boundaries prevent misapplication to inappropriate targets
- CROSS‑DOMAIN
  - Optimization patterns transfer across evaluation types; each improvement compounds systemwide

### Experts (sources mapped to implementation)
- Peter Thiel — Zero to One: seven questions become binary micro‑checks per question
- Elon Musk — Requirement questioning: every criterion has an owner and rationale
- Michael Seibel (YC) — Depth of user love > breadth; YC’s 10‑dimension grid → binary thresholds
- Alexandr Wang (Scale AI) — High‑attention‑to‑detail evaluation; benchmark to find weaknesses
- Lovable (Anton Osika, Fabian Hedin) — Rapid iteration; third launch succeeded via completeness

### Knowledge Tree (Criterion)
- Solution Architecture
- Market Strategy & Growth Path
- Success Metrics & Validation
- Risk Mitigation & Boundaries

### Solution Architecture
- Three‑Module System
  1) Pre‑Launch Idea Evaluation — available now
     - Competition Research Engine
       - Deep review mining (Trustpilot, Reddit, App Store, X) → detect patterned complaints/gaps
       - Multi‑lingual search to surface regional gaps; cross‑country opportunity mapping
       - Competitor functionality scan (UX videos, feature sets) → comparative analysis
       - Extract failure archetypes (pricing, timing, distribution, etc.)
       - YC/Sequoia library checks for prior patterns; brand/name cross‑cultural safety scan
       - Output: global opportunity map with whitespace and pain‑pattern clusters
     - Binary Evaluation Framework
       - 10–20 micro‑evaluations per major criterion; each 0/1 with explicit pass/fail bar
       - Aggregation: tier‑weighted scoring to 0–10 per pillar; confidence intervals
       - Output: decisions + explanations + citations; all stored for reuse/learning
     - Spiky POV Integration
       - Embed Thiel’s 7, Musk’s Algorithm, YC 10‑dimensions with Essential/Medium/Optional tiers
  2) Post‑Launch Product Audit — coming soon
     - Multi‑modal ingestion (site, screenshots, docs) to detect promise‑delivery inconsistencies
     - Benchmark vs leaders; surface specific remediation items
  3) Learning & Reflection System — coming soon
     - Failure analysis, knowledge preservation, institutional memory with pattern mining

### Technical Implementation Details
- Prompt Template Library: Claude/Code‑oriented prompt sets for binary checks and evidence citing
- Multi‑Modal Routing: task‑based model selection to balance cost vs fidelity
- Persistent Job Tracking: idempotent jobs, checkpointing, retry/backoff; full audit logs
- Data Layer: PostgreSQL and SQLite supported; automatic placeholder conversion for cross‑DB compatibility
- Async Orchestration: background workers; status polling APIs; resumable workflows
- Schema Validators: strict JSON schema enforcement for every intermediate result

### Competition Evaluation & Scoring
- Pillars (examples): Problem, Timing, Monopoly/Focus, Team, Distribution, Durability, Secret
- Each pillar = 3–5 binary micro‑checks → explicit pass/fail criteria
- Scoring: tier weights (Essential > Medium > Optional); aggregate to 0–10 with confidence band
- Output package: score breakdown, per‑check rationale, source snippets, and next‑step recommendations

### Market Strategy & Growth Path
1) Internal validation: use Criterion to evaluate our own pipeline; ship in 5–10 min cycles
2) Build/sell $20–50K micro‑businesses from validated ideas; reinvest results and publish case studies
3) Agency enablement: integrate Criterion into BlackBox Dev delivery for product audits
4) VC partnerships: target adoption for deal flow within 12 months as primary validation metric

### Success Metrics & Validation
- Speed: median evaluation ≤10 minutes; p95 ≤15 minutes
- Quality: ≥85% predictive accuracy; ≥90% schema compliance; 100% audit trail completeness
- Adoption: #ideas evaluated/week; #agency projects audited; #VC partners using the tool
- Business impact: #validated ideas shipped; revenue from validated micro‑businesses

### Risk Mitigation & Boundaries
- Technical: model drift, rate limits, multimodal failures → mitigated via canary tests, retries, fallback models
- Data: PII/compliance → redaction, access controls, encrypted at rest/in transit, audit logs
- Methodological: over‑automation → human checkpoints for critical decisions; document ownership per criterion
- Scope boundaries: do not evaluate inappropriate targets; publish list of excluded categories

## Agency: BlackBox Dev [draft]
### Overview
- We build fast, reliable websites, SaaS platforms, and AI tools for startups, creators, and small businesses—delivered in days, not weeks.
- Calls to Action: Get Started, About Us, Scroll to projects

### Services
- Websites (marketing and content)
- SaaS platforms (authentication, billing, admin dashboards)
- Custom AI tools and integrations

### Selected Projects
1) Chartit360 — AI Financial Analytics
   - An intuitive, enterprise-grade data analytics platform for financial insights
   - Action: View project
2) Ultimate SaaS Template
   - Complete, ready-to-launch SaaS template with authentication, billing, and admin dashboard
   - Action: View project

### About Us
- BlackBox Dev is a lean, senior‑led digital agency built for speed and scale.
- Founded in London in November 2024 by Full Stack AI & Software Developer Stanislav Huseletov.
- Three‑person core team across the UK and Ukraine with deep frontend, backend, and AI expertise.

### Operating Model & Speed
- Engineered internal ecosystem of battle‑tested templates and modular add‑ons.
- Case study: built and launched our own Next.js/TypeScript platform in 6 days, 15% under budget, without compromising quality.
- Product‑minded approach: clear communication, thoughtful UX, rock‑solid architecture that scales without locking clients into technical debt.

### Contact
- Primary CTA: Get in touch

### Footer
- © 2025 BlackBox Dev.

### External References
- Project case reference: https://www.blackbox-dev.com/projects/chartit360

## Portfolio: Chartit360 [draft]
Source references: see External References at the end of this section.

### Overview
- Name: Chartit360
- Tagline: Understand Your Data Better with Chartit360
- Description: An intuitive, enterprise-grade data analytics platform. Your complete solution for advanced AI-driven financial insights, forecasts, and real-time dashboards.

### Site Navigation / Entry Points
- Introducing Chartit
- Features
- Pricing
- Visit

### Calls to Action
- Get Started
- Join our team (developer, designer, or finance expert)
- Join waitlist (early access)
- Watch a Demo, then experience Chartit in just 1 minute

### Key Feature Blocks
- Advanced AI Analytics: Leverage machine learning to forecast trends and analyze complex datasets.
- Interactive Dashboards: Visualize your data with customizable, real-time dashboards.
- Comprehensive Insights: Gain deep insights with calculated and composite financial indicators.
- Seamless Integration: Easily connect with your existing tools and workflows.
- Multi-User Collaboration (Channels): Dedicated workspaces per project/department/client; customizable permissions; real-time collaboration.
- Advanced Data Visualization: Interactive charts/graphs and custom dashboards; AI-enhanced visualization tools for effective communication.
- Custom Reporting: Generate detailed quarterly statements, budget comparisons, and executive summaries; clear, share-ready reports.
- Security & Compliance: Enterprise-grade security, regulatory compliance, encryption, access controls, and regular security audits.

### Experience Notes
- Smooth, intuitive experience that reduces complexity and cognitive load; natural and responsive UI.
- Clear & extensive dashboard UI enabling quick navigation and efficient data management.

### Social Proof (Testimonials)
- Stan (@stan): “The technical depth behind Chartit is seriously impressive. It’s clear a lot of thought went into making it robust, yet accessible.”
- Alexey (@alexey): “Chartit has completely streamlined how we approach analysis. It’s intuitive, but powerful enough to handle complex scenarios that Excel simply can’t.”
- Andrey (@andrey): “The range of built-in tools and AI-driven insights is game-changing. We've drastically reduced time spent on manual calculations.”

### Relationships
- Sponsorship: Chartit is sponsored by Expanova as one of our startups.
- Production: Chartit was made with Blackbox-Dev, our software agency wing.

### Footer / Misc
- Copyright © 2025 Chartit360 Limited. All rights reserved.
- Theme: Toggle theme option present on site.

### External References
- Marketing site: https://marketing.chartit360.com/en
- Blackbox-Dev project page: https://www.blackbox-dev.com/projects/chartit360

## Information Architecture (IA) [draft]

### Scalable Navigation Structure
**Principle:** Hierarchy supports unlimited subdivisions while maintaining clarity.

```
Expanova Group (Home)
├── Products
│   ├── Criterion (Flagship)
│   │   ├── Overview
│   │   ├── How It Works (Philosophy, Methodology, Principles, Framework)
│   │   ├── Pricing
│   │   └── Try Criterion → (external: criterion.expanova.io)
│   └── [Future Product Slot]
│
├── Ventures
│   ├── Expanova Capital
│   ├── Expanova Foundry
│   ├── Expanova Signal
│   └── [Future Venture Slot]
│
├── Agency
│   └── BlackBox Dev
│       ├── Services
│       ├── Projects (Chartit360, Ultimate SaaS Template, etc.)
│       ├── About
│       └── Contact
│
├── Portfolio
│   ├── Chartit360 (Featured)
│   └── [Future Portfolio Items]
│
├── About
│   ├── Group Overview
│   ├── Team
│   └── Vision
│
└── Resources
    ├── Blog
    ├── Case Studies
    └── Documentation
```

### Navigation Patterns
- **Primary Nav:** Horizontal menu with mega-menu dropdowns for Products/Ventures/Agency
- **Mobile:** Hamburger → slide-out drawer with accordion sections
- **Breadcrumbs:** Always visible on sub-pages (Home > Products > Criterion > Overview)
- **Quick Access:** Sticky top bar with "Try Criterion" CTA + search icon
- **Footer:** Multi-column with all subdivisions + legal links

## Page Blueprints [draft]

### Home [draft]
**Purpose:** Showcase Expanova Group as elite innovation infrastructure. One-stop for all subdivisions.

**Hero Section**
- **Layout:** Full-viewport with animated gradient mesh background
- **Headline:** "Expanova — Expanding what's possible" (large, gradient text with subtle glow)
- **Subheadline:** "Building the future of innovation evaluation through AI-powered tools, strategic investments, and rapid development."
- **CTAs:** 
  - Primary: "Try Criterion" (leads to criterion.expanova.io) — prominent, glowing
  - Secondary: "Explore Group" (scrolls to subdivisions grid)
- **Visual:** Subtle animated grid overlay, particle effects on hover
- **Padding:** 120px top, 80px bottom

**Subdivisions Grid Section**
- **Layout:** 3-column grid (desktop) → 2-column (tablet) → 1-column (mobile)
- **Card Design:**
  - Glass-morphism effect (blur + transparency)
  - Hover: Scale 1.05, glow border, shadow elevation
  - Icon (top-left): 48px, subtle pulse animation
  - Title: Large, bold, gradient text
  - Description: 2-3 lines, muted color
  - CTA: "Explore [Name]" (arrow icon, slides in on hover)
- **Cards:**
  1. Criterion (Flagship badge: "Priority #1")
  2. Expanova Capital
  3. Expanova Foundry
  4. Expanova Signal
  5. BlackBox Dev
  6. Chartit360 (Portfolio badge)
- **Background:** Subtle diagonal gradient, animated pattern overlay

**Stats Bar Section**
- **Layout:** 4 equal columns with animated counters
- **Metrics:**
  - 5-10 min (Criterion evaluation time)
  - 85%+ (Prediction accuracy)
  - 100x (Ideas tested vs traditional)
  - 100% (Audit trail transparency)
- **Design:** Each stat has icon, animated number, label below
- **Background:** Dark panel with subtle border

**How It Works Section (Criterion Focus)**
- **Layout:** 3-step horizontal flow with connecting lines
- **Steps:**
  1. Binary Evaluation (icon: checkmark grid)
  2. Proven POVs (icon: brain/network)
  3. Fast Results (icon: lightning/clock)
- **Visual:** Interactive cards that flip on hover to show details
- **Background:** Alternating light/dark sections

**CTAs Section**
- **Layout:** Two-column split
  - Left: "Evaluate Your Idea" → Criterion
  - Right: "Build Your Product" → BlackBox Dev
- **Design:** Large cards with gradient overlays, hover effects

**Footer**
- **Layout:** 5-column grid
  - Column 1: Expanova Group (logo, tagline, social links)
  - Column 2: Products (Criterion, [Future])
  - Column 3: Ventures (Capital, Foundry, Signal)
  - Column 4: Agency (BlackBox Dev, Contact)
  - Column 5: Legal (Privacy, Terms, © 2025)
- **Background:** Deep dark with subtle texture

### Product: Criterion [draft]
**Purpose:** Deep dive into flagship product. Show sophistication and technical depth.

**Hero Section**
- **Layout:** Full-width with left-aligned content, right-side animated visualization
- **Headline:** "Criterion — The standard for startup truth"
- **Subheadline:** "Transform LLM evaluations from subjective scores into objectively reliable binary decisions"
- **CTAs:** 
  - Primary: "Try Criterion" (external link)
  - Secondary: "Read Methodology"
- **Visual:** Interactive binary decision tree animation (nodes connect on scroll)

**Tab Navigation (Sticky on Scroll)**
- Tabs: Philosophy | Methodology | Principles | Framework
- **Design:** Minimal underline indicator, smooth transitions
- **Active State:** Gradient underline, bold text

**Philosophy Tab Content**
- **Section 1: The Core Breakthrough**
  - Large quote-style text block
  - Problem/Solution cards side-by-side
  - Economic Impact metrics (3-column grid)
- **Visual:** Animated cards that reveal on scroll

**Methodology Tab Content**
- **System Architecture Diagram:**
  - Visual flow: Pre-Launch → Post-Launch → Learning System
  - Each module expandable with details
- **Technical Architecture Cards:**
  - Multi-Modal Processing
  - Persistent Job Tracking
  - Async Operations
  - Database Flexibility
- **Design:** Hexagonal/circuit-style connections between modules

**Principles Tab Content**
- **5 Core Principles:**
  - Each principle = large card with icon, title, description
  - Hover reveals supporting evidence/quotes
- **Key Success Patterns:**
  - Quote cards from Thiel, Seibel, Wang, Lovable
  - Citation badges with links

**Framework Tab Content**
- **Evaluation Frameworks:**
  - Thiel's 7 Questions (expandable accordion)
  - Build-Measure-Learn Loop (visual diagram)
  - YC 10 Dimensions (interactive grid)
- **Quality Standards:**
  - 3-column stat cards (85%+, 90%+, 100%)

**Footer CTA**
- Large section: "Ready to evaluate your idea?"
- Prominent "Try Criterion by Expanova" button

### Pricing [draft]
- Packages/tiers, inclusions, FAQs:

### Docs / Learn [draft]
- Getting started, guides, tutorials:

### Blog / Updates [draft]
- Topics, cadence, editorial rules:

### About [draft]
- Story, team, values:

### Contact [draft]
- Contact methods, support SLAs:

## Content Assets [draft]

### Visual Assets Needed
**Logos:**
- Expanova Group (parent) — horizontal and stacked versions
- Criterion (product) — with and without "by Expanova" tag
- Expanova Capital, Foundry, Signal (sub-brands)
- BlackBox Dev (agency)
- Chartit360 (portfolio)

**Icons:**
- Custom icon set for subdivisions (tech-forward, minimal)
- Feature icons (binary grid, brain/network, lightning, etc.)
- Social media icons (GitHub, LinkedIn, Twitter/X)

**Diagrams:**
- Criterion system architecture (3-module flow)
- Binary evaluation framework visualization
- Competition research engine flow
- Market strategy growth path

**Screenshots:**
- Criterion interface (dashboards, evaluation results)
- Chartit360 dashboard
- BlackBox Dev project showcases

**Videos:**
- Criterion demo (5-minute walkthrough)
- BlackBox Dev case study (Chartit360 build)
- Team intro (optional, for About page)

**Testimonials:**
- Chartit360 testimonials (Stan, Alexey, Andrey)
- Future: Criterion user testimonials

**Case Studies:**
- BlackBox Dev: Chartit360 project
- BlackBox Dev: 6-day platform build
- Future: Criterion-validated businesses

## Brand & Visual Language [draft]

### Design Philosophy
**High-Tech + Elite + Accessible**
- **High-Tech:** Futuristic aesthetics, data visualization, algorithmic precision
- **Elite:** Premium spacing, refined typography, subtle luxury touches
- **Accessible:** Clear hierarchy, intuitive navigation, fast load times

### Color System
**Primary Palette:**
- **Background Base:** `#0A0A0F` (Deep space black)
- **Surface:** `#121218` (Elevated panels)
- **Surface Elevated:** `#1A1A24` (Cards, modals)
- **Border:** `#2A2A3A` (Subtle divisions)
- **Border Focus:** `#4A4A6A` (Active states)

**Accent Colors:**
- **Primary Accent:** `#00D4FF` (Electric cyan — high-tech, precision)
- **Secondary Accent:** `#FF6B35` (Vibrant orange — energy, action)
- **Success:** `#00FF88` (Neon green — validation, go)
- **Warning:** `#FFB800` (Amber — attention, caution)
- **Error:** `#FF3B5C` (Pink-red — critical, stop)

**Gradient Combinations:**
- **Hero Gradient:** `#00D4FF → #9D50FF → #FF6B35` (Cyan → Purple → Orange)
- **Card Hover:** Subtle radial gradient from accent color
- **Text Gradient:** `#FFFFFF → #00D4FF` (White → Cyan for headings)

**Opacity Levels:**
- **Glass Effect:** `rgba(255, 255, 255, 0.05)` (Subtle overlays)
- **Border:** `rgba(255, 255, 255, 0.1)` (Subtle divisions)
- **Text Muted:** `rgba(255, 255, 255, 0.6)` (Secondary text)

### Typography
**Font Stack:**
- **Headings:** `Inter` or `SF Pro Display` (Bold, 700-800 weight)
- **Body:** `Inter` (Regular, 400; Medium, 500)
- **Monospace:** `JetBrains Mono` (Code, metrics, technical details)

**Scale:**
- **Hero:** `clamp(3rem, 8vw, 6rem)` (48-96px)
- **H1:** `clamp(2.5rem, 6vw, 4.5rem)` (40-72px)
- **H2:** `clamp(2rem, 5vw, 3.5rem)` (32-56px)
- **H3:** `clamp(1.5rem, 4vw, 2.5rem)` (24-40px)
- **Body Large:** `1.25rem` (20px)
- **Body:** `1rem` (16px)
- **Small:** `0.875rem` (14px)
- **Tiny:** `0.75rem` (12px)

**Line Heights:**
- **Headings:** 1.1-1.2 (tight)
- **Body:** 1.6-1.7 (comfortable)
- **Long Form:** 1.8 (reading)

**Letter Spacing:**
- **Headings:** `-0.02em` (slightly tighter)
- **Body:** `0` (default)
- **Uppercase Labels:** `0.05em` (wider)

### Spacing System
**Base Unit:** 4px
- **XS:** 4px (0.25rem)
- **SM:** 8px (0.5rem)
- **MD:** 16px (1rem)
- **LG:** 24px (1.5rem)
- **XL:** 32px (2rem)
- **2XL:** 48px (3rem)
- **3XL:** 64px (4rem)
- **4XL:** 96px (6rem)
- **5XL:** 128px (8rem)

**Section Padding:**
- **Mobile:** 48px vertical, 16px horizontal
- **Desktop:** 96px vertical, 32px horizontal

### Border Radius
- **Small:** 4px (buttons, badges)
- **Medium:** 8px (cards, inputs)
- **Large:** 16px (panels, modals)
- **XLarge:** 24px (hero sections, large containers)
- **Full:** 9999px (pills, avatars)

### Shadows & Elevation
**Depth Levels:**
- **Level 0:** No shadow (base)
- **Level 1:** `0 2px 8px rgba(0, 0, 0, 0.1)` (cards)
- **Level 2:** `0 4px 16px rgba(0, 0, 0, 0.15)` (elevated cards)
- **Level 3:** `0 8px 32px rgba(0, 0, 0, 0.2)` (modals)
- **Glow Effect:** `0 0 24px rgba(0, 212, 255, 0.3)` (accent highlights)

### Glass Morphism
**Effect Specifications:**
- **Background:** `rgba(255, 255, 255, 0.05)`
- **Backdrop Blur:** `blur(20px)`
- **Border:** `1px solid rgba(255, 255, 255, 0.1)`
- **Use Cases:** Cards, navigation, modals, overlays

### Animation & Motion
**Timing Functions:**
- **Ease Out:** `cubic-bezier(0.16, 1, 0.3, 1)` (smooth, natural)
- **Ease In:** `cubic-bezier(0.7, 0, 0.84, 0)` (sharp start)
- **Spring:** `spring(260, 35)` (bouncy, responsive)

**Durations:**
- **Fast:** 150ms (micro-interactions)
- **Medium:** 300ms (transitions)
- **Slow:** 600ms (page transitions)
- **Very Slow:** 1200ms (complex animations)

**Hover Effects:**
- **Scale:** `transform: scale(1.02-1.05)`
- **Glow:** Border color intensifies, shadow expands
- **Lift:** `translateY(-2px)` with shadow increase
- **Transition:** `all 0.3s ease-out`

### Interactive Elements

**Buttons:**
- **Primary:** Gradient background, white text, glow on hover
- **Secondary:** Transparent, border, glow border on hover
- **Tertiary:** Text only, underline on hover
- **States:** Hover (glow), Active (scale 0.98), Disabled (opacity 0.5)

**Input Fields:**
- **Default:** Dark background, subtle border
- **Focus:** Accent border, glow ring, label animates up
- **Error:** Red border, error message below
- **Success:** Green border, checkmark icon

**Cards:**
- **Default:** Glass morphism, subtle border
- **Hover:** Scale 1.02, glow border, shadow elevation
- **Active/Selected:** Accent border, subtle background tint

**Navigation:**
- **Desktop:** Horizontal menu, mega-menu dropdowns
- **Mobile:** Hamburger → slide-out drawer
- **Active State:** Gradient underline, bold text
- **Hover:** Subtle background highlight

### Data Visualization
**Charts & Graphs:**
- **Colors:** Use accent palette (cyan, orange, green)
- **Grid:** Subtle lines (`rgba(255, 255, 255, 0.05)`)
- **Labels:** Small, muted text
- **Animations:** Staggered reveal on load

**Metrics Display:**
- **Large Numbers:** Bold, gradient text, animated counter
- **Labels:** Small, uppercase, letter-spaced
- **Icons:** 24-32px, subtle pulse animation

### Responsive Breakpoints
- **Mobile:** `< 640px` (single column, stacked)
- **Tablet:** `640px - 1024px` (2 columns, adjusted spacing)
- **Desktop:** `1024px - 1440px` (3 columns, full features)
- **Large Desktop:** `> 1440px` (max-width container, centered)

### Accessibility
- **Color Contrast:** WCAG AA minimum (4.5:1 for text)
- **Focus Indicators:** Visible outline (2px, accent color)
- **Keyboard Navigation:** Full support, logical tab order
- **Screen Readers:** Semantic HTML, ARIA labels
- **Motion:** Respect `prefers-reduced-motion`

### Tagline Direction [draft]
- Expanova — Expanding what’s possible.
- Criterion — The standard for startup truth.
- Expanova Capital — Backing what passes the Criterion.
- Expanova Foundry — Building what the future demands.

## Copy Guidelines & Tone [draft]
- Style (active voice, clarity rules):
- Terminology and banned words:
- Localization notes:

## SEO & Metadata [draft]
- Target keywords by page:
- Titles, meta descriptions, OG data:
- URL conventions and internal links:

## Legal [draft]
- Privacy, Terms, compliance statements:

## Technical Notes [draft]

### Framework & Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS (custom config matching design system)
- **Animations:** Framer Motion
- **3D Effects:** Three.js / React Three Fiber (optional, for hero sections)
- **Icons:** Lucide React or custom SVG set

### Routing Structure
```
/[locale]/
  ├── / (home)
  ├── /products/
  │   └── /criterion/
  │       ├── / (overview)
  │       ├── /philosophy
  │       ├── /methodology
  │       ├── /principles
  │       └── /framework
  ├── /ventures/
  │   ├── /capital
  │   ├── /foundry
  │   └── /signal
  ├── /agency/
  │   └── /blackbox-dev/
  │       ├── / (overview)
  │       ├── /services
  │       ├── /projects
  │       ├── /about
  │       └── /contact
  ├── /portfolio/
  │   └── /chartit360
  ├── /about
  ├── /resources/
  │   ├── /blog
  │   └── /case-studies
  └── /contact
```

### Data Sources
- **Content:** Markdown files (from `info.md` structure) or headless CMS (Strapi)
- **Dynamic Content:** API endpoints for subdivisions (if needed)
- **External Links:** Criterion (criterion.expanova.io), Chartit360, BlackBox Dev

### Component Architecture
**Reusable Components:**
- `<Hero>` — Full-width hero with gradient, CTAs
- `<SubdivisionCard>` — Grid card for subdivisions (scalable)
- `<FeatureGrid>` — Feature showcase with icons
- `<StatsBar>` — Animated metrics display
- `<TabNavigation>` — Sticky tabs for Criterion pages
- `<GlassCard>` — Glass morphism card component
- `<GradientButton>` — Primary CTA buttons
- `<Navigation>` — Scalable nav with mega-menu
- `<Footer>` — Multi-column footer (auto-scales with subdivisions)

**Page-Specific Components:**
- `<CriterionPhilosophy>` — Philosophy tab content
- `<CriterionMethodology>` — Methodology with diagrams
- `<CriterionPrinciples>` — Principles grid
- `<CriterionFramework>` — Framework accordions

### Performance Targets
- **Lighthouse Score:** 90+ (all categories)
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1

### Accessibility
- **WCAG 2.1 AA** compliance
- **Keyboard Navigation:** Full support
- **Screen Reader:** Semantic HTML, ARIA labels
- **Color Contrast:** 4.5:1 minimum
- **Focus Indicators:** Visible, 2px outline

### Internationalization (i18n)
- **Locales:** English (default), Spanish (future), Ukrainian (future)
- **Routing:** `/[locale]/` prefix
- **Content:** Per-locale markdown or CMS entries
- **Language Switcher:** Dropdown in navigation

### Scalability Considerations
**Subdivision Addition Process:**
1. Add entry to `subdivisions.json` config
2. Create route `/[locale]/[subdivision-slug]/`
3. Add card to home grid (auto-renders from config)
4. Add footer link (auto-renders from config)
5. Navigation mega-menu updates automatically

**Component Reusability:**
- All subdivision pages use same layout components
- Content-driven routing (no hardcoded paths)
- Dynamic imports for code splitting

### Deployment
- **Hosting:** Vercel (recommended) or Netlify
- **CDN:** Edge network for global performance
- **Analytics:** Plausible or Vercel Analytics (privacy-focused)
- **Monitoring:** Sentry for error tracking

### Implementation Prep
**Phase 1: Foundation**
- [ ] Set up Next.js project with TypeScript, Tailwind, Framer Motion
- [ ] Configure design system (colors, typography, spacing) in Tailwind config
- [ ] Create base layout components (Navigation, Footer, Container)
- [ ] Implement scalable navigation structure (mega-menu, mobile drawer)

**Phase 2: Home Page**
- [ ] Build Hero component with animated gradient
- [ ] Create SubdivisionCard component (glass morphism, hover effects)
- [ ] Implement StatsBar with animated counters
- [ ] Build "How It Works" section (Criterion focus)
- [ ] Add CTAs section

**Phase 3: Criterion Product Pages**
- [ ] Create tab navigation component (sticky on scroll)
- [ ] Build Philosophy tab content (cards, metrics)
- [ ] Build Methodology tab (diagrams, technical architecture)
- [ ] Build Principles tab (principle cards, quotes)
- [ ] Build Framework tab (accordions, interactive grids)

**Phase 4: Subdivision Pages**
- [ ] Create template for subdivision pages (scalable)
- [ ] Build BlackBox Dev pages (Services, Projects, About, Contact)
- [ ] Build Chartit360 portfolio page
- [ ] Add placeholder pages for Capital, Foundry, Signal

**Phase 5: Content Integration**
- [ ] Migrate content from `info.md` to markdown files or CMS
- [ ] Create content structure (JSON/config for subdivisions)
- [ ] Implement dynamic routing for subdivisions

**Phase 6: Polish & Performance**
- [ ] Add animations and transitions
- [ ] Optimize images (WebP, lazy loading)
- [ ] Implement SEO (meta tags, OG images, sitemap)
- [ ] Accessibility audit and fixes
- [ ] Performance optimization (code splitting, bundle size)

**Phase 7: Launch Prep**
- [ ] Set up analytics
- [ ] Configure domain and SSL
- [ ] Deploy to staging
- [ ] Final QA and testing
- [ ] Launch to production

## Component Library Specifications [draft]

### Navigation Components

#### Primary Navigation Bar
**Desktop:**
- **Height:** 80px (sticky on scroll, becomes 64px with shadow)
- **Background:** `rgba(10, 10, 15, 0.8)` with backdrop blur `blur(20px)`
- **Border:** Bottom border `1px solid rgba(255, 255, 255, 0.1)`
- **Layout:** 
  - Left: Expanova Group logo (40px height)
  - Center: Navigation links (Products, Ventures, Agency, Portfolio, About, Resources)
  - Right: "Try Criterion" CTA button + language switcher + mobile menu icon
- **Hover States:** Link underline animation (gradient, 2px height)
- **Active State:** Bold text + gradient underline
- **Mega-Menu:** 
  - Dropdown on hover (Products/Ventures/Agency)
  - Grid layout: 2-3 columns
  - Each subdivision: icon (24px), title, description (2 lines), "Explore" link
  - Background: `rgba(26, 26, 36, 0.95)` with backdrop blur
  - Border: `1px solid rgba(255, 255, 255, 0.1)`
  - Shadow: `0 8px 32px rgba(0, 0, 0, 0.4)`

**Mobile:**
- **Hamburger Menu:** 24px icon, opens slide-out drawer
- **Drawer:**
  - Width: 320px (slides from right)
  - Background: `#0A0A0F` with gradient overlay
  - Header: Logo + close button
  - Content: Accordion sections (Products, Ventures, Agency, etc.)
  - Footer: Language switcher + social links

#### Breadcrumbs
- **Location:** Below navigation, above page content
- **Style:** Small text (12px), muted color
- **Format:** `Home > Products > Criterion > Overview`
- **Separator:** `/` or `>` icon (8px)
- **Active:** Last item bold, gradient text

### Hero Components

#### Full-Width Hero
**Layout:**
- **Height:** 100vh (min-height: 600px)
- **Background:** Animated gradient mesh (`#00D4FF → #9D50FF → #FF6B35`)
- **Overlay:** Subtle grid pattern (20% opacity)
- **Content:** Centered, max-width 1200px
- **Padding:** 120px top, 80px bottom

**Elements:**
- **Headline:** 
  - Font: `clamp(3rem, 8vw, 6rem)`, weight 800
  - Gradient: `#FFFFFF → #00D4FF`
  - Text-shadow: `0 0 40px rgba(0, 212, 255, 0.5)`
  - Margin-bottom: 24px
- **Subheadline:**
  - Font: `clamp(1.125rem, 2vw, 1.5rem)`, weight 400
  - Color: `rgba(255, 255, 255, 0.8)`
  - Max-width: 800px, centered
  - Margin-bottom: 48px
- **CTA Buttons:**
  - Primary: Large (56px height), gradient background, glow effect
  - Secondary: Transparent, border, hover glow
  - Gap: 16px
  - Font: 16px, weight 600

**Visual Effects:**
- **Particle System:** Subtle floating particles (10-20, slow drift)
- **Grid Overlay:** Animated lines (pulse effect, 2s cycle)
- **Scroll Indicator:** Animated arrow at bottom (bounce, 1s cycle)

### Card Components

#### Subdivision Card
**Dimensions:**
- **Default:** 400px × 320px (desktop)
- **Aspect Ratio:** 5:4
- **Padding:** 32px
- **Border Radius:** 16px

**Visual Style:**
- **Background:** Glass morphism (`rgba(255, 255, 255, 0.05)`, `blur(20px)`)
- **Border:** `1px solid rgba(255, 255, 255, 0.1)`
- **Shadow:** `0 4px 16px rgba(0, 0, 0, 0.15)`

**Content Layout:**
- **Icon:** Top-left, 48px × 48px, subtle pulse animation
- **Badge:** Top-right (if Flagship/Portfolio) — small pill, gradient background
- **Title:** 24px, bold, gradient text, margin-top: 16px
- **Description:** 16px, `rgba(255, 255, 255, 0.7)`, 2-3 lines, margin-top: 12px
- **CTA:** Bottom, "Explore [Name]" with arrow icon, slides in on hover

**Hover State:**
- **Transform:** `scale(1.05)` + `translateY(-4px)`
- **Border:** Glow effect (`rgba(0, 212, 255, 0.5)`)
- **Shadow:** `0 8px 32px rgba(0, 212, 255, 0.3)`
- **Transition:** `all 0.3s ease-out`

#### Feature Card
**Dimensions:**
- **Default:** 320px × 280px
- **Padding:** 24px
- **Border Radius:** 12px

**Content:**
- **Icon:** Center-top, 56px × 56px, gradient background circle
- **Title:** 20px, bold, margin-top: 16px
- **Description:** 14px, muted, 3-4 lines, margin-top: 8px

**Hover:** Similar to Subdivision Card but lighter effect

#### Glass Card (Generic)
**Use Cases:** Stats, metrics, info panels
- **Background:** `rgba(255, 255, 255, 0.03)` with `blur(16px)`
- **Border:** `1px solid rgba(255, 255, 255, 0.08)`
- **Padding:** 24px
- **Border Radius:** 12px

### Button Components

#### Primary Button
**Default State:**
- **Height:** 48px (large: 56px, small: 40px)
- **Padding:** 16px 32px
- **Background:** Gradient (`#00D4FF → #9D50FF`)
- **Border:** None
- **Text:** White, 16px, weight 600
- **Border Radius:** 8px
- **Shadow:** `0 4px 16px rgba(0, 212, 255, 0.3)`

**Hover State:**
- **Shadow:** `0 8px 24px rgba(0, 212, 255, 0.5)`
- **Transform:** `translateY(-2px)`
- **Scale:** `1.02`

**Active State:**
- **Transform:** `scale(0.98)`
- **Shadow:** Reduced

#### Secondary Button
**Default State:**
- **Background:** Transparent
- **Border:** `2px solid rgba(0, 212, 255, 0.5)`
- **Text:** `#00D4FF`
- **Hover:** Border glow + background tint

#### Tertiary Button
**Default State:**
- **Background:** Transparent
- **Border:** None
- **Text:** White, underline on hover
- **Hover:** Gradient underline animation

### Input Components

#### Text Input
**Default State:**
- **Height:** 48px
- **Padding:** 12px 16px
- **Background:** `rgba(255, 255, 255, 0.05)`
- **Border:** `1px solid rgba(255, 255, 255, 0.1)`
- **Border Radius:** 8px
- **Text:** White, 16px
- **Placeholder:** `rgba(255, 255, 255, 0.4)`

**Focus State:**
- **Border:** `2px solid #00D4FF`
- **Glow:** `0 0 0 4px rgba(0, 212, 255, 0.1)`
- **Background:** Slightly lighter

**Error State:**
- **Border:** `2px solid #FF3B5C`
- **Glow:** `0 0 0 4px rgba(255, 59, 92, 0.1)`
- **Error Message:** Below input, red text, 12px

#### Textarea
- Same styling as Text Input
- **Min-height:** 120px
- **Resize:** Vertical only

### Modal/Overlay Components

#### Modal Window
**Container:**
- **Backdrop:** `rgba(0, 0, 0, 0.8)` with `blur(10px)`
- **Z-index:** 1000
- **Animation:** Fade in (300ms)

**Window:**
- **Width:** 90vw, max-width 600px (large: 800px)
- **Height:** Auto, max-height 90vh
- **Background:** `#1A1A24` with glass morphism
- **Border:** `1px solid rgba(255, 255, 255, 0.1)`
- **Border Radius:** 24px
- **Shadow:** `0 16px 64px rgba(0, 0, 0, 0.5)`
- **Padding:** 32px

**Header:**
- **Title:** 24px, bold, gradient
- **Close Button:** Top-right, 32px × 32px, hover glow

**Content:**
- **Padding:** 32px
- **Scroll:** Auto if content exceeds max-height

**Footer (if CTA needed):**
- **Border-top:** `1px solid rgba(255, 255, 255, 0.1)`
- **Padding:** 24px 32px
- **Buttons:** Right-aligned, gap 12px

### Tab Components

#### Tab Navigation (Sticky)
**Container:**
- **Height:** 64px (sticky on scroll)
- **Background:** `rgba(10, 10, 15, 0.95)` with backdrop blur
- **Border:** Bottom `1px solid rgba(255, 255, 255, 0.1)`
- **Z-index:** 100

**Tabs:**
- **Layout:** Horizontal, evenly spaced
- **Padding:** 16px 24px
- **Text:** 16px, weight 500
- **Color:** `rgba(255, 255, 255, 0.6)`

**Active Tab:**
- **Text:** White, weight 700
- **Underline:** Gradient (`#00D4FF → #FF6B35`), 3px height, animated slide
- **Indicator:** Smooth transition (300ms)

**Hover:**
- **Color:** White
- **Background:** Subtle tint

### Stats/Metrics Components

#### Stats Bar
**Container:**
- **Background:** Dark panel (`#121218`)
- **Border:** Top `1px solid rgba(255, 255, 255, 0.1)`
- **Padding:** 64px vertical, 32px horizontal

**Grid:**
- **Layout:** 4 equal columns (responsive: 2×2 on tablet, 1×4 on mobile)
- **Gap:** 32px

**Stat Item:**
- **Icon:** 32px, gradient color, top
- **Number:** 
  - Font: `clamp(2.5rem, 5vw, 4rem)`, weight 800, gradient text
  - Animated counter (on scroll into view)
- **Label:**
  - Font: 14px, uppercase, letter-spacing 0.05em
  - Color: `rgba(255, 255, 255, 0.6)`
  - Margin-top: 8px

### Accordion Components

#### Accordion Item
**Header:**
- **Height:** 64px
- **Background:** Glass card
- **Border:** `1px solid rgba(255, 255, 255, 0.1)`
- **Padding:** 16px 24px
- **Layout:** Title (left) + icon (right, rotates on expand)
- **Hover:** Background tint

**Content:**
- **Padding:** 24px
- **Background:** Slightly darker
- **Animation:** Height expand/collapse (300ms ease-out)
- **Text:** 16px, line-height 1.7

### Data Visualization Components

#### Interactive Grid (YC 10 Dimensions)
**Layout:**
- **Grid:** 5 columns × 2 rows (responsive: 2 columns on mobile)
- **Cell:**
  - Background: Glass card
  - Border: `1px solid rgba(255, 255, 255, 0.1)`
  - Padding: 16px
  - Hover: Glow border
- **Content:**
  - Label: 14px, bold
  - Value: 24px, gradient (if applicable)

#### Flow Diagram (Criterion Architecture)
**Visual Style:**
- **Connections:** Gradient lines (`#00D4FF → #FF6B35`)
- **Nodes:** Circular (80px), gradient background, icon inside
- **Labels:** Below nodes, 14px
- **Animation:** Nodes connect on scroll (staggered)

### Footer Component

**Container:**
- **Background:** `#0A0A0F` with subtle texture
- **Border:** Top `1px solid rgba(255, 255, 255, 0.1)`
- **Padding:** 80px vertical, 32px horizontal

**Grid:**
- **Layout:** 5 columns (responsive: 2 columns on tablet, 1 on mobile)
- **Gap:** 48px horizontal, 32px vertical

**Columns:**
1. **Expanova Group:**
   - Logo (32px height)
   - Tagline (14px, muted)
   - Social links (icons, 24px, gap 12px)
2-4. **Subdivision Links:**
   - Title (16px, bold, gradient)
   - Links (14px, muted, hover: white)
   - Gap: 8px between links
5. **Legal:**
   - Links (14px, muted)
   - Copyright (12px, muted)

**Bottom Bar:**
- **Border:** Top `1px solid rgba(255, 255, 255, 0.05)`
- **Padding:** 24px
- **Content:** Copyright + links (right-aligned)

## Open Questions
- Pricing strategy for Criterion (freemium, tiered, usage-based)?
- Blog content strategy (frequency, topics, authors)?
- Case study format (detailed pages vs. summaries)?

## Decisions Log
- 2025-11-05: For fund + studio + AI tools, Expanova is the parent brand; use Criterion as flagship product; grow sub-brands under the Expanova umbrella.

## Change Log
- 2025-11-05: Created info.md structure.
- 2025-11-05: Added Brand Architecture details and Portfolio: Chartit360 section with features, CTAs, testimonials, relationships, and references.
- 2025-11-05: Added Expanova Group Overview (initial integration from WF doc, non-contradictory only).
- 2025-11-05: Added Product: Criterion section with philosophy, methodology, principles, frameworks, tech, and CTA.
- 2025-11-05: Updated Brand Architecture with Agency Wing (BlackBox Dev).
- 2025-11-05: Expanded Product: Criterion with Owners, DOK4/DOK3 insights, Experts, Knowledge Tree, Solution Architecture, technical implementation, competition scoring, market strategy, success metrics, and risk boundaries.
- 2025-11-05: Searched and found no Spain/Spanish/Valencia/bureaucracy content to remove; added Implementation Prep checklist under Technical Notes.
- 2025-11-05: Cleaned ExpanovaHome.tsx - removed all Spanish bureaucracy content, replaced with Expanova Group/Criterion structure ready for implementation. Removed BuroChatWidget and TaskDashboard imports/references.
- 2025-11-05: Created comprehensive website design system - Information Architecture (scalable navigation), Page Blueprints (Home, Criterion), Brand & Visual Language (colors, typography, spacing, animations), Component Library Specifications (detailed UI components with dimensions, states, animations), Content Assets list, Technical Notes (routing, components, performance), and Implementation Prep checklist (7 phases).


