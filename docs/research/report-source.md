# BebaTips Audience, Product, Data and Monetization Research

Audience: BebaTips owner and future product/development agents  
Date: 7 September 2026  
Geography: Kenya first; East Africa second  
Scope: football audience demand, pre-bet decision needs, free data feasibility, organic traffic, advertising/affiliate constraints, and the next product build

## Executive answer

BebaTips should be positioned as a mobile-first football information and decision-support site, not as a page of unsupported “sure bets.” The strongest repeat-use product loop is: check fixtures/results, inspect table and recent form, open a matchup page, use a transparent statistical signal or calculator, then optionally visit clearly separated premium or licensed-bookmaker pages.

The first implementation priorities are:

1. Reliable automatic fixtures with explicit source/freshness and no stale sample matches masquerading as live data.
2. Multi-league tables with W/D/L, goals, goal difference and recent form.
3. Useful evergreen tools: returns, accumulator and implied-probability calculators.
4. Rich matchup pages: recent form, head-to-head, home/away performance, injuries/lineups when the selected data tier supports them.
5. Original, dated previews with named authors, methods and reviewed results/archive.
6. A separate bookmaker comparison area containing only verified licensed operators and clearly labeled sponsored links.

## Evidence and implications

### Audience and experience

GeoPoll’s 2026 six-country mobile survey reports that 95% of active bettors use mobile and football is the principal betting sport for 67%. Its separate football survey reports particularly high football-betting engagement in Kenya. These are rapid mobile surveys rather than nationally representative censuses, but they strongly support a fast, low-data, mobile-first product rather than a desktop-heavy portal.

Product implication: prioritize fast fixture lookup, compact tables, clear tap targets, saved league/date state, and shareable match pages. Avoid heavy autoplay media or ad density that blocks the core task.

Sources: [GeoPoll Betting in Africa 2026](https://www.geopoll.com/blog/betting-africa-2026/), [GeoPoll Africa Football Survey 2026](https://www.geopoll.com/blog/football-survey-2026/).

### What users need before a football bet

The most defensible decision-support feature set is recent form, absences/injuries, fixture congestion, table strength, home/away context, likely lineups, head-to-head, and price/implied probability. A 2026 priority study indexed by Korea Citation Index identifies recent form, injuries/absences and schedule congestion as core reference factors. Football prediction research also consistently treats rankings/form, team strength and home advantage as inputs; no model removes football’s uncertainty.

Product implication: label computed outputs “signals” or “model estimates,” expose the basis, data source and update time, and track past performance. Do not imply certainty.

Sources: [KCI football betting decision-factor study](https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003358672), [Betting the system: Using lineups to predict football scores](https://arxiv.org/abs/2210.06327), [Football betting market forecasting study](https://arxiv.org/abs/2403.16282).

### Free-data feasibility

No single unlimited free source reliably supplies every desired feature. football-data.org’s registered free tier is documented at 10 requests/minute and covers fixtures/results and standings for accessible competitions. API-Football advertises a $0 tier with 100 requests/day and broad endpoints including fixtures, standings, H2H, injuries, lineups, odds and predictions, but its season/coverage limits and low daily quota require caching and selective use. TheSportsDB’s public v1 key is documented at 30 requests/minute, but free methods and returned records are limited and should be a secondary source.

Product implication: use one bulk football-data.org fixtures request, cache standings, and never fan out one request per league on every page load. Add API-Football later only for selected high-interest match detail pages, where a 100/day quota can be budgeted. Keep a source health indicator and return an honest empty state when providers have no current data.

Sources: [football-data.org policies](https://docs.football-data.org/general/v4/policies.html), [football-data.org quickstart](https://www.football-data.org/documentation/quickstart), [API-Football pricing](https://www.api-football.com/pricing), [TheSportsDB documentation](https://www.thesportsdb.com/documentation).

### Search and content strategy

Google’s current guidance emphasizes original, people-first content, clear authorship/method, and substantial added value. It classifies mass-generated, low-value pages and thin affiliate pages as spam risks. Useful comparisons and original analysis can add value; copied bookmaker descriptions cannot.

Product implication: do not auto-generate hundreds of near-identical “prediction” pages. Publish fewer, richer match pages and previews with source attribution, model method, updated time and a result-review archive. Build tools users bookmark rather than pages created only for keywords.

Sources: [Google people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies), [Google SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

### Ads, affiliates and Kenyan compliance

Google treats bookmaker, sports-betting and gambling-affiliate pages as restricted publisher content outside its listed exception countries; Kenya is not listed. Educational gambling content may be treated differently, and general football information can remain a cleaner advertising environment. Google also requires affiliate links to be identified appropriately and warns against thin affiliate content.

Kenya’s Gambling Control Act 2025 requires gambling advertising to indicate addiction risk, responsible play and exclusion of children, and prohibits misleading positive impressions. A 2026 advertising-regulations document on the regulator’s site is marked draft; it proposes further approval, targeting and content restrictions. Legal review is required before activating bookmaker campaigns or strong gambling calls to action.

Product implication: separate neutral football tools/content from commercial bookmaker pages; remove “guaranteed,” “sure income,” and invented success claims; make 18+/responsible-play messaging prominent; activate only verified licensed affiliate partners after compliance review.

Sources: [Google online gambling publisher restriction](https://support.google.com/publisherpolicies/answer/10437963?hl=en), [Google Ads gambling policy](https://support.google.com/adspolicy/answer/15132179?hl=en), [Kenya Gambling Control Act 2025](https://gra.go.ke/wp-content/uploads/2026/03/Gambling-Control-Act.pdf), [Draft 2026 advertising regulations](https://gra.go.ke/wp-content/uploads/2026/03/18.03.26-DRAFT-GRA-ADVERTISING-REGULATIONS.-2026.pdf).

## Recommended product architecture

- Match Centre: upcoming fixtures, recent results, league/date filters, source status and refresh time.
- League Centre: full tables, recent form, scorers when available, and league-specific fixtures/results.
- Match Analysis: form, table position, home/away performance, H2H, absences, lineups, model signal, uncertainty and source freshness.
- Tools: returns, accumulator, implied probability, odds converter and bankroll education.
- Editorial: original previews, explainers, weekly review and transparent prediction archive.
- Commercial: premium products and verified bookmaker comparisons in clearly labeled, separate sections.
- Trust: methodology, authors, corrections, affiliate disclosure, privacy, responsible gambling and 18+ safeguards.

## Research limitations

- Survey evidence is mobile-panel research and is not fully representative of every Kenyan bettor.
- Search intent priorities are inferred from audience research, current search guidance, common football data workflows and available APIs; no paid Kenya-specific keyword-volume database was available.
- API coverage and quotas can change and must be checked before launch.
- The 2026 Kenyan advertising regulations source is explicitly a draft. This report is product research, not legal advice.

## Claim-to-source ledger

| Claim | Primary/supporting source | Confidence | Notes |
|---|---|---:|---|
| The market is mobile-first and football-led | GeoPoll Betting in Africa 2026; GeoPoll Football Survey 2026 | Medium-high | Large rapid mobile samples; not population-weighted |
| Recent form, absences and congestion matter to bettors | KCI 2026 decision-factor study | Medium | Indexed abstract available; population is not Kenyan |
| Free football-data tier is 10 requests/minute | football-data.org API policies | High | Official current documentation |
| API-Football free tier is 100 requests/day with broad endpoints | API-Football pricing | High | Official current pricing; coverage limits apply |
| TheSportsDB public key has 30 requests/minute | TheSportsDB documentation | High | Official documentation; endpoint result limits apply |
| Helpful original content is preferable to scaled/thin affiliate pages | Google Search Central | High | Official search policy/guidance |
| Gambling affiliate content has restricted AdSense serving in Kenya | Google Publisher Restrictions | High | Official policy; policy application remains Google’s decision |
| Kenyan law requires responsible-gambling warnings and bans misleading ads | Gambling Control Act 2025, section 87 | High | Primary statute |
| Additional 2026 ad restrictions are proposed | Draft GRA advertising regulations | Medium | Clearly labeled draft, not treated as final law |

## Stop condition

Research stopped after the audience, feature-priority, free-data, search-quality, monetization and Kenyan compliance questions had direct support and an additional broad search was unlikely to change the first implementation priorities. Product-specific API behavior still requires runtime measurement.
