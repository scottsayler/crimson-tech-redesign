# Editorial Worksheet

## Article

Restaurant Technology Standardization

---

## Library Context

This article is step 2 in the **Restaurant Operations Playbook** learning path (`restaurant-operations`, order 2). It sits in the **Restaurant Technology** topic cluster under the **Operations** library category.

Its job is not to explain who owns vendor relationships, what to do during an outage, how to design VLANs, or how to sequence opening-day tasks. Those decisions live in other articles. This article owns the portfolio-level question of **what every restaurant location should look like once leadership knows who the vendors are** — and whether the organization should invest in a governed store blueprint before the next wave of openings, acquisitions, or retrofit projects.

Many readers will arrive here directly from **Restaurant Vendor Sprawl**, which ends with governance clarity: named owners, a maintained inventory, and an approved vendor list by category. Vendor Sprawl answers *who owns our technology environment*. This article answers *what should every location look like once that ownership is clear*.

The Connectivity path runs in parallel. Readers who start from **Restaurant Internet Outages** or **Restaurant Network Visibility** may reach standardization after discovering that inconsistent store builds make outages harder to diagnose and recovery slower. Link to those articles for the failure moment; this article explains why ten stores from the same brand behave like ten different networks.

---

## Purpose

**Should we invest in defining and governing a repeatable store technology blueprint — and in what order: document what exists today, standardize new openings first, or launch a fleet-wide retrofit?**

This is a leadership decision about operational predictability, not a procurement exercise. The article helps an executive decide whether configuration variation is their problem right now, what belongs in a written standard, and which rollout sequence fits their footprint — before anyone orders routers, hires an integrator, or reopens network architecture.

---

## This Article Owns

The concepts this article should become the authoritative resource for.

- **Store variation as accumulated operational debt** — how independent technology choices across openings, acquisitions, franchisee autonomy, remodels, and emergency replacements create a fleet nobody can support, secure, or open consistently
- **The standard store blueprint** — what a written, governed technology specification includes (POS build, Wi-Fi posture, security baseline, cabling expectations, format-specific requirements) and what it deliberately leaves to network and carrier articles
- **Blueprint before rollout** — why publishing a standard without first documenting what each location actually runs today produces a fantasy document that auditors, franchisees, and help desks cannot use
- **Format templates, not identical stores** — how drive-thru, full-service, ghost kitchen, and acquired formats share a governed decision process while differing in terminal count, bandwidth, and coverage
- **New-first vs retrofit sequencing** — why better operators stop variation at the next opening before attempting fleet-wide remediation, and how to prioritize legacy stores by risk, lease events, and refresh cycles
- **The Assess → Document → Rationalize → Publish → Govern framework** — the operating sequence for turning today's messy fleet into tomorrow's repeatable builds; distinct from Vendor Sprawl's Discover → Inventory → Standardize → Govern, which governs *relationships*, not *configurations*
- **Exception governance for technology builds** — who approves a store that deviates from the blueprint, how exceptions are documented, and how local workarounds stop becoming the undeclared standard
- **What belongs in the blueprint vs what gets referenced** — the boundary between "every store of this format runs POS on a segmented path with these minimum controls" (owned here) and "here is how to VLAN, failover-test, and select carriers" (owned elsewhere)
- **Blueprint maintenance and refresh cadence** — standards go stale when POS platforms change, PCI expectations shift, or nobody owns updating the document after the last project
- **Acquisition and franchise measurement** — how to score inherited or franchisee-built stores against one blueprint instead of negotiating store by store under pressure
- **When standardization is not the problem** — small stable footprints, a single bad rollout, or vendor performance issues that governance and replacement solve faster than a blueprint program

---

## This Article Does NOT Own

Topics that belong to other articles.

Mention briefly.

Link instead of repeating.

- **Vendor ownership, escalation contacts, contract calendars, approved vendor list by category** → Restaurant Vendor Sprawl
- **What staff should do in the first five minutes of an outage** → Restaurant Internet Outages
- **What actually breaks when connectivity fails** (cards, kitchen tickets, delivery tablets, offline card rules) → Restaurant Internet Outages
- **Whether headquarters can see store health before managers call** → Restaurant Network Visibility
- **Network architecture implementation** (VLAN design, backup circuit wiring, failover testing procedure, SD-WAN evaluation) → Restaurants Networking
- **Carrier selection, dual-ISP design, LTE backup product patterns** → Best Internet for Restaurants
- **Opening-day sequencing, circuit lead times, go-live sign-off, opening-week escalation runbooks** → Restaurant Opening Technology Checklist
- **POTS line inventory, alarm dialer replacement, life-safety sign-off** → Restaurant POTS Replacement
- **Network readiness checklist as a field tool** → Restaurant Network Checklist
- **Independent advisory methodology for vendor evaluation** → Independent Technology Advisory (general path, not restaurant-specific)

---

## Reader Arrives Because...

What operational situation caused someone to search for this topic?

- A help desk ticket that should take ten minutes takes forty-five because the technician has to relearn this store's router, POS build, and network layout from scratch while the lunch rush is on
- Leadership finished vendor governance work and asked IT for "the standard store" — and nobody can produce a written specification, only a whiteboard sketch from a project two years ago
- A PCI or security review finds different firewall rules, VLAN postures, or access configurations at stores that are supposed to be the same brand
- Store openings keep requiring custom technology decisions because there is no blueprint a development team or franchisee can follow without calling IT
- An acquisition closed and integration planning stalled because there is no document to measure inherited stores against
- Support ticket volume is growing faster than store count, and resolution time correlates with how many different configurations are in the field
- A franchise compliance review finds locations that meet the letter of the agreement but deploy different POS builds, Wi-Fi gear, or security setups
- Finance approved an expansion target leadership cannot support operationally because every new store reinvents the technology stack
- Someone conflated "we picked standard vendors" (Vendor Sprawl) with "every store is built the same way" (this article) and discovered the gap during the first opening after consolidation

---

## Reader Leaves Knowing...

After reading this article, what should they understand that they didn't before?

- Store variation is a **support, security, and opening predictability problem** that accumulates quietly — not a problem that appears only when someone counts router models
- **Document what exists before you publish what should be** — a blueprint nobody can map to today's fleet is a slide deck, not a standard
- **Standardization is not sameness** — format templates with governed exceptions beat forcing identical equipment at every site
- **Stop the bleeding at the next opening** — new-first standardization is how growing brands keep variation from compounding while a retrofit plan catches up
- **Vendor clarity and build clarity are sequential decisions** — approved vendors tell you who to call; the blueprint tells them what to deploy
- **Exceptions need owners and a review cadence** — undocumented local fixes recreate sprawl inside a "standardized" brand
- The next decision after a blueprint exists is **how to apply it at opening** (Opening Checklist) and **how to implement the network layer** (Restaurants Networking, Best Internet) — not hiring another consultant to rediscover what each store runs today

---

## Editorial Promise

Finish this sentence.

"This article will never become..."

...a router shopping guide, a VLAN configuration manual, an opening-day runbook, or a ranked list of integrators to hire. It teaches executives how to decide whether a store technology blueprint is warranted, what belongs in it, and in what rollout order — then points to networking, connectivity, and opening articles for the implementation decisions that follow.

---

## Primary Observation

What common assumption does this article challenge?

One sentence.

**Standardization means picking one router and one POS model for every store — when in practice operators need a written blueprint and format templates that govern how each store type is built, not identical equipment regardless of format.**

---

## Operational Story

Describe the real-world operational situation that anchors this article.

Think in scenes.

**Primary scene — the help desk call that should not take this long:**

It is 12:15 p.m. at a 35-location fast-casual brand. A store reports that kitchen tickets are stalling. The help desk technician opens the ticket expecting a familiar layout — same firewall, same POS build, same Wi-Fi map as the store they fixed yesterday. Instead they find a different router model, a POS VLAN configured unlike any diagram IT has on file, and a franchisee-procured access point nobody documented. The store manager is trying to run lunch while answering questions about equipment the technician has never seen. The issue turns out to be simple. The forty minutes before anyone finds it are not.

**Secondary scene — the audit that should not be a surprise:**

A PCI assessor walks three stores from the same brand. Store one segments POS from guest Wi-Fi the way IT remembers. Store two has a flat network from a remodel three years ago. Store three — an acquired location never brought current — still runs the predecessor company's firewall rules. Leadership thought the fleet was standardized because vendors were consolidated last year. Nobody standardized what those vendors actually installed.

**Tertiary scene — the opening that reinvents everything:**

Development signs a new lease. Someone asks for the technology package. IT sends a PDF from a 2019 opening that does not mention the current POS platform, the backup path standard, or the security baseline franchise legal approved last quarter. The project manager schedules three calls to "figure out what this store needs." The next ten openings will do the same unless someone publishes a blueprint the field can follow without a meeting.

The article stays in these scenes. It does not drift into carrier comparisons, failover test scripts, or opening-week circuit timelines until the operational cost of variation is visceral.

---

## Major Sections

List only.

No content.

1. Opening observation — ten stores, ten configurations (impact cascade)
2. Why store variation becomes an operational problem — support time, security scope, opening friction
3. How variation actually accumulates — openings without a blueprint, acquisitions, franchisee builds, emergency replacements, stale standards
4. The five biggest mistakes we see — publishing a standard before documenting reality, identical-everywhere thinking, whiteboard-only blueprints, retrofitting the whole fleet at once, standards with no owner or refresh cadence
5. What better operators do differently — Assess, Document, Rationalize, Publish, Govern; new-first vs phased retrofit
6. What belongs in the blueprint — format templates, minimum controls, and what to link out to network and carrier articles
7. Standardization paths by footprint — document-and-maintain, new-openings-first, dedicated program, franchise minimum standard, acquisition measurement window
8. Questions to ask before hiring an integrator or launching a retrofit program
9. Executive takeaways and decision FAQs

---

## Executive Takeaway

If an executive remembers one sentence six months later, what should it be?

**You cannot support, secure, or open stores predictably from memory — you need a written blueprint for how each store type is built, and every new opening should follow it before you fix the rest of the fleet.**

---

## Read Before

Which article naturally comes before this one?

**Primary path (Restaurant Operations Playbook):** **Restaurant Vendor Sprawl** — readers should understand who owns vendor relationships, what the approved vendor list is, and that inventory of *relationships* comes before standardization of *builds*. This article assumes governance clarity or at minimum acknowledges that blueprint work without vendor ownership still leaves escalation gaps.

**Cross-path entry (Connectivity cluster):** **Restaurant Internet Outages** or **Restaurant Network Visibility** — when the reader's trigger was slow outage recovery or inconsistent failure modes across stores. Link for the failure moment; this article explains why inconsistent builds made diagnosis harder. Do not require completing the Connectivity path first.

Readers who completed Vendor Sprawl should arrive here expecting to define *what approved vendors deploy*, not to re-litigate *who the vendors are*.

---

## Read Next

Which article naturally follows this one?

**Restaurant Opening Technology Checklist** — once leadership has a blueprint, the next decision is how to apply it through the opening pipeline: sequencing, sign-off, testing, and go-live accountability.

**Secondary natural follow-on:** **Restaurants Networking** — for readers ready to implement the network layer of the blueprint (segmentation, backup paths, remote visibility) after the standard is defined at the executive level.

Do not send readers to Best Internet for Restaurants or Opening Checklist before they understand what the standard store is supposed to include. Blueprint first, implementation paths second.

---

## Internal Links

Which restaurant articles should this page link to instead of repeating?

- **Restaurant Vendor Sprawl** — vendor ownership, approved vendor list, governance sequence that precedes blueprint work
- **Restaurant Opening Technology Checklist** — applying the blueprint through opening sequencing, go-live sign-off, and opening-week testing
- **Restaurants Networking** — network architecture, VLAN implementation, failover design, SD-WAN evaluation
- **Best Internet for Restaurants** — carrier and circuit decisions within the blueprint's connectivity requirements
- **Restaurant Network Visibility** — monitoring and store-health visibility after builds are consistent enough to alert meaningfully
- **Restaurant Internet Outages** — why variation lengthens outage diagnosis; link, do not re-teach response playbooks
- **Restaurant POTS Replacement** — life-safety and analog line standards as one blueprint line item
- **Restaurant Network Checklist** — field checklist for network readiness; reference when discussing audit and retrofit prioritization

Tools to reference at decision guidance (not teach in body): Network Assessment.

---

## Overlap Check

List ideas already owned by another article that should not be repeated here.

- **Vendor inventory, escalation ownership, contract calendars, MSP/TEM governance** — owned by Restaurant Vendor Sprawl; at most one sentence acknowledging blueprint work follows vendor clarity, plus link
- **Approved vendor list by category as a governance artifact** — owned by Vendor Sprawl; this article references approved vendors only as the parties who implement the blueprint
- **The first-five-minutes outage playbook** — owned by Restaurant Internet Outages
- **Detailed cascade of what breaks when internet fails** — owned by Restaurant Internet Outages
- **ISP portal green lights vs store operational health** — owned by Restaurant Network Visibility
- **Monitoring dashboards, alert ownership, outage history by site** — owned by Restaurant Network Visibility
- **VLAN segmentation implementation, single-circuit risk, SD-WAN evaluation criteria, failover test procedure** — owned by Restaurants Networking
- **Carrier selection, dual-ISP design, LTE backup product patterns** — owned by Best Internet for Restaurants
- **Opening-day circuit timelines, go-live sign-off, franchise opening certification, opening-week escalation runbooks** — owned by Restaurant Opening Technology Checklist
- **POTS line inventory and life-safety sign-off mechanics** — owned by Restaurant POTS Replacement
- **Generic technology stack bullet lists** without operational framing — current article artifact; replace with blueprint-boundary examples or cut
- **Procurement-style structures** (When to evaluate / When to wait / Alternatives / Decision matrix / Technology stack / Buying triggers / Buying trigger timeline / Top challenges / Common priorities / Evidence) — compress into observational narrative; these read unlike the Restaurant Internet Outages benchmark voice
- **Evidence stats framed as proof points** ("standardized openings go live faster," "support costs track configuration variance") — rewrite as observational field notes if retained at all, or cut; the benchmark earns trust through scenes, not case study metrics
- **Discover → Inventory vendor framework** — owned by Vendor Sprawl; this article uses Assess → Document → Rationalize → Publish → Govern for *configurations and builds*, not vendor relationships
- **Detailed network design prescriptions** (minimum viable network, SD-WAN thresholds) — owned by Restaurants Networking; this article states what the blueprint must require, not how to wire it

---

## Rewrite Notes for Future Editors

The current production article mixes a strong opening observation with template structures (When to evaluate / When to wait / Alternatives / Decision matrix / Technology stack / Buying triggers / Evidence) that read unlike the Restaurant Internet Outages benchmark. The rewrite should:

- Open with an operational scene, not a definition paragraph or consulting evaluation headline
- Follow article anatomy from `docs/playbook/article-anatomy.md`: observation → operational impact → what actually happens → patterns → what better operators do → decision guidance
- Use the Assess → Document → Rationalize → Publish → Govern framework as the article's spine, explicitly distinguishing it from Vendor Sprawl's relationship-governance sequence
- Treat integrators and managed rollout partners as execution options, not parallel "product alternatives"
- Keep franchise and acquisition causes because they are core to how variation accumulates — but link network implementation to Restaurants Networking and opening application to Restaurant Opening Technology Checklist
- Preserve the insight that format templates matter more than identical equipment — that is this article's signature idea
- State clearly what belongs in the blueprint at the category level (POS build, Wi-Fi posture, security baseline) without teaching VLAN design or carrier selection
- End with executive decision clarity on rollout sequencing (new-first vs retrofit), not FAQ SEO blocks — though short decision FAQs are acceptable if they sound like the reference article's closing questions
- Do not re-teach vendor governance; assume readers came from Vendor Sprawl or link back for readers who skipped it

**Boundary test for future edits:** If a section could be retitled "Best Routers for Restaurants" or "How to Configure VLANs" without breaking the editorial promise, it belongs in another article.

**Relationship to Vendor Sprawl:** Vendor Sprawl's "Standardize" step sets the approved vendor list. This article's "Publish" step defines what those vendors deploy. Keep that boundary sharp in prose and cross-links.

---

## Success Test

The article is complete when:

- It follows the Crimson Technology Playbook.
- It sounds like the same author as Restaurant Internet Outages.
- Every section introduces a new idea.
- Operations come before technology.
- It teaches a decision framework rather than describing products.
- The article owns its topic without unnecessary overlap.
- A reader who also read Restaurant Vendor Sprawl understands the difference: Vendor Sprawl owns who the vendors are; Technology Standardization owns what every store should look like once that is clear.
- A reader who finishes this article knows to read Restaurant Opening Technology Checklist next — not Restaurants Networking first, and not back to vendor consolidation.
- No section could be retitled "Restaurant Network Design" or "Opening Day Circuit Ordering" without breaking the editorial promise.
