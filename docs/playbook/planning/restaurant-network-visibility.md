# Editorial Worksheet

## Article

Restaurant Network Visibility

---

## Library Context

This article is the operational verification step in the **Restaurant Connectivity Playbook** editorial sequence. In the library's decision chain, it follows **Best Internet for Restaurants** and precedes either **Restaurant Opening Technology Checklist** (operations path) or **Restaurant Network Checklist** (field validation).

It sits in the **Connectivity & Resilience** topic cluster under the **Connectivity** library category, in the "Outage response & visibility" section alongside Restaurant Internet Outages.

Its job is not to explain who owns vendor relationships, what staff do in the first five minutes of an outage, how to VLAN a store, which carrier to order, how to sequence opening-day tasks, or how to replace alarm dialers. Those decisions live in other articles. This article owns the portfolio-level question of **how operators gain confidence that every location is healthy before managers call** — once architecture is defined, connectivity is committed, and leadership needs fleet-wide operational awareness instead of reactive store calls.

Many readers will arrive here directly from **Best Internet for Restaurants**, which ends with circuits ordered, backup provisioned, and failover accepted at procurement — without answering whether headquarters can tell whether cards and kitchen tickets still work during lunch. Best Internet answers *what connectivity should support that architecture*. This article answers *how we know every restaurant is actually operating the way we expect before managers call*.

Readers on the Connectivity path may also arrive after **Restaurant Internet Outages** with a more urgent trigger: repeated incidents where the ISP portal showed green while the store could not take cards, or IT learned about the problem only after the manager was already on the phone. Link to Internet Outages for the failure moment and first-five-minutes response; this article explains how to build visibility so the next incident is caught before the dining room improvises — not how to run the store when the circuit is already dark.

Readers who completed **Restaurants Networking** or **Restaurant Technology Standardization** without Best Internet may still use this article if connectivity is in place but leadership cannot see store health fleet-wide. If circuits were never committed or failover was never provisioned, link back to Best Internet before investing in monitoring strategy.

**Editorial sequence note:** The production learning path (`restaurant-connectivity`) currently lists this article at step 2, before Restaurants Networking and Best Internet. The approved editorial architecture treats visibility as the verification step *after* architecture and connectivity decisions are made. Future path updates should align with: Internet Outages (optional entry) → Vendor Sprawl / Standardization / Networking / Best Internet (as applicable) → **Network Visibility** → Opening Checklist or Network Checklist. Cross-path readers who enter from Internet Outages may read this earlier as a diagnostic; the rewrite should acknowledge that entry without re-teaching architecture or carrier selection.

---

## Purpose

**How should we monitor store health across the fleet — including what to watch, who owns alerts, and how to distinguish ISP status from operational health — so headquarters knows a location is struggling before managers call during lunch?**

This is a leadership decision about operational visibility and alert governance, not a monitoring product shootout. The article helps an executive decide what "healthy" means at the store level, whether current tools answer business questions or only ping circuits, who is accountable when alerts fire during dinner, and how fleet-wide awareness turns chronic repeat failures into budget conversations — before anyone buys another dashboard nobody watches during a rush.

---

## This Article Owns

The concepts this article should become the authoritative resource for.

- **Operational visibility vs connectivity monitoring** — why a green ISP portal does not mean cards, kitchen tickets, and payment paths are healthy; what headquarters needs to see to know whether the store can still run lunch, not whether one status page looks happy
- **Store health as a business question** — defining health in terms of money and service (cards settling, tickets reaching kitchen screens, critical paths alive) rather than device uptime or ping success alone
- **The manager-as-alarm-system problem** — when store managers call IT before anyone upstairs sees the problem, you have late notification, not visibility; why reactive discovery costs peak-hour revenue
- **ISP visibility versus business visibility** — what carrier portals, WAN tools, and circuit monitors actually tell you; what they cannot tell you about LAN, Wi-Fi, POS cloud, payment paths, and local gear; how to layer views without vendor tennis during an incident
- **What to monitor at a restaurant location** — the minimum observable paths that answer "can this store operate right now": primary and backup circuit behavior, edge device health, POS and kitchen paths, payment settlement, operations Wi-Fi vs guest load, and the stores that keep calling every month; distinct from architecture design (Networking) and circuit procurement (Best Internet)
- **Site inventory for visibility** — what headquarters must know exists at each location to interpret alerts (circuits, backup path, firewall, switches, access points, which gear runs money and tickets); distinct from vendor relationship inventory (Vendor Sprawl) and blueprint specification (Technology Standardization)
- **Alert ownership and routing** — naming who answers when an alert fires during dinner, what authority they have to act, severity tied to business pain (card failures page differently than guest Wi-Fi complaints), and why dashboards without owners become wallpaper
- **Fleet-wide consistency of the view** — one way to see corporate and franchise stores the same way; why regional dashboards, ISP portals, and POS vendor tickets produce three stories about the same failure
- **Proactive support and escalation before operational impact** — catching slow burns (packet loss, chronic bad access points, backup that never took over, same three stores every month) before the dining room feels it; distinct from the first-five-minutes outage playbook
- **Outage and incident history by site** — what broke, what the store felt, what fixed it, how long lunch was hurt; using history to fund the right repair instead of treating chronic problems as "isolated"
- **Controlled validation of what you claim to see** — failing a circuit on purpose, confirming failover and POS paths look right under load, discovering whether monitoring works on paper only; distinct from opening-week sign-off (Opening Checklist) and field checklist execution (Network Checklist), but same operational principle
- **Define → Instrument → Route → Own → Validate → Learn** — the operating sequence for turning "we bought monitoring" into fleet-wide operational awareness; distinct from Networking's architecture sequence and Best Internet's procurement sequence
- **Evaluating visibility investments** — questions executives should ask before buying tools or MSP monitoring overlays; decision framework, not product rankings
- **Franchise and acquisition visibility governance** — minimum store-health view headquarters needs from franchise locations, what corporate must see even when franchisees procure locally, and how inherited stores get on the same monitoring standard before chronic failures hide in regional silos
- **When visibility is not the first problem** — no architecture to monitor, no backup provisioned, no named vendor owners; link out rather than selling dashboards into a broken foundation

---

## This Article Does NOT Own

Topics that belong to other articles.

Mention briefly.

Link instead of repeating.

- **Vendor ownership, escalation contacts, contract calendars, approved vendor list by category** → Restaurant Vendor Sprawl
- **What staff should do in the first five minutes of an outage** → Restaurant Internet Outages
- **What actually breaks when connectivity fails** (cards, kitchen tickets, delivery tablets, offline card rules) → Restaurant Internet Outages
- **Network architecture** (VLAN design, segmentation implementation, reference topology, remote access patterns, equipment tiers at the rack) → Restaurants Networking
- **Carrier selection, dual-ISP product design, LTE backup vendor patterns, install lead times, speed tiers, corporate internet standard** → Best Internet for Restaurants
- **The whole-store technology blueprint** (POS build, Wi-Fi posture policy, cabling expectations, format templates at category level) → Restaurant Technology Standardization
- **Opening-day sequencing, circuit order timing on the development calendar, go-live sign-off, opening-week escalation runbooks** → Restaurant Opening Technology Checklist
- **POTS line inventory, alarm dialer replacement, life-safety sign-off mechanics** → Restaurant POTS Replacement
- **Pre-opening and ongoing network checklist items as field execution** → Restaurant Network Checklist
- **Failover test procedure during rush as shift-level operational playbook** → Restaurant Internet Outages (response) and Restaurant Network Checklist (field validation); here controlled failure validates monitoring, not staff scripts
- **Independent advisory methodology for vendor evaluation** → Independent Technology Advisory (general path, not restaurant-specific)

---

## Reader Arrives Because...

What operational situation caused someone to search for this topic?

- Circuits and backup are in place, but headquarters still learns about sick stores from managers texting photos of blinking routers during lunch
- The ISP portal says green while cards fail, tickets stall, or guest Wi-Fi drags down the LAN — and nobody upstairs can tell which layer broke first
- Leadership bought monitoring last year, but alerts fire into a mailbox nobody owns and managers still call before IT sees anything
- The same three stores call every month while leadership thinks the network is fine because circuit uptime dashboards look healthy
- A post-incident review found five tools that each saw a piece of the problem and nobody had one view of whether the store could still operate
- IT is evaluating an MSP or managed network overlay and needs to decide what store-health visibility should mean before signing
- Franchise compliance finds corporate stores on one monitoring approach and franchise locations invisible until something breaks on opening weekend
- An acquisition closed and inherited stores have no consistent health view — each market uses a different ISP portal, Wi-Fi dashboard, or POS ticket queue
- Someone conflated "we ordered backup internet" (Best Internet) with "we can see whether backup actually took over during dinner" and discovered the gap during the next peak-hour failure
- Development asks whether new stores will show up in headquarters' view the same way corporate stores do before the opening pipeline scales
- Finance wants to fund WAN or Wi-Fi projects but cannot identify which locations chronically hurt lunch because incident notes live in texts and whoever answered the phone that week

---

## Reader Leaves Knowing...

After reading this article, what should they understand that they didn't before?

- **Visibility is an operational confidence problem** — knowing whether every location can still take money and cook food during service, not collecting more green lights on carrier portals
- **Monitoring tells you something changed; visibility tells you what it means for the store** — who should act, whether lunch is at risk, and which layer failed first
- **Managers calling before IT sees the problem means you have late notification**, not a monitoring program — fix the view before you fund another circuit or dashboard
- **ISP status and store health are different questions** — circuit uptime does not answer whether POS, payments, and kitchen paths are healthy
- **Alerts without named owners become wallpaper** — route severity to people with authority to act during dinner, not into an inbox nobody watches during a rush
- **Fleet-wide visibility requires one consistent view** — regional ISP portals, Wi-Fi vendor dashboards, and POS tickets cannot be how leadership compares stores
- **History by site turns chronic failures into budget conversations** — the stores that bleed the same way every month are telling you where to spend; write it down
- **Test what you claim to see** — controlled failover and path validation expose monitoring that only works on paper before the next rush proves it
- The next decisions are **how to apply standards through the opening pipeline with go-live visibility** (Restaurant Opening Technology Checklist) or **field validation on an ongoing schedule** (Restaurant Network Checklist) — not re-litigating VLAN design, carrier contracts, or outage response playbooks

---

## Editorial Promise

Finish this sentence.

"This article will never become..."

...a ranked list of monitoring vendors, a VLAN configuration guide, an outage response runbook, a carrier comparison guide, an opening-day circuit timeline, or a network architecture workshop. It teaches executives how to decide what store-health visibility means, who owns alerts, and how to build fleet-wide operational awareness — then points to opening, checklist, architecture, and outage articles for the decisions that precede or follow visibility.

---

## Primary Observation

What common assumption does this article challenge?

One sentence.

**Buying monitoring gives you visibility — when in practice most restaurant groups already have tools that ping circuits and still learn about card failures and stalled kitchen tickets from managers on the phone because nobody defined what "healthy" means, who owns alerts, or whether the view answers a business question.**

---

## Operational Story

Describe the real-world operational situation that anchors this article.

Think in scenes.

**Primary scene — the green portal, dead lunch:**

It is 12:15 p.m. at a 24-location fast-casual brand. Cards stop at one store. The manager texts a photo of the router. Upstairs, the ISP portal shows green. The POS vendor wants screenshots. Wi-Fi gets rebooted for the third time. Ten minutes in, nobody agrees what broke first — WAN, LAN, POS cloud, or the local switch nobody is watching. The monitoring contract covers circuit uptime. Nobody can answer whether the store can still take money and print kitchen tickets. Leadership thought connectivity was handled because backup was ordered last quarter. They never built a view of store health. The manager is still the alarm system.

**Secondary scene — the dashboard nobody owns:**

After the third "we found out from the store first" review in a quarter, IT buys a fleet monitoring platform. Alerts start firing. Some go to a shared mailbox. Some go to the MSP, who opens tickets but cannot restart the POS path. Severity is wrong — guest Wi-Fi complaints page the same as card failures. By month two, half the alerts are muted. Dinner rush hits at a franchise location that is not in the portal the same way corporate stores are. The manager calls angry before anyone upstairs knew. The tool works. The operating model does not.

**Tertiary scene — the chronic three stores:**

Leadership reviews quarterly network spend. Circuit uptime across the fleet looks acceptable. Operations knows three stores always struggle during dinner — packet loss, a backup that never took over, the same access point dying every Friday. Incident notes live in texts, emails, and whoever answered the phone. Those stores never show up as a pattern in the ISP dashboard. Finance approves another WAN project at a location that was never the problem. The stores that bleed every month were telling leadership where to spend. Nobody wrote it down in one place headquarters could see.

The article stays in these scenes. It does not drift into VLAN diagrams, first-five-minute outage scripts, carrier renewal negotiations, opening-week circuit timelines, or alarm dialer mechanics until the cost of flying blind is visceral.

---

## Major Sections

List only.

No content.

1. Opening observation — ISP portal green, cards dead, manager on the phone (impact cascade)
2. Why visibility becomes an operational problem — manager as alarm, vendor tennis, slow burns during dinner, chronic repeat stores
3. What you cannot see from headquarters — store as a stack of layers; ISP view vs LAN, Wi-Fi, POS, payments; link to architecture only as context for why one ping is not enough
4. The five biggest mistakes we see — ISP portal as truth, alerts without owners, watching circuit not store, every region its own view, history in people's heads
5. What better operators do differently — Define, Instrument, Route, Own, Validate, Learn; site inventory for visibility; severity tied to business pain; franchise fleet consistency
6. ISP visibility versus business visibility — what each layer of tooling actually tells you; building a coherent view without re-teaching architecture
7. Proactive support and escalation before impact — catching slow burns, repeat offenders, backup that never failed over; distinct from outage response
8. Visibility paths by footprint — corporate fleet standard, franchise minimum view, acquisition onboarding, MSP overlay with retained ownership, when visibility waits on architecture or connectivity
9. Questions to ask before buying monitoring or signing an MSP visibility add-on
10. Executive takeaways and decision FAQs

---

## Executive Takeaway

If an executive remembers one sentence six months later, what should it be?

**If managers still call before headquarters knows a store is struggling, you do not have visibility yet — you need a store-health view, named alert owners, and site history that answers whether lunch is at risk, not another circuit status page.**

---

## Read Before

Which article naturally comes before this one?

**Primary path (Connectivity editorial sequence):** **Best Internet for Restaurants** — readers should have committed to primary and backup connectivity, carrier diversity, and procurement validation criteria before this article teaches how to verify stores are operating in production. Circuits ordered and failover provisioned are prerequisites for meaningful store-health monitoring; monitoring cannot substitute for missing backup or undefined architecture.

**Cross-path prerequisites (as needed, not all required):**

- **Restaurants Networking** — when the reader needs to understand why inconsistent topology makes alerts meaningless or why segmentation affects what paths must be watched; link for architecture context, do not require for readers arriving from Internet Outages with an urgent visibility gap
- **Restaurant Technology Standardization** — when franchise visibility requirements depend on a governed blueprint (what must be visible at minimum by format)
- **Restaurant Vendor Sprawl** — only when alert routing still has no named owner for ISP, POS, or MSP escalation; at most acknowledge visibility without ownership still leaves dinner alerts unanswered

**Cross-path entry (Connectivity cluster):** **Restaurant Internet Outages** — when the reader's trigger was peak-hour failure and the post-incident question is "why did we not see this before managers called?" Link for the failure moment and first-five-minutes response; this article owns the visibility investment decision that follows.

Readers who completed Best Internet should arrive here expecting to define *how headquarters knows stores are healthy*, not to re-litigate *what circuits to order* or *how the network is wired*.

---

## Read Next

Which article naturally follows this one?

**Restaurant Opening Technology Checklist** — for readers ready to embed visibility requirements into the opening pipeline: monitoring confirmed before staff training, go-live sign-off that includes store-health view, franchise opening certification with fleet visibility — not just circuits ordered.

**Secondary natural follow-on:** **Restaurant Network Checklist** — for readers who need field-level validation items (failover tested under load, monitoring confirmed working, named escalation contacts) on a pre-opening and ongoing schedule; the checklist executes what this article defines as visibility requirements.

**Tertiary follow-on (Connectivity path completion):** **Restaurant POTS Replacement** — for readers finishing the connectivity path; analog line modernization shares backup visibility concerns but implementation detail lives in POTS Replacement.

**Cross-path return:** **Restaurant Internet Outages** — for readers who built visibility and now need to ensure the first-five-minutes playbook matches what alerts will surface; link, do not re-teach response here.

Do not send readers to Opening Checklist or Network Checklist before they understand what store-health visibility means and who owns alerts. Visibility strategy first, field execution second.

---

## Internal Links

Which restaurant articles should this page link to instead of repeating?

- **Best Internet for Restaurants** — circuits committed, backup provisioned, procurement validation; visibility verifies what was bought is operating
- **Restaurants Networking** — reference architecture and troubleshootable topology that make alerts interpretable; link when inconsistent builds explain noisy or useless monitoring
- **Restaurant Technology Standardization** — whole-store blueprint and format-level requirements that define what "standard" looks like before health can be compared fleet-wide
- **Restaurant Vendor Sprawl** — vendor ownership, escalation contacts, and who runs the call when alerts implicate multiple suppliers
- **Restaurant Internet Outages** — first-five-minutes response, what breaks during service, offline card rules; link when visibility gaps surface during an active incident
- **Restaurant Opening Technology Checklist** — applying visibility standards through opening sequencing, go-live sign-off, opening-week accountability
- **Restaurant Network Checklist** — field checklist for failover testing, monitoring confirmation, and ongoing validation at pre-opening and audit cadence
- **Restaurant POTS Replacement** — alarm and analog line monitoring as a separate visibility category; shared backup paths link here, not re-taught

Tools to reference at decision guidance (not teach in body): Network Assessment, Downtime Cost Calculator.

---

## Overlap Check

List ideas already owned by another article that should not be repeated here.

- **Vendor inventory, escalation ownership, contract calendars, MSP/TEM governance** — owned by Restaurant Vendor Sprawl; at most one sentence acknowledging alerts need named owners who can escalate to vendors, plus link
- **Approved vendor list by category as a governance artifact** — owned by Vendor Sprawl; this article references who answers alerts, not how vendor relationships are governed
- **The first-five-minutes outage playbook** — owned by Restaurant Internet Outages
- **Detailed cascade of what breaks when internet fails** (cards, kitchen screens, delivery tablets, offline declines) — owned by Restaurant Internet Outages; here reference only as the business outcomes visibility must surface early
- **"Buying faster internet before fixing design"** as outage response lesson — owned by Restaurant Internet Outages; here it may appear only as "fix the view before funding another WAN project," not as procurement or response guidance
- **Network architecture** (VLAN segmentation implementation, reference topology, remote access design, equipment tier at the rack, SD-WAN as architecture overlay) — owned by Restaurants Networking
- **Survey → Design → Standardize → Validate → Rollout** as network architecture sequence — owned by Restaurants Networking
- **Carrier selection, dual-ISP product design, LTE backup vendor patterns, install lead times, Mbps tier shopping, corporate internet standard** — owned by Best Internet for Restaurants
- **Specify → Source → Select → Provision → Validate** as connectivity procurement sequence — owned by Best Internet; this article uses Define → Instrument → Route → Own → Validate → Learn for *operational visibility*
- **Whole-store blueprint, format templates at category level, Assess → Document → Rationalize → Publish → Govern** — owned by Restaurant Technology Standardization
- **Opening-day circuit timelines, go-live sign-off mechanics, franchise opening certification process, opening-week escalation runbooks** — owned by Restaurant Opening Technology Checklist; here reference only that monitoring must be confirmed before training, not full opening sequence
- **POTS line inventory, alarm dialer replacement, life-safety AHJ sign-off** — owned by Restaurant POTS Replacement
- **Pre-opening and ongoing network checklist items as field execution** — owned by Restaurant Network Checklist; reference when discussing validation acceptance, do not duplicate checklist body
- **Failover test procedure as staff operational script during an active outage** — owned by Restaurant Internet Outages; controlled failure here validates monitoring only
- **PCI segmentation and compliance manual** — owned by Restaurants Networking; brief mention only if flat networks make visibility noisy, not as compliance guide
- **Managed network services as parallel product alternative or MSP buyer's guide** — compress to execution option under visibility rollout with retained alert ownership, not vendor rankings
- **Generic technology stack bullet lists** without operational framing — cut or replace with visibility-boundary examples
- **FAQ blocks that teach outage response, VLAN design, or carrier selection** — cut or redirect; keep only visibility and alert-governance FAQs

---

## Rewrite Notes for Future Editors

The current production article is closer to the Restaurant Internet Outages benchmark voice than most library pages — strong opening scene, operational framing, five-mistakes structure, decision questions. The rewrite should preserve that observational tone while sharpening boundaries so visibility does not absorb architecture, procurement, or outage response.

- Open with an operational scene (manager on the phone, green ISP portal), not a definition of network visibility
- Follow article anatomy from `docs/playbook/article-anatomy.md`: observation → operational impact → what actually happens → patterns → what better operators do → decision guidance
- Use Define → Instrument → Route → Own → Validate → Learn as the article's spine, explicitly distinguishing it from Networking's architecture sequence and Best Internet's procurement sequence
- Keep the signature insight: **stop asking "is the circuit up" and start asking "can this store still take money and cook food right now"**
- Preserve "ISP portal as truth," "alerts without owners," "watching circuit not store," "every region its own view," and "history in people's heads" as the five mistakes — they are core to this article's identity
- Treat site component inventory (router, firewall, POS paths) as context for why visibility is hard and what must be instrumented — not as architecture teaching; link to Restaurants Networking for design
- Keep franchise and acquisition causes because inconsistent visibility accumulates the same way inconsistent architecture does — but link architecture to Networking, connectivity to Best Internet, opening execution to Opening Checklist
- Controlled failover testing belongs here as *monitoring validation*; shift-level outage scripts and field checklist items link to Internet Outages and Network Checklist
- End with executive decision clarity on visibility investment and alert ownership, not FAQ SEO blocks — short decision FAQs are acceptable if they sound like the reference article's closing questions
- Do not re-teach vendor governance, network architecture, connectivity buying, opening sequencing, or POTS implementation; assume readers came from Best Internet or link back for readers who skipped it

**Boundary test for future edits:** If a section could be retitled "Best Internet for Restaurants," "Restaurants Networking," or "Restaurant Internet Outages" without breaking the editorial promise, it belongs in another article.

**Relationship to Best Internet for Restaurants:** Best Internet commits to circuits and backup products and defines procurement validation. Network Visibility owns whether headquarters can see operational health in production before managers call. Do not teach carrier selection or corporate internet standard here. Link when readers need to fix connectivity before monitoring will matter.

**Relationship to Restaurant Internet Outages:** Internet Outages owns the moment of failure and the first five minutes. Network Visibility owns how to see problems before that moment and how to interpret what broke after. Both challenge "managers call before IT sees anything" — Internet Outages as motivation for response and design fixes, Network Visibility as the monitoring and alert-governance decision.

**Relationship to Restaurants Networking:** Networking designs for troubleshootability and consistent topology. Network Visibility owns whether headquarters can see store health fleet-wide. Inconsistent architecture makes alerts hard to interpret — link there, do not VLAN here.

**Relationship to Restaurant Opening Technology Checklist:** This article defines what visibility must exist before a store counts as healthy. Opening Checklist owns go-live sequencing and sign-off mechanics. Monitoring confirmed before staff training appears here as a requirement; full opening timeline belongs there.

**Relationship to Restaurant Network Checklist:** This article defines visibility standards and validation principles. Network Checklist owns field execution items. Reference the checklist; do not duplicate it.

**Learning path note:** Editorial sequence places this article after Best Internet. If the production learning path order differs, cross-links and "read before" prose should follow the editorial sequence; path metadata can be updated separately.

---

## Success Test

The article is complete when:

- It follows the Crimson Technology Playbook.
- It sounds like the same author as Restaurant Internet Outages.
- Every section introduces a new idea.
- Operations come before technology.
- It teaches a decision framework rather than describing products.
- The article owns its topic without unnecessary overlap.
- A reader who also read Best Internet for Restaurants understands the difference: Best Internet owns what connectivity to commit to; Network Visibility owns how headquarters knows stores are healthy in operation.
- A reader who finishes this article knows to read Restaurant Opening Technology Checklist or Restaurant Network Checklist next to operationalize visibility — not back to VLAN design, carrier contracts, or outage response playbooks.
- No section could be retitled "Best Internet for Restaurants," "Restaurants Networking," or "Restaurant Internet Outages" without breaking the editorial promise.
- A manager-on-the-phone during lunch while the ISP portal shows green is recognizable in the prose — visibility is judged by whether headquarters knows lunch is at risk, not by dashboard feature lists.
- Alert ownership, site history, and fleet-consistent views feel like the same class of problem, not unrelated monitoring topics.
