# BebaTips Growth Strategy

## The direction

BebaTips should become the mobile football page people open before a match: current fixtures, results, full tables, recent form, matchup context, transparent statistical signals and quick odds tools. Premium analysis and bookmaker comparisons can monetize that audience, but they should not overwhelm the useful football product.

## Why this direction fits Kenya

GeoPoll’s 2026 research describes African betting as overwhelmingly mobile and football-led, with Kenya among the most engaged markets. That makes speed, compact match information and repeat daily usefulness more important than adding decorative pages. ([Betting in Africa 2026](https://www.geopoll.com/blog/betting-africa-2026/), [Africa Football Survey 2026](https://www.geopoll.com/blog/football-survey-2026/))

Research on football-betting decisions highlights recent form, injuries or absences and fixture congestion. Those should become the core of match analysis, alongside table strength, home/away performance, H2H and likely lineups. ([KCI decision-factor study](https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003358672))

## Product priorities

1. **Match Centre:** trustworthy fixtures/results, exact dates, league filters, source status and update time.
2. **League Centre:** full tables, recent form, goals, scorers and league fixtures.
3. **Match Analysis:** recent results, home/away splits, H2H, absences, likely lineups and transparent model signals.
4. **Free tools:** returns, accumulator, implied-probability, odds-conversion and bankroll education.
5. **Original editorial:** dated previews, named authors, clear method, corrections and weekly result reviews.
6. **Commercial pages:** verified premium products and licensed bookmaker comparisons, clearly separated and disclosed.

## Free-data plan

- Use football-data.org for bulk fixtures/results and standings. Its free tier is limited to 10 requests/minute, so requests must be cached and consolidated. ([Official API policies](https://docs.football-data.org/general/v4/policies.html))
- Keep TheSportsDB as a secondary public schedule source, not the sole production dependency. ([Official documentation](https://www.thesportsdb.com/documentation))
- Add API-Football selectively on popular match pages for H2H, injuries, lineups and predictions. Its free tier advertises 100 requests/day, so it cannot be called for every fixture or page view. ([Official pricing](https://www.api-football.com/pricing))

## Traffic and monetization rules

Google recommends original, people-first content with clear authorship and added value, and warns against thin affiliate and mass-generated pages. BebaTips should publish fewer, richer pages that people bookmark and share. ([Google people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies))

Google restricts ad serving on gambling-affiliate content for users in countries including Kenya, while educational content can be treated differently. General football data and tools should therefore remain the main product; commercial promotions belong in separate sections. ([Google publisher restriction](https://support.google.com/publisherpolicies/answer/10437963?hl=en))

Kenya’s Gambling Control Act 2025 requires addiction and responsible-play messaging, excludes children and prohibits misleading positive impressions. Do not publish “guaranteed,” “sure income,” invented win rates or fake success stories. Verify legal and regulatory requirements before activating bookmaker campaigns. ([Gambling Control Act 2025](https://gra.go.ke/wp-content/uploads/2026/03/Gambling-Control-Act.pdf))

## Delivery roadmap

### Completed foundation

- Bulk automatic fixtures and nearest upcoming matchday
- Multi-league table with form
- Transparent table-strength signals
- Free returns and accumulator calculator
- Responsible-play notice and guidance
- Separate bookmaker review area with inactive links

### Next build

- Quota-aware match details: recent form, H2H, injuries and lineups
- Data freshness/source health UI
- Prediction result archive and model-performance reporting
- Author profiles, methodology and editorial publishing workflow
- Search metadata, sitemap, structured data and analytics
- Verified affiliate catalogue and compliant campaign process
- Durable orders, Daraja payment verification and post-payment delivery

This strategy is product and market research, not legal advice. The detailed evidence ledger and limitations are maintained in the internal research source document.
