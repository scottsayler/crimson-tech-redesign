# Editorial Worksheet

## Article

Restaurant Vendor Sprawl

---

## Library Context

This article is the entry point for the **Restaurant Operations Playbook** learning path (`restaurant-operations`, order 1). It sits in the **Restaurant Technology** topic cluster under the **Operations** library category.

Its job is not to explain what breaks during an outage, how to design a store network, or how to standardize equipment. Those decisions live in the Connectivity path. This article owns the portfolio-level question of **who is accountable for which vendor relationships across locations** — and whether the organization should invest in governance before it starts consolidating contracts.

Many readers will arrive here after living through the scene described in Restaurant Internet Outages: a multi-vendor conference call during service with nobody who can name the owner. That article explains what to do in the first five minutes. This article explains why that call happened in the first place, and what leadership should put in place so the next incident has an owner before the register goes dark.

---

## Purpose

**Should we invest in vendor governance — starting with a location-by-location inventory and named escalation ownership — before we consolidate contracts, hire an MSP, or launch a cost-reduction initiative?**

This is a leadership decision about operational control, not a procurement exercise. The article helps an executive decide whether sprawl is their problem right now, what order to tackle it in, and which governance model fits their footprint.

---

## This Article Owns

The concepts this article should become the authoritative resource for.

- **Vendor sprawl as accumulated governance debt** — how independent vendor choices across openings, acquisitions, franchisee autonomy, and emergency replacements create a portfolio nobody can describe from memory
- **Ownership before consolidation** — why reducing vendor count without a single accountable owner for outages, contracts, and renewals does not solve sprawl; it hides it
- **The escalation ownership problem** — who runs the call when the ISP, POS vendor, MSP, and alarm company could all plausibly be at fault, and nobody upstairs can produce a current contact list for that site
- **Location-by-location vendor inventory as the mandatory first step** — what the inventory must include (vendor, category, contract, renewal date, escalation contact, franchise vs corporate procurement) before any consolidation conversation
- **The Discover → Inventory → Standardize → Govern framework** — the operating sequence better operators follow, and why skipping Discover is how consolidation projects fail
- **Governance models by footprint** — when to maintain current relationships with documentation, consolidate by category, add an MSP overlay, use TEM for billing visibility, or build an internal vendor governance function
- **Franchise vendor exception process** — minimum approved vendor standards, who approves local exceptions, and how exceptions stop becoming the default
- **Acquisition vendor integration** — the 90-day inventory window after close, before renewal deadlines lock in inherited contracts
- **Sprawl triggers that are not finance** — outage response time, store opening friction, security audit gaps, and franchise compliance reviews as leading indicators, not just invoice volume
- **When sprawl is not the problem** — small stable footprints, single underperforming supplier, or organizations that have not yet inventoried what they have

---

## This Article Does NOT Own

Topics that belong to other articles.

Mention briefly.

Link instead of repeating.

- **What staff should do in the first five minutes of an outage** → Restaurant Internet Outages
- **What actually breaks when connectivity fails** (cards, kitchen tickets, delivery tablets, offline card rules) → Restaurant Internet Outages
- **Whether headquarters can see store health before managers call** → Restaurant Network Visibility
- **Network architecture** (VLANs, backup circuits, failover testing, SD-WAN) → Restaurants Networking, Best Internet for Restaurants
- **The standard store technology blueprint** (router models, POS builds, segmentation policy) → Restaurant Technology Standardization
- **Opening-day technology sequencing and go-live sign-off** → Restaurant Opening Technology Checklist
- **POTS and alarm line replacement mechanics** → Restaurant POTS Replacement
- **Carrier selection and circuit redundancy design** → Best Internet for Restaurants
- **Independent advisory methodology for vendor evaluation** → Independent Technology Advisory (general path, not restaurant-specific)

---

## Reader Arrives Because...

What operational situation caused someone to search for this topic?

- A lunch-hour outage turned into a three- or four-vendor conference call while the store manager ran cash-only, and nobody on the IT team could produce who supported connectivity, POS, or alarms at that site
- A new CIO or IT director inherited 20–200 locations with no documented vendor list, scattered contracts, and no renewal calendar
- Finance flagged telecom and technology spend growing faster than store count, and leadership asked for a consolidation plan before anyone knew what was actually deployed
- An acquisition closed with stores on unfamiliar carriers, alarm companies, and MSP relationships nobody has mapped
- A franchise audit found locations running unapproved ISPs, Wi-Fi gear, or security providers outside corporate contracts
- Accounts payable is processing invoices from a dozen or more technology and telecom suppliers each month, and nobody can reconcile vendor to location to contract
- Store openings keep reinventing vendor selection because there is no approved list by category
- Board or leadership made outage response time a recurring concern after repeated incidents where escalation took hours

---

## Reader Leaves Knowing...

After reading this article, what should they understand that they didn't before?

- Vendor sprawl is an **ownership and governance problem** that often shows up on a spend report — not primarily a cost problem that consolidation alone fixes
- **Inventory comes before consolidation** — you cannot govern, standardize, or negotiate from what you cannot name
- **Vendor count is the wrong metric** — the right questions are whether every vendor has a documented owner, a clear escalation path, and a tracked renewal date
- **Consolidation without ownership** creates a smaller list with the same confusion during the next outage
- Better operators eliminate **uncertainty and handoffs**, not necessarily every supplier
- The next decision after governance clarity is **what to standardize** (technology blueprint), not which single mega-vendor to hire
- Their footprint determines the governance model: document-and-maintain for small stable operators; inventory-then-consolidate-by-category for growing regional chains; formal governance office for large multi-state brands; published minimum standards with exception process for franchise systems

---

## Editorial Promise

Finish this sentence.

"This article will never become..."

...a vendor consolidation RFP template, a telecom expense audit checklist, or a ranked list of MSPs to hire. It teaches executives how to decide whether governance investment is warranted and in what order — then points to standardization, connectivity, and opening articles for the technical decisions that follow.

---

## Primary Observation

What common assumption does this article challenge?

One sentence.

**Reducing vendor count fixes vendor sprawl — when in practice, consolidation without named ownership and a maintained inventory just makes the same escalation problem harder to see.**

---

## Operational Story

Describe the real-world operational situation that anchors this article.

Think in scenes.

**Primary scene — the outage conference call:**

It is lunch on a Tuesday at a 40-location QSR brand. The circuit drops — or something does; the room is not sure yet. The store manager switches to cash-only. Cards time out. Online tickets keep landing. Someone calls the ISP. The POS vendor joins. The MSP is on hold. The alarm company's number is on a sticky note that predates the last remodel. Forty-five minutes in, the expensive part is not the dark circuit. It is that four companies are on the phone and nobody from headquarters can answer the simplest question: *who owns this store's technology relationships right now?*

**Secondary scene — the inherited mess:**

A new IT director starts Monday. By Wednesday, leadership wants a cost reduction plan. Finance hands over 300 monthly technology and telecom invoices. Someone asks for the vendor list. There isn't one — not one that a new hire, an auditor, or a store manager could actually use during an incident.

**Tertiary scene — the acquisition:**

Six stores close. Day one, nobody knows which alarm monitoring company the acquired locations use, when those contracts renew, or whether franchisees in the legacy system had authority to pick their own ISP. Renewal deadlines start ticking before integration planning begins.

The article stays in these scenes. It does not drift into architecture diagrams or product categories until the operational cost of sprawl is visceral.

---

## Major Sections

List only.

No content.

1. Opening observation — the conference call with no owner (impact cascade)
2. Why vendor sprawl becomes an operational problem — handoffs, not invoices
3. How sprawl actually accumulates — openings, acquisitions, franchisee decisions, emergency replacements
4. The five biggest mistakes we see — consolidating before inventory, counting vendors instead of owners, letting franchise exceptions become defaults, scattered renewal calendars, shopping for an MSP before confirming what exists today
5. What better operators do differently — Discover, Inventory, Standardize, Govern
6. Governance paths by footprint — when to document, consolidate by category, add MSP/TEM, or build internal governance
7. Questions to ask before hiring a consolidator, MSP, or TEM partner
8. Executive takeaways and decision FAQs

---

## Executive Takeaway

If an executive remembers one sentence six months later, what should it be?

**You do not have a vendor problem — you have an ownership problem — and the first fix is an honest inventory of who supports every location, not a shorter vendor list.**

---

## Read Before

Which article naturally comes before this one?

**Primary path (Restaurant Operations Playbook):** No required predecessor. This article is the operations path entry point. Readers arriving via finance, acquisition, or franchise audit can start here directly.

**Cross-path entry (Connectivity cluster):** Restaurant Internet Outages — when the reader's trigger was a multi-vendor escalation during service and they need to understand why nobody owned the call. Link to Internet Outages for what to do in the moment; this article explains the structural cause.

Do not require readers to complete the Connectivity path first. Operations and Connectivity are parallel concerns that intersect at the outage conference call.

---

## Read Next

Which article naturally follows this one?

**Restaurant Technology Standardization** — once leadership knows who the vendors are and who owns each relationship, the next decision is what those vendors should deploy: the repeatable store blueprint for network, POS, Wi-Fi, and security.

Secondary natural follow-on: **Restaurant Opening Technology Checklist** — for readers whose immediate pain is new stores inheriting ad hoc vendor choices; apply the approved vendor list and governance process to the opening pipeline.

---

## Internal Links

Which restaurant articles should this page link to instead of repeating?

- **Restaurant Internet Outages** — outage response, first-five-minutes playbook, what breaks during service
- **Restaurant Network Visibility** — monitoring ownership, seeing store health before managers call
- **Restaurant Technology Standardization** — the standard store blueprint after governance is clear
- **Restaurant Opening Technology Checklist** — applying vendor standards at go-live
- **Restaurants Networking** — network design and segmentation (reference when discussing approved connectivity vendors)
- **Best Internet for Restaurants** — carrier and redundancy decisions after standards exist
- **Restaurant POTS Replacement** — example of a vendor category that hides in sprawl (alarm lines nobody can trace)

Tools to reference at decision guidance (not teach in body): Vendor Consolidation Calculator, Network Assessment.

---

## Overlap Check

List ideas already owned by another article that should not be repeated here.

- **The first-five-minutes outage playbook** — owned by Restaurant Internet Outages; at most one sentence plus link
- **Detailed cascade of what breaks when internet fails** (cards, kitchen screens, delivery tablets, offline declines) — owned by Restaurant Internet Outages
- **"Buying faster internet before fixing design"** and backup failover testing during rush — owned by Restaurant Internet Outages and Best Internet for Restaurants
- **ISP portal green lights vs store operational health** — owned by Restaurant Network Visibility
- **Monitoring dashboards, alert ownership, outage history by site** — owned by Restaurant Network Visibility
- **VLAN segmentation, single-circuit risk, SD-WAN evaluation criteria** — owned by Restaurants Networking
- **Carrier selection, dual-ISP design, LTE backup patterns** — owned by Best Internet for Restaurants
- **Standard store blueprint** (router models, POS builds, firewall rules, PCI scope) — owned by Restaurant Technology Standardization
- **Opening-day circuit timelines, go-live sign-off, franchise opening certification** — owned by Restaurant Opening Technology Checklist
- **POTS line inventory and life-safety sign-off** — owned by Restaurant POTS Replacement
- **Generic technology stack bullet lists** without operational framing — current article artifact; remove or replace with governance-oriented examples
- **Procurement-style decision matrices and "alternatives" tables** (TEM vs MSP vs consolidation as product categories) — compress into governance framing; avoid template tone that contradicts the Internet Outages benchmark voice
- **Evidence stats framed as proof points** ("reduced invoices from 300 to four," "two-thirds cost reduction") — rewrite as observational field notes if retained at all, or cut; the benchmark article earns trust through scenes, not case study metrics
- **Duplicate outage conference call narrative** — keep one anchoring scene here; do not re-teach outage response mechanics owned elsewhere

---

## Rewrite Notes for Future Editors

The current production article mixes strong governance ideas with template structures (When to evaluate / When to wait / Alternatives / Decision matrix / Technology stack / Buying triggers) that read unlike the Restaurant Internet Outages benchmark. The rewrite should:

- Open with an operational scene, not a consulting evaluation headline
- Follow article anatomy from `docs/playbook/article-anatomy.md`: observation → operational impact → what actually happens → patterns → what better operators do → decision guidance
- Use the Discover → Inventory → Standardize → Govern framework as the article's spine, not a footer list
- Treat consolidation, MSP, and TEM as governance outcomes, not parallel "product alternatives"
- Keep franchise and acquisition causes because they are core to sprawl — but link standardization details to Restaurant Technology Standardization
- Preserve the insight that operators notice faster outage resolution before cost savings — that belongs here, stated as observation, not as evidence bullet
- End with executive decision clarity, not FAQ SEO blocks — though short decision FAQs are acceptable if they sound like the reference article's closing questions

---

## Success Test

The article is complete when:

- It follows the Crimson Technology Playbook.
- It sounds like the same author as Restaurant Internet Outages.
- Every section introduces a new idea.
- Operations come before technology.
- It teaches a decision framework rather than describing products.
- The article owns its topic without unnecessary overlap.
- A reader who also read Restaurant Internet Outages understands the difference: Internet Outages owns the moment of failure; Vendor Sprawl owns why nobody owned the call.
- A reader who finishes this article knows to read Restaurant Technology Standardization next — not Restaurants Networking or a consolidator's website.
- No section could be retitled "Best MSPs for Restaurants" or "How to Negotiate Telecom Contracts" without breaking the editorial promise.
