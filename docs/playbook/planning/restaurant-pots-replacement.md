# Editorial Worksheet

## Article

Restaurant POTS Replacement

---

## Library Context

This article is the **legacy infrastructure modernization** step in the Restaurant Technology research library — specifically the part most restaurant groups avoid until the analog layer forces the issue.

It should **naturally follow** `Restaurant Network Checklist`. By the time a reader finishes the network checklist work, they have proven (in the field) whether their modern connectivity and network standards actually operate the way leadership expects. The next operational risk hiding in the same telecom closet is often the **remaining analog layer**: copper lines supporting life-safety, security, emergency calling, fax, and other “forgotten” dependencies that can quietly become the next opening delay, compliance failure, or high-stakes outage.

This article exists to answer the question:

**How do we modernize the remaining analog infrastructure without creating operational or life-safety risk?**

It does **not** exist to relitigate vendor governance, technology standards, networking architecture, internet procurement, visibility strategy, opening coordination, field network validation, or outage response. Those topics already have owners in the restaurant library. This page should reference and link to them where needed, then return to what it uniquely owns: **safe, strategic analog retirement.**

---

## Purpose

**How do we modernize the remaining analog infrastructure (POTS/copper lines and the systems that depend on them) without creating operational, inspection, or life-safety risk — and in what sequence should we inventory, classify, replace, test, document, and retire those lines across a multi-location restaurant fleet?**

This is an executive decision about **risk, sequencing, ownership, and governance** — not a product comparison exercise and not a “telecom cleanup” project.

---

## This Article Owns

The concepts this article should become the authoritative resource for.

- **POTS replacement as dependency modernization**: reframing the project as “preserve required business and safety functions” rather than “replace phone lines”
- **Site-by-site analog line inventory**: what must be captured for each line before any disconnection (phone number, carrier, monthly cost, location, demarc/closet, device served, vendor owner, criticality, inspection requirements)
- **Analog dependency mapping**: how to trace lines to endpoints in real restaurants (fire panel, burglar alarm, elevator/emergency phone, fax, POS backup, building systems) when documentation is missing
- **Risk classification of lines**: separating low-risk lines from high-risk life-safety / inspection-sensitive / revenue-impacting dependencies
- **Life-safety and compliance constraints**: why fire alarm / elevator / emergency communications cannot be “modernized like IT,” and what “sign-off” means in practice (alarm vendor + often AHJ)
- **Replacement pattern decision framework (category-level)**: mapping dependency types to *classes* of replacement approaches (e.g., IP-native replacement, cellular communicator/gateway, ATA bridging, managed replacement) without ranking specific products
- **Migration sequencing and prioritization**: how better operators prioritize sites and lines (carrier retirement timelines, inspection schedules, recurring cost exposure, unknown lines, remodels/openings, geographic constraints)
- **Validation before disconnecting**: what “tested” means for each category (signal validation, emergency calling behavior, battery backup expectations, monitoring/alerting, rollback plan)
- **Cutover coordination as the hard part**: coordinating alarm vendors, landlords, inspectors, IT, operations, and store schedules around windows that do not disrupt service
- **“Complete” definition and governance after cutover**: replacement isn’t done at disconnect; it’s done when inventory is updated, ownership is clear, monitoring/support is defined, and new stores cannot recreate the analog debt
- **Recurring cost reduction without operational risk**: how to pursue telecom savings only after risk and validation are satisfied (and how to avoid false savings)

---

## This Article Does NOT Own

Topics that belong to other articles.

Mention briefly.

Link instead of repeating.

- **Who owns vendor relationships and escalation** → `Restaurant Vendor Sprawl`
- **What every location should look like (the blueprint)** → `Restaurant Technology Standardization`
- **Network architecture (segmentation, failover design, remote access)** → `Restaurants Networking`
- **Connectivity procurement (carrier selection, redundancy patterns, tiering)** → `Best Internet for Restaurants`
- **Fleet monitoring and alert ownership (ISP portal vs store health)** → `Restaurant Network Visibility`
- **Opening sequencing and go-live sign-off** → `Restaurant Opening Technology Checklist`
- **Field network validation checklists and audit cadence** → `Restaurant Network Checklist`
- **What to do during a live service outage** → `Restaurant Internet Outages`

---

## Reader Arrives Because...

What operational situation caused someone to search for this topic?

- A **carrier notice** (copper retirement, grandfathering, price increase, discontinuance) forced the question on a timeline leadership did not choose
- A **new store opening** or remodel is delayed because a POTS line cannot be provisioned in time to pass fire inspection
- Finance found **recurring line items nobody can explain** across dozens of locations and wants to cut cost without breaking alarms
- An **alarm monitoring company** reports a panel stopped communicating, and the team cannot confidently trace which line it uses
- A **fire / elevator / emergency communications inspection** triggered questions the team cannot answer (“what line does this use, and what happens if it fails?”)
- The brand modernized “everything else” (POS, networking, connectivity, visibility) and now needs to address the **remaining analog layer** before it becomes the next operational incident
- An acquisition introduced new locations with unknown alarm vendors and telecom closets, and leadership wants a safe portfolio plan instead of site-by-site panic

---

## Reader Leaves Knowing...

After reading this article, what should they understand that they didn't before?

- POTS replacement is **rarely a phone project**; it is a **dependency-mapping and risk-governed modernization program**
- The first milestone is **inventory**, not purchasing replacement devices
- Which analog lines can be eliminated, which must be replaced, and which require **life-safety / code-driven constraints** and explicit sign-off
- How to think in **replacement patterns** (category-level) without turning the project into a product shootout
- Why **testing and documentation** are the real deliverables (and what “tested” means for life-safety and emergency dependencies)
- How to sequence a rollout that reduces recurring cost **without increasing operational or compliance risk**
- How to prevent the next wave of openings, remodels, franchise exceptions, or acquisitions from **recreating analog debt**

---

## Editorial Promise

Finish this sentence.

"This article will never become..."

...a ranked list of POTS replacement products, a telecom sales guide, a VoIP vendor comparison, or a generic “cut your phone bill” checklist. It will stay a practical decision framework for safely retiring analog dependencies — with life-safety constraints, sequencing, and validation as the center of the story.

---

## Primary Observation

What common assumption does this article challenge?

One sentence.

**If a line still has dial tone, it must be safe to disconnect later — when in reality the lines that “never fail” are often the ones nobody has tested, documented, or owned, and those are the lines most likely to create life-safety or inspection risk when modernized in a rush.**

---

## Operational Story

Describe the real-world operational situation that anchors this article.

Think in scenes.

- **Scene 1 — opening delay at the fire inspection**: The store is built, training is scheduled, and the only open item is a fire alarm communication requirement tied to a line nobody can provision in time. The “phone line” becomes the critical path to revenue.
- **Scene 2 — the invoice nobody can explain**: Finance flags dozens of recurring copper charges. IT wants to cancel. Facilities is not sure what the line serves. Security thinks it’s the alarm. Nobody wants to own the risk of being wrong.
- **Scene 3 — alarm signal failure**: The monitoring company calls. A panel stopped reporting. The store isn’t “down,” but a life-safety requirement is now out of compliance. The team is tracing lines in a closet during lunch.
- **Scene 4 — the rushed migration after a carrier notice**: A retirement letter compresses what should be a staged, validated program into a rushed cutover window. The cost savings are obvious. The risk is not, until it shows up in testing and sign-offs.

This article should stay anchored in these scenes: **operations, inspections, and risk**, not “telecom modernization” as a technology upgrade.

---

## Major Sections

List only.

No content.

1. The analog layer you forgot still runs critical systems (opening scene)
2. Why POTS replacement becomes urgent (carrier retirement, inspections, invoices, failures)
3. What analog lines usually support in restaurants (dependency map by category)
4. The five biggest mistakes we see (disconnecting unknown lines, treating it as VoIP, skipping sign-off, testing after cutover, optimizing cost first)
5. The readiness framework: Inventory → Classify → Choose patterns → Validate → Govern
6. Life-safety and compliance realities (what “approval” and “documentation” mean)
7. Sequencing and prioritization across a fleet (risk first, then cost)
8. Validation and cutover discipline (what must be proven before disconnect)
9. Governance after modernization (inventory updates, monitoring, ownership, “don’t recreate copper” standards)

---

## Executive Takeaway

If an executive remembers one sentence six months later, what should it be?

**Treat POTS replacement like life-safety and operational risk modernization: inventory every line, validate replacements with the system owner before disconnect, and only then take the recurring savings.**

---

## Read Before

Which article naturally comes before this one?

**Restaurant Network Checklist** — once the modern network and connectivity standards have been validated in the field, the next hidden risk is the analog layer in the same closets. This article assumes the reader understands the difference between “installed” and “verified” and is ready to apply that same discipline to legacy analog dependencies.

---

## Read Next

Which article naturally follows this one?

**Restaurant Internet Outages** — after modernization, you still need a response posture for the moments when something fails during service. This article reduces the chance that analog dependencies create the next emergency; Internet Outages owns the first-five-minutes playbook when a store is already hurting during lunch.

(Secondary follow-on, when the reader needs business-case math rather than decision framing: `POTS Replacement Savings Calculator`.)

---

## Internal Links

Which restaurant articles should this page link to instead of repeating?

- `Restaurant Vendor Sprawl` (ownership and escalation across alarm, telecom, and facilities vendors)
- `Restaurant Technology Standardization` (how to prevent new analog dependencies from being introduced)
- `Restaurants Networking` (reference architecture context; do not reteach design)
- `Best Internet for Restaurants` (connectivity patterns; do not compare carriers here)
- `Restaurant Network Visibility` (monitoring/alert ownership; only referenced where replacement services require monitoring)
- `Restaurant Opening Technology Checklist` (opening sequencing; referenced when analog dependencies become opening milestones)
- `Restaurant Network Checklist` (field validation discipline; referenced as the preceding step)
- `Restaurant Internet Outages` (live-incident response; referenced for when something fails during service)

---

## Overlap Check

List ideas already owned by another article that should not be repeated here.

- Detailed **vendor governance models** (TEM vs MSP vs consolidation, contract calendars, escalation ownership mechanics) — owned by `Restaurant Vendor Sprawl`
- The **standard store blueprint** and format templates — owned by `Restaurant Technology Standardization`
- **Network topology, segmentation, failover design, SD-WAN guidance** — owned by `Restaurants Networking`
- **Carrier selection, circuit tier guidance, redundancy procurement** — owned by `Best Internet for Restaurants`
- **Monitoring strategy and alert routing** — owned by `Restaurant Network Visibility`
- **Opening coordination playbooks and certification mechanics** — owned by `Restaurant Opening Technology Checklist`
- **Network field checklist items** (VLAN verification, failover under load procedures, audit cadence for network) — owned by `Restaurant Network Checklist`
- **First-five-minutes outage response playbook** — owned by `Restaurant Internet Outages`
- Product shootouts, “best devices,” or “top vendors” for POTS replacement — explicitly out of scope for this library’s decision framing

---

## Success Test

The article is complete when:

- It follows the Crimson Technology Playbook.
- It sounds like the same author as Restaurant Internet Outages.
- Every section introduces a new idea.
- Operations come before technology.
- It teaches a decision framework rather than describing products.
- The article owns its topic without unnecessary overlap.
- The reader can explain: **which analog lines exist, what depends on them, which can be eliminated, which must be replaced, and what must be validated before disconnecting.**
- Life-safety constraints are treated as **central**, not as a footnote.
- The article could not be retitled “Best POTS Replacement Products” without breaking the editorial promise.

