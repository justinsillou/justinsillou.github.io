---
title: "Data breaches in France: the summer everything gave way"
description: "The tax authority three times over, the education ministry, SFR, a medical software vendor: in a few weeks of summer 2026, France exposed its most sensitive files. What leaked, how, and what can still be done."
pubDate: 2026-08-21
tags: ["Security", "GDPR", "Tech watch"]
evergreen: true
widget: leaks
sources:
  - label: "CNIL — 2025 annual report"
    href: "https://www.cnil.fr/fr/rapport-annuel-2025"
  - label: "Bercy — Illegitimate access to the DGFiP information system"
    href: "https://presse.economie.gouv.fr/acces-illegitime-au-systeme-dinformation-de-la-direction-generale-des-finances-publiques/"
  - label: "education.gouv.fr — Security incident, July 2026"
    href: "https://www.education.gouv.fr/incident-de-securite-affectant-les-donnees-de-personnels-de-l-education-nationale-505407"
  - label: "ZATAZ — The education ministry confirms it was hacked"
    href: "https://www.zataz.com/le-ministere-de-leducation-confirme-son-piratage/"
  - label: "20 Minutes — SFR hit by a breach affecting its fibre subscribers"
    href: "https://www.20minutes.fr/high-tech/by-the-web/4240043-20260820-cyberattaque-encore-operateur-sfr-victime-fuite-donnees-affectant-abonnes-fibre"
  - label: "20 Minutes — Is the tax authority a digital sieve?"
    href: "https://www.20minutes.fr/high-tech/by-the-web/4239691-20260818-piratage-fisc-passoire-numerique-france-plus-vulnerable-autres-pays-europeens"
  - label: "Le HuffPost — The tax authority is not the only one getting hacked"
    href: "https://www.huffingtonpost.fr/france/article/il-n-y-a-pas-que-le-fisc-qui-se-fait-pirater-chaque-jour-des-milliers-de-donnees-fuitent-en-france_307468.html"
  - label: "C'est qui qui a fuité aujourd'hui ?"
    href: "https://bonjourlafuite.eu.org/"
  - label: "Have I Been Pwned"
    href: "https://haveibeenpwned.com/"
---

*A tracked post: the site is rebuilt every morning at 6:17, and the list of the
latest breaches at the bottom of the page follows automatically.*

A few years ago, a data breach made the headlines for a week. Today it gets a
short paragraph — when it gets one at all. Not because the subject has become any
less serious: because it has become a daily occurrence. Summer 2026 ran through
the tax authority, the education ministry, a telecoms operator and a medical
software vendor within days of each other, without any of it lasting more than
three days of coverage.

## The count

In its annual report, the CNIL recorded **6,167 data breach notifications in
2025**, 9.5% more than in 2024 and roughly 50% more than three years ago. In the
first quarter of 2026 alone, it had already counted more than 2,730. Half of these
breaches stem from hacking, and target public administration, healthcare and the
financial sector first.

The community-run tally at *[C'est qui qui a fuité aujourd'hui ?][blf]*, which only
keeps publicly documented breaches, shows the same trend seen from below: 43
breaches listed for 2024, 158 for 2025, more than 330 since January 2026. It is not
an exhaustive measure of reality — only of what becomes public.

## Summer 2026, in three cases

**The tax authority, three times over.** In February the DGFiP first acknowledged
illegitimate access to the national bank account register (FICOBA): roughly 1.2
million accounts, with identity, address, tax identifier and IBAN. At the end of
June, another intrusion, this time into the tax information system — civil status,
SPI number, family situation, reference tax income, withholding rate. On 18 August,
the finance ministry acknowledged two more: the land registry data server,
compromised in late July and revised up to around 1.8 million accounts, then the
unclaimed estates portal.

**The education ministry, four times.** 243,000 staff members in March, the
ÉduConnect platform in April, then the intrusion of the night of 25 July, made
public on the 31st. Initial access reportedly came through a VPN. The ministry
confirms the intrusion and the exfiltration, but is still investigating and has not
validated the claimed volumes: 43 GB, 2,500 files, data on pupils, parents,
teachers and staff from the Créteil and Versailles education authorities, as well
as from the national I-Prof platform.

**SFR.** On 20 August the operator confirmed a breach dating back to 2 July,
through an internal portal for managing fibre connections. The attacker claims a
little over 2.1 million records: title, surname, first name, address, mobile
number, contract identifier and technical line data. Account disabled, IPs blocked,
CNIL notified, complaint filed.

And in the background, in the same week: 6.8 million patients at a medical software
vendor, 3 million phone numbers at Bloctel — the do-not-call service, irony
included — 80,000 contacts at a contractor working for Santé publique France,
identity documents and IBANs at Suez.

## The common thread: nobody saw a thing

These three cases share the same profile. None of them required a sophisticated
exploit: an internal account, VPN access, a partner portal. No vault was forced
open — a legitimate key was used by someone else. Several press analyses also point
to the return of a basic access control flaw, known to developers for twenty years:
guessing the identifier of the neighbouring record.

The second common thread is more troubling. In almost every case, it was not the
victim's own monitoring that detected the intrusion: it was the attacker's public
claim, on a forum, weeks after the fact. The same pseudonym claims SFR, the
education ministry and the tax authority. Between the access and the announcement,
several weeks during which nobody on the defensive side raised a hand.

## Why this is not "just a password"

A password can be changed. An email address, at a stretch, can too. The rest,
no.

These databases contain **durable identity**: name, date of birth, address, tax
number, social security number, IBAN, reference tax income. Cross-referenced with
each other — and they are, that is the whole point of the market — they make it
possible to rebuild a credible file on a person. That is what then feeds:

- **targeted phishing**, with messages quoting your tax situation, your contract or
  your children's school, and therefore far harder to spot;
- **identity theft**, to open an account, take out a loan or obtain a duplicate
  document;
- **SIM swapping**, which consists of having your number transferred in order to
  intercept verification codes;
- **fraudulent direct debits**, when the IBAN is part of the batch.

The GDPR requires notification within 72 hours. It obviously does not require that
the data become secret again.

## What is within your reach

Neither the CNIL nor the GDPR can undo a breach. A few habits, however, cut off
most of the downstream exploitation:

1. **Check your exposure.** [Have I Been Pwned](https://haveibeenpwned.com/) for
   email addresses and phone numbers. Incomplete, but free and immediate.
2. **A unique password per service**, in a password manager. It is the only habit
   that stops a breach at A from opening an account at B.
3. **Two-factor authentication**, through an app rather than SMS — precisely
   because of SIM swapping.
4. **Watch your statements** if an IBAN has leaked. In France, an unauthorised
   direct debit can be disputed for 13 months, and for 8 weeks without
   justification in the case of an authorised one.
5. **Treat every incoming approach as suspicious.** Someone who knows your tax
   income is not thereby your local tax office. Hanging up and calling the official
   number back remains the best defence.
6. **Exercise your rights.** The organisation must inform you and state what
   leaked; failing that, you can file a complaint with the
   [CNIL](https://www.cnil.fr/).

## And on the developer side

None of the above involves advanced cryptography. A contractor account with no
second factor, an API with no rate limiting that lets a customer file be siphoned
off row by row, a sequential identifier you can increment, logs nobody reads. The
fundamentals, applied to **legitimate** access as much as to external access.

The useful question is not "can someone get in?", but: if an authorised access is
hijacked, how long does it take us to see it, and how many rows leave in the
meantime? For this summer's cases, the answer fits in one word: too many.

---

*A tracked post, updated as the news develops. The figures quoted are those
communicated by the organisations concerned, by the CNIL or by the press at the
time of writing; volumes claimed by attackers are not always confirmed, and are
flagged as such.*

[blf]: https://bonjourlafuite.eu.org/
