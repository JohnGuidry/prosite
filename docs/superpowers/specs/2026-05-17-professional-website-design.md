# Design Spec: John Guidry's Professional "Evolver" Website

**Date:** 2026-05-17
**Status:** Draft
**Author:** Gemini CLI

## 1. Vision & Goals
Create a professional, modern website for John Guidry that serves as both a brief "Living Resume" for quick scanning and a deep "Project Showcase" for technical validation.

### Core Branding: "The Evolver"
John is a **Technical Builder with Real-World Proof**. The site must bridge his 9+ years of enterprise reliability (SQL Server, C#, .NET) with his current evolution into AI Agent Development and Automation.

## 2. Information Architecture
The site is a **Single-Page Interactive Application**.

### Sections:
1.  **Hero:** Name, Headline, and Transition Narrative.
2.  **Interactive Timeline:** Brief professional experience with "Deep Dive" buttons.
3.  **Project Grid:** Showcase of key builds (WoW Manager, Research, Bots).
4.  **Technical Proof (Drawer/Modal):** High-density technical context pulled from `article-digest.md`.
5.  **Footer:** Contact links, GitHub/LinkedIn, and "Last Updated" timestamp.

## 3. Visual Design (Modern Tech / Dark)
*   **Theme:** Deep Charcoal (`#0f172a`) background with Slate text (`#f8fafc`).
*   **Accents:** Electric Blue (`#38bdf8`) for primary actions and markers.
*   **Typography:**
    *   Body: Sans-serif (Inter/System Default).
    *   Accents/Tags: Monospace (Fira Code/JetBrains Mono).
*   **Components:**
    *   Glassmorphism cards for projects.
    *   Neon-accented vertical timeline.
    *   Subtle SVG data-flow background in the Hero.

## 4. Content Strategy
*   **Headline:** "Full-Stack Engineer & Database Specialist"
*   **Sub-headline:** "Bridging enterprise reliability with modern AI automation. Currently evolving data workflows into agentic systems."
*   **Experience:**
    *   *KinderSystems:* Focus on ETL/SSIS and Client-facing technical value.
    *   *SECU:* Focus on HA/DR (AlwaysOn AG) and Compliance.
    *   *PCG:* Focus on SDLC leadership and performance.
*   **Projects:**
    *   WoW Addon Manager (Python/API).
    *   Beat Tracking Android App (Java/Signal Processing).
    *   COVID19_BOT (Python/Discord).
    *   AWS Personal Site (ASP.NET/RDS).

## 5. Technical Stack (Proposed)
*   **Frontend:** React (TypeScript) for interactive components.
*   **Styling:** Vanilla CSS (per user preference for maximum flexibility).
*   **Deployment:** Static site (GitHub Pages or similar).

## 6. Self-Review
1.  **Placeholder Scan:** No "TBD" sections. All data sources identified (`cv.md`, `article-digest.md`, `profile.yml`).
2.  **Consistency:** Visual style (Modern Tech) matches the "Evolver" narrative.
3.  **Scope Check:** Focused on a single page; well-bounded for a prototype.
4.  **Ambiguity Check:** Interactive "Deep Dive" behavior defined as a side drawer or modal to prevent page reloads.

## 7. Next Steps
1.  User Review of this Spec.
2.  Invoke `writing-plans` skill to create the implementation plan.
