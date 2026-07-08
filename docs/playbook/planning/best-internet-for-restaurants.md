# Editorial Worksheet

## Article

Best Internet for Restaurants

---

## Library Context

This article is step 4 in the **Restaurant Connectivity Playbook** learning path (`restaurant-connectivity`, order 4). It also serves as the natural procurement follow-on for readers who completed **Restaurants Networking** on the **Restaurant Operations Playbook** path (order 2.5 crossover — after standardization and network architecture, before visibility or opening execution).

It sits in the **Connectivity & Resilience** topic cluster under the **Connectivity** library category, in the "Network design & carriers" section alongside Restaurants Networking.

Its job is not to explain who owns vendor relationships, what staff do in the first five minutes of an outage, how to VLAN a store, whether headquarters can see store health, how to sequence opening-day tasks, or how to replace alarm dialers. Those decisions live in other articles. This article owns the portfolio-level question of **what connectivity should support an already-defined network architecture** — once leadership knows how the standard restaurant is wired and before anyone renews a carrier contract, orders circuits for a new opening, or scales backup across the fleet.

Many readers will arrive here directly from **Restaurants Networking**, which ends with a reference architecture that states what primary and backup paths must do — segmented payment path, tested failover role, format-specific sizing — without teaching which carriers to order. Networking answers *how that standard store should actually be architected*. This article answers *what connectivity should support that architecture*.

Readers on the Connectivity path may arrive after **Restaurant Internet Outages** with a more urgent trigger: a lunch-hour failure traced to single-circuit dependency, a franchisee on an unapproved ISP, or leadership asking for "better internet" when the real gap is redundancy. Link to Internet Outages for the failure moment and response playbook; this article explains how to make better buying decisions so the next outage is survivable — not how to run the store when the circuit is already dark.

Readers who skipped Networking should still be able to use this article if they have a written connectivity requirement (from Technology Standardization's blueprint or an integrator's scope). If they have neither architecture nor blueprint, link back to Restaurants Networking before they sign contracts.

---

## Purpose

**What primary and backup connectivity should we commit to at each restaurant location — including carrier diversity, redundancy strategy, bandwidth tier, and circuit type — so the reference architecture can actually survive peak service, and in what order: define requirements, survey what's available, select carriers, provision with lead time, and validate failover before relying on it?**

This is a leadership decision about connectivity procurement and business continuity, not a network design exercise. The article helps an executive decide what belongs in a corporate internet standard, how to evaluate carriers and circuit types against operational requirements, when backup justifies its cost, and which connectivity patterns fit each store format — before anyone chases Mbps on a sales flyer or renews a single-circuit contract because the rep offered a discount.

---

## This Article Owns

The concepts this article should become the authoritative resource for.

- **Internet buying as a continuity decision, not a speed decision** — why advertised download tiers matter less than whether POS, payments, and kitchen traffic survive when the primary path fails; how to frame budget conversations around outage cost versus backup cost
- **Connectivity requirements derived from architecture** — what the reference design (from Restaurants Networking) demands of primary and backup circuits: diverse paths, failover-capable edge, applications the backup must carry, format-specific bandwidth; the boundary between "what the network must do" (Networking) and "what to order from carriers" (here)
- **Primary circuit evaluation** — when fiber, cable broadband, dedicated internet (DIA), and business-grade broadband become appropriate within an already-defined architecture; availability and install reliability as first-class criteria, not speed alone
- **Backup connectivity patterns** — LTE/5G cellular failover, second terrestrial ISP, diverse carrier pairs, and when each pattern fits urban QSR, suburban full-service, rural, ghost kitchen, and acquired formats; what backup must carry versus what can wait
- **Carrier diversity and correlated failure** — why two lines from the same carrier or shared infrastructure often fail together; how to evaluate diverse entry paths, last-mile diversity, and whether "redundant" circuits actually are
- **Bandwidth planning by store format** — sizing for peak concurrent load (POS, kitchen, online ordering, delivery tablets, guest Wi-Fi) rather than idle speed tests; format-specific tier guidance without pretending every store needs gigabit
- **The corporate internet standard** — minimum speed tier by format, approved primary and backup methods, carrier diversity rules, install lead-time requirements, franchise procurement boundaries, and what must be validated before go-live; distinct from the whole-store blueprint in Technology Standardization
- **Install timing and opening risk** — circuit lead times as a procurement decision, not an opening checklist task; when to order relative to lease and buildout so connectivity is not the critical-path surprise; link opening sequencing to Restaurant Opening Technology Checklist
- **Specify → Source → Select → Provision → Validate** — the operating sequence for turning architecture requirements into signed circuits and tested failover; distinct from Networking's Survey → Design → Standardize → Validate → Rollout (architecture) and Standardization's Assess → Document → Rationalize → Publish → Govern (whole-store blueprint)
- **When SD-WAN, Starlink, DIA, or managed WAN earn their place** — as connectivity procurement choices within a defined architecture and footprint, not as substitutes for segmentation or reference design; evaluation thresholds (fleet size, carrier inconsistency, rural availability), not vendor rankings
- **Franchise and acquisition connectivity governance** — minimum internet standard franchisees must meet, who approves local carrier exceptions, how inherited circuits are measured against the corporate standard before renewal locks in bad deals
- **Contract renewal and fleet-wide carrier strategy** — when to renegotiate, when to standardize tiers across markets, when local carrier choice is acceptable within a governed standard versus when corporate should hold master agreements
- **Evaluating ISP claims operationally** — outage history, install performance, support responsiveness, and failover behavior during peak service as scoring criteria before comparing speed tiers
- **Business continuity requirements for connectivity** — which applications must survive primary failure, what downtime is acceptable by format and volume, how backup sizing maps to revenue risk; distinct from the first-five-minutes outage playbook

---

## This Article Does NOT Own

Topics that belong to other articles.

Mention briefly.

Link instead of repeating.

- **Vendor ownership, escalation contacts, contract calendars, approved vendor list by category** → Restaurant Vendor Sprawl
- **What staff should do in the first five minutes of an outage** → Restaurant Internet Outages
- **What actually breaks when connectivity fails** (cards, kitchen tickets, delivery tablets, offline card rules) → Restaurant Internet Outages
- **Whether headquarters can see store health before managers call** → Restaurant Network Visibility
- **Monitoring dashboards, alert ownership, outage history by site, ISP portal vs store health** → Restaurant Network Visibility
- **Network architecture** (VLAN design, segmentation implementation, reference topology, remote access patterns, equipment tiers at the rack) → Restaurants Networking
- **When SD-WAN earns its cost as an architecture overlay** (segmentation policy, fleet-wide topology consistency) → Restaurants Networking; here SD-WAN appears only as a connectivity procurement and management option once architecture exists
- **The whole-store technology blueprint** (POS build, Wi-Fi posture policy, cabling expectations, format templates at category level) → Restaurant Technology Standardization
- **Opening-day sequencing, go-live sign-off, opening-week escalation runbooks, franchise opening certification mechanics** → Restaurant Opening Technology Checklist
- **POTS line inventory, alarm dialer replacement, life-safety sign-off mechanics** → Restaurant POTS Replacement
- **Network readiness checklist as a field execution tool** → Restaurant Network Checklist
- **Failover test procedure during rush as an operational playbook** → Restaurant Internet Outages (response) and Restaurant Network Checklist (field validation); here validate means procurement acceptance criteria, not shift-level scripts
- **Independent advisory methodology for vendor evaluation** → Independent Technology Advisory (general path, not restaurant-specific)

---

## Reader Arrives Because...

What operational situation caused someone to search for this topic?

- Leadership approved a reference network architecture and asked IT to "order the internet standard" — but nobody has translated architecture requirements into carrier specs, tier tables, or franchise procurement rules
- A contract renewal landed on someone's desk with a rate increase, and leadership wants to know whether to renew, renegotiate, or add backup before signing
- A lunch-hour outage traced to single-circuit dependency, and the post-incident fix conversation defaulted to "get faster internet" instead of redundancy
- A new store's circuit missed its install date because nobody factored carrier lead time into the procurement timeline — opening revenue slipped while development blamed IT
- A franchise audit found locations on unapproved ISPs, mystery backup boxes, or cable packages that do not match the corporate standard
- Development is opening five stores this year and wants one answer for "what internet do we order" without a written standard by format and market
- An IT director inherited forty locations with four different primary carriers, three backup patterns, and no documented rationale for any of them
- Leadership is evaluating SD-WAN or Starlink after repeated outages, and someone needs to decide whether the problem is connectivity procurement or missing architecture
- A rural or exurban site has limited carrier options, and the team needs to decide what primary-plus-backup pattern is defensible before buildout commits
- Someone conflated "we designed the network" (Networking) with "we know what to order from carriers" and discovered the gap when the integrator asked for circuit specs nobody had written
- Finance wants to compare circuit spend across the fleet, but sites were procured ad hoc with no standard tier or backup requirement to measure against

---

## Reader Leaves Knowing...

After reading this article, what should they understand that they didn't before?

- **The best internet decision is a continuity decision** — redundancy, carrier diversity, install reliability, and backup sizing matter more than the highest advertised Mbps on a single path
- **Architecture defines requirements; this article defines what to buy** — Restaurants Networking states what primary and backup paths must do; this article teaches how to translate that into carrier selection, circuit type, and tier choices
- **Two ordinary connections with tested failover beat one fast connection** when the primary drops during lunch — budget for backup against outage cost, not speed bragging rights
- **Carrier diversity is a procurement question** — two circuits that share infrastructure are not redundant; evaluate last-mile diversity before signing
- **Bandwidth should be sized for peak service load** by format, not quoted from a sales rep or a speed test at 3 a.m.
- **Install lead time is part of the buying decision** — circuit delivery delays are a procurement failure, not something to discover on opening week
- **A corporate internet standard is governable** — minimum tiers, approved backup methods, franchise boundaries, and validation criteria; distinct from the whole-store blueprint
- **SD-WAN, Starlink, DIA, and LTE each have a place** — as connectivity choices within architecture, not as shortcuts past segmentation or reference design
- The next decisions are **whether headquarters can see whether the circuits are actually working** (Restaurant Network Visibility) and **how to apply connectivity standards through the opening pipeline** (Restaurant Opening Technology Checklist) — not re-litigating VLAN design or outage response

---

## Editorial Promise

Finish this sentence.

"This article will never become..."

...a ranked list of ISPs, a VLAN configuration guide, an outage response runbook, a monitoring tool buyer's guide, an opening-day circuit timeline, or a network architecture workshop. It teaches executives how to decide what connectivity to commit to at each location — primary, backup, diversity, and tier — within an already-defined architecture, then points to visibility, opening, and outage articles for the decisions that follow.

---

## Primary Observation

What common assumption does this article challenge?

One sentence.

**The best internet for a restaurant is the fastest circuit the local carrier will sell — when in practice the buying decision is whether payments and kitchen traffic survive primary failure, whether two paths are actually diverse, and whether the circuit can be installed before opening day, not which Mbps number wins a speed test.**

---

## Operational Story

Describe the real-world operational situation that anchors this article.

Think in scenes.

**Primary scene — the renewal that optimizes the wrong variable:**

It is budget season at a 32-location fast-casual brand. The cable rep offers a free upgrade to gigabit on renewal. Leadership sees a win. Nobody asks whether the store has a backup path, whether the backup carries POS, or whether the last three outages were carrier failures or architecture gaps. The reference architecture says tested failover. The invoice still shows one circuit. Six weeks later, lunch dies on the same single path — faster than before, still alone.

**Secondary scene — the opening critical path:**

Development hands off a new suburban drive-thru with a fixed grand-opening date. IT is told to "order internet." Nobody checked address availability for diverse carriers, backup LTE lead time, or whether fiber install is eight weeks in that market. The primary circuit slips two weeks. The backup arrives the day before soft open and never gets validated under load. Soft open works on one path until guest Wi-Fi and online orders spike on opening weekend. The architecture was defined. The procurement timeline was not.

**Tertiary scene — the franchisee's "equivalent" package:**

A franchise compliance review finds six stores on local cable bundles the franchisee signed because "it was the same speed for half the price." Corporate's standard calls for diverse backup and an approved failover appliance. Three stores have LTE boxes in closets that were never activated on a data plan. Two share the same carrier for primary and "backup." Leadership thought connectivity was standardized because Networking published a reference design last quarter. Nobody published what franchisees are allowed to order — or how to verify they did.

The article stays in these scenes. It does not drift into VLAN diagrams, first-five-minute outage scripts, monitoring dashboard features, or opening-week sign-off mechanics until the cost of bad connectivity buying is visceral.

---

## Major Sections

List only.

No content.

1. Opening observation — gigabit renewal, single path, lunch still dies (impact cascade)
2. Why internet buying becomes an operational problem — speed vs continuity, opening delays, franchise drift, renewal traps
3. What architecture requires of connectivity — translating reference design into procurement requirements; link to Restaurants Networking
4. Primary circuit types — when fiber, cable, DIA, and business broadband fit; availability and install reliability first
5. Backup and redundancy patterns — LTE, second ISP, diverse carriers, Starlink; what backup must carry; carrier diversity vs correlated failure
6. Bandwidth planning by format — peak load sizing for QSR, full-service, drive-thru, ghost kitchen, rural; tiers without overbuilding
7. The five biggest mistakes we see — speed before redundancy, same-carrier "diversity," backup ordered but not provisioned, ignoring install lead time, franchisee procurement without a standard
8. What better operators do differently — Specify, Source, Select, Provision, Validate; corporate internet standard; fleet and franchise governance
9. When SD-WAN, Starlink, DIA, or managed WAN earn their place — thresholds within architecture, not vendor lists
10. Connectivity paths by footprint — single-market standards, multi-market carrier flexibility, rural exceptions, acquisition measurement, renewal strategy
11. Questions to ask before signing a circuit or renewal
12. Executive takeaways and decision FAQs

---

## Executive Takeaway

If an executive remembers one sentence six months later, what should it be?

**Order connectivity for what the store must survive during lunch when the primary fails — diverse backup, right-sized tiers, and install dates you can trust — not for the fastest Mbps on one line.**

---

## Read Before

Which article naturally comes before this one?

**Primary path (Restaurant Connectivity Playbook continuation):** **Restaurants Networking** — readers should understand what the reference architecture requires of primary and backup paths (segmentation-capable edge, failover role, format-specific sizing, what applications must survive) before this article teaches which carriers and circuit types fulfill those requirements. This article assumes architecture clarity or at minimum a written connectivity requirement from Technology Standardization's blueprint.

**Cross-path entry (Operations playbook crossover):** **Restaurant Technology Standardization** — when the reader has a blueprint-level connectivity requirement (segmented payment path, tested backup) but has not yet read Networking. Link to Networking if they need architecture detail; this article can proceed if the requirement is documented.

**Cross-path entry (Connectivity cluster):** **Restaurant Internet Outages** — when the reader's trigger was peak-hour failure and leadership's reflex is "buy better internet." Link for the failure moment and response playbook; this article explains how to make buying decisions that prevent the next single-path surprise.

**Optional prerequisite:** **Restaurant Vendor Sprawl** — only when the reader's blocker is still unnamed ownership of ISP relationships, contract renewals, or franchisee procurement authority. Do not require Vendor Sprawl for Connectivity-path readers. At most acknowledge that connectivity standards without escalation ownership still leave renewal and outage calls unclear.

Readers who completed Restaurants Networking should arrive here expecting to define *what to order from carriers*, not to re-litigate *how the network is wired* or *who owns vendor relationships*.

---

## Read Next

Which article naturally follows this one?

**Restaurant Network Visibility** — once circuits are ordered and failover is provisioned, the next question is whether headquarters can tell whether the store can still take cards and print tickets before managers call. Visibility verifies connectivity is operating; this article defines what to buy.

**Secondary natural follow-on:** **Restaurant Opening Technology Checklist** — for readers ready to apply connectivity standards through the opening pipeline after procurement requirements are clear; opening sequencing assumes the corporate internet standard exists and circuits are ordered with lead time.

**Tertiary follow-on (Connectivity path):** **Restaurant POTS Replacement** — for readers finishing the connectivity path; analog line modernization often shares backup connectivity decisions but implementation detail lives in POTS Replacement.

Do not send readers to Network Visibility or Opening Checklist before they understand what connectivity standard they are buying against. Requirements first, provisioning and verification second.

---

## Internal Links

Which restaurant articles should this page link to instead of repeating?

- **Restaurants Networking** — reference architecture, backup path role, segmentation-capable edge, what connectivity must deliver at the design layer
- **Restaurant Technology Standardization** — whole-store blueprint and format-level connectivity requirements before architecture detail
- **Restaurant Vendor Sprawl** — vendor ownership, ISP contract governance, franchisee procurement authority
- **Restaurant Internet Outages** — first-five-minutes response, what breaks during service, why faster internet does not fix lunch
- **Restaurant Network Visibility** — monitoring ownership, store-health visibility, verifying failover in operation
- **Restaurant Opening Technology Checklist** — applying connectivity standards through opening sequencing, go-live sign-off, opening-week testing
- **Restaurant Network Checklist** — field checklist for network and failover validation at pre-opening and ongoing audits
- **Restaurant POTS Replacement** — alarm and analog line connectivity as a separate procurement category; shared backup paths link here, not re-taught

Tools to reference at decision guidance (not teach in body): Downtime Cost Calculator, Network Assessment.

---

## Overlap Check

List ideas already owned by another article that should not be repeated here.

- **Vendor inventory, escalation ownership, contract calendars, MSP/TEM governance** — owned by Restaurant Vendor Sprawl; at most one sentence acknowledging ISP renewals need named owners, plus link
- **Approved vendor list by category as a governance artifact** — owned by Vendor Sprawl; this article references approved carriers and integrators only as parties who fulfill the connectivity standard
- **The first-five-minutes outage playbook** — owned by Restaurant Internet Outages
- **Detailed cascade of what breaks when internet fails** (cards, kitchen screens, delivery tablets, offline declines) — owned by Restaurant Internet Outages
- **"Buying faster internet before fixing design"** as outage response lesson — owned by Restaurant Internet Outages; here it may appear only as a procurement mistake (renewing speed without backup), not a response playbook
- **ISP portal green lights vs store operational health** — owned by Restaurant Network Visibility
- **Monitoring dashboards, alert ownership, outage history by site, who answers alerts during dinner** — owned by Restaurant Network Visibility
- **VLAN segmentation implementation, reference topology, remote access design, equipment tier at the rack** — owned by Restaurants Networking
- **Survey → Design → Standardize → Validate → Rollout** as network architecture sequence — owned by Restaurants Networking; this article uses Specify → Source → Select → Provision → Validate for *connectivity procurement*
- **When SD-WAN earns its cost as architecture overlay** (fleet topology consistency, policy centralization before carriers are chosen) — owned by Restaurants Networking; here SD-WAN appears only as a connectivity management and procurement option once architecture exists
- **Whole-store blueprint, format templates at category level, Assess → Document → Rationalize → Publish → Govern** — owned by Restaurant Technology Standardization
- **Opening-day circuit timelines, go-live sign-off, franchise opening certification, opening-week escalation runbooks** — owned by Restaurant Opening Technology Checklist; here install lead time is a buying criterion, not a full opening sequence
- **POTS line inventory, alarm dialer replacement, life-safety AHJ sign-off** — owned by Restaurant POTS Replacement
- **Pre-opening and ongoing network checklist items as field execution** — owned by Restaurant Network Checklist; reference when discussing validation acceptance, do not duplicate the checklist body
- **Firewall with POS segmentation as architecture component** — owned by Restaurants Networking; here reference only as approved edge equipment in the connectivity standard, not as a design guide
- **Generic technology stack bullet lists** without operational framing — current article artifact; replace with procurement-boundary examples or cut
- **Procurement-style structures** (When to evaluate / When to wait / Alternatives / Decision matrix / Technology stack / Buying triggers / Buying trigger timeline / Top challenges / Common priorities / Evidence) — compress into observational narrative; these read unlike the Restaurant Internet Outages benchmark voice
- **Evidence stats framed as proof points** ("redundancy over raw speed," "install timing drives opening risk") — rewrite as observational field notes if retained at all, or cut; the benchmark earns trust through scenes, not case study metrics
- **Decision matrix with fixed Mbps tiers by format** (e.g., "200 Mbps primary, LTE backup") — reframe as decision principles and format-specific sizing logic, not prescriptive product recipes; architecture and market availability vary
- **"Alternatives" as parallel product categories** (primary broadband plus LTE vs dual ISP vs Starlink vs SD-WAN) — reframe as connectivity patterns within requirements, not a buyer's menu unrelated to architecture
- **FAQ blocks that teach outage response or VLAN design** — cut or redirect; keep only procurement and continuity FAQs

---

## Rewrite Notes for Future Editors

The current production article mixes a strong continuity insight with template structures (When to evaluate / When to wait / Alternatives / Decision matrix / Technology stack / Buying triggers / Evidence) that read unlike the Restaurant Internet Outages benchmark. The rewrite should:

- Open with an operational scene, not a definition paragraph or speed-tier headline
- Follow article anatomy from `docs/playbook/article-anatomy.md`: observation → operational impact → what actually happens → patterns → what better operators do → decision guidance
- Use Specify → Source → Select → Provision → Validate as the article's spine, explicitly distinguishing it from Networking's architecture sequence and Standardization's blueprint sequence
- Treat fiber, cable, DIA, LTE, dual-ISP, Starlink, and SD-WAN as connectivity patterns evaluated against architecture requirements, not parallel "product alternatives" in a matrix
- Keep franchise, acquisition, and opening-delay causes because they are core to how bad connectivity procurement accumulates — but link architecture to Restaurants Networking, opening sequencing to Restaurant Opening Technology Checklist, and outage response to Restaurant Internet Outages
- Preserve the insight that redundancy and carrier diversity beat raw speed — that is this article's signature idea, shared in observation with Internet Outages but applied here to buying decisions
- State clearly what belongs in a corporate internet standard (tiers, backup methods, diversity rules, franchise boundaries, validation criteria) without teaching VLAN design or monitoring tool configuration
- Include install lead time as a procurement decision with operational consequences, without duplicating the Opening Checklist's full sequencing
- End with executive decision clarity on connectivity standards and renewal strategy, not FAQ SEO blocks — though short decision FAQs are acceptable if they sound like the reference article's closing questions
- Do not re-teach vendor governance, network architecture, outage response, or monitoring strategy; assume readers came from Restaurants Networking or link back for readers who skipped it

**Boundary test for future edits:** If a section could be retitled "Restaurants Networking" or "Restaurant Internet Outages" without breaking the editorial promise, it belongs in another article.

**Relationship to Restaurants Networking:** Networking defines what primary and backup paths must do in the reference architecture. This article defines which carriers, circuit types, and tiers fulfill that design. Keep that boundary sharp in prose and cross-links. Do not compare VLAN models here. Do not explain segmentation implementation here.

**Relationship to Restaurant Internet Outages:** Internet Outages owns the moment of failure and the first five minutes. This article owns what to order so the next failure is survivable. Both challenge "faster internet" as the default fix — Internet Outages in response, Best Internet in procurement.

**Relationship to Restaurant Network Visibility:** This article commits to circuits and backup products. Network Visibility owns whether headquarters can see operational health before managers call. Do not teach dashboard strategy here. Link when readers need to verify provisioning worked.

**Relationship to Restaurant Opening Technology Checklist:** This article defines what to order and when to order it relative to lead time. Opening Checklist owns go-live sequencing, sign-off, and opening-week accountability. Install lead time appears here as a buying criterion; full opening timeline belongs there.

**Relationship to Technology Standardization:** Standardization's blueprint states connectivity requirements at category level (tested backup, minimum controls). Networking implements the network layer. This article implements the carrier layer. Three distinct boundaries — do not collapse them.

**Filename and slug note:** Production slug is `restaurants-best-internet`. Planning doc is `best-internet-for-restaurants.md` for editorial clarity; library naming uses the production slug.

---

## Success Test

The article is complete when:

- It follows the Crimson Technology Playbook.
- It sounds like the same author as Restaurant Internet Outages.
- Every section introduces a new idea.
- Operations come before technology.
- It teaches a decision framework rather than describing products.
- The article owns its topic without unnecessary overlap.
- A reader who also read Restaurants Networking understands the difference: Networking owns how the network layer is architected; Best Internet for Restaurants owns what connectivity to order to support that architecture.
- A reader who finishes this article knows to read Restaurant Network Visibility next to verify circuits are operating — or Restaurant Opening Technology Checklist if their immediate need is the opening pipeline — not back to VLAN design or outage response.
- No section could be retitled "Restaurants Networking" or "Restaurant Internet Outages" without breaking the editorial promise.
- A renewal conversation or missed circuit install is recognizable in the prose — connectivity is judged by whether lunch survives primary failure, not by Mbps on a contract.
- Franchise procurement drift and single-path renewals feel like the same class of mistake, not unrelated topics.
