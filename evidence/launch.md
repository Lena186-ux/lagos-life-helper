# Launch evidence — 11 October 2026

- Production: https://lagoslifehelper.com/
- GitHub: https://github.com/Lena186-ux/lagos-life-helper (public, main)
- Vercel project: lagos-life-helper, team a18720995650-6743s-projects
- Deployment: dpl_AuVW5B5TY5msfckahNeDyqoNKcVQ, Ready; alias verified by vercel inspect.
- Build: ten static pages; origin https://lagoslifehelper.com.
- All ten pages, stylesheet, calculator script, favicon, sitemap.xml and robots.txt return public HTTP 200. Unknown route returns 404. Canonicals match each public production route.
- Desktop homepage reviewed. Viewports 390px and 768px: scrollWidth equals viewport width. Mobile form and desktop calculation inspected in a real browser.
- Calculator sample (illustrative numbers, not game data): pay 10000, shifts 5, rent 20000, loan 5000, costs 7000, reserve 3000, cash 40000, immediate costs 10000. Results: income 50000, bills 32000, surplus 15000, rent share 40%, break-even 4 shifts, cash after costs 30000.
- Zero pay with bills: no finite break-even; undefined rent/income ratio; deficit displayed. Cash below immediate costs gives separate cash shortfall. Clear removes results and values.
- No automated test suite added or run. Build, public HTTP checks and browser interaction used for release verification.

## Custom domain verification

User confirmed purchase and authorized binding lagoslifehelper.com. NameSilo shows Active with expiry 2027-10-11. Existing DNSOWL nameservers and _domainconnect TXT preserved. Parking records replaced with Vercel's recommended A records (@ 216.198.79.1 and 64.29.17.1), and www CNAME af302162888a6f0e.vercel-dns-017.com. See domain-dns.jpg.

Vercel verified apex and www as configured correctly. HTTPS requests pinned to the new Vercel address passed certificate verification, returned 200 for all ten pages, robots and sitemap, and 404 for an unknown route. Sitemap uses the custom apex. www and lagos-life-helper.vercel.app return 308 to apex preserving /jobs/.

At 19:24 Asia/Shanghai on 11 October, authoritative DNS and Cloudflare resolve the new records, while Google DNS and the local browser still cache the old parking address. Ordinary apex requests can temporarily fail TLS until caches expire. Do not bypass certificate warnings. Production HTTPS on the new address is valid, but browser custom-domain QA awaits propagation.

## GitHub automatic deployment

User explicitly authorized GitHub automatic deployment integration and confirmed saving the existing Vercel App permissions for only the new repository, preserving previous selections. GitHub confirmed Installation Completed; Vercel CLI confirmed Connected to Lena186-ux/lagos-life-helper. Verified by a real main push: commit a297eb49aa1f2260d4d9e193aae8bc4f26d8766b created production deployment dpl_CJRKZoFVTVQJP9L8i4xL31jzDMfN with source git and state READY. Vercel inspect confirms apex and www aliases; HTTPS on the new address returned 200. The signed-in settings screenshot is kept locally and is not published to the public repository.

## Remaining follow-up

The initial launch did not include search and analytics setup. See the 12 October setup record below for the current status. Advertising remains disabled; no revenue forecast.

SEO used the parent chat's existing gefei trend findings. No new gefei queries, request IDs or credits in this chat (0 additional credits).


## Access incident and mitigation — 19:40–19:47 Asia/Shanghai

User reported that apex could not open. Normal DNS queries on the current network still returned old registrar parking addresses, causing TLS internal errors. All three DNSOWL authoritative nodes returned only Vercel addresses. Cloudflare HTTPS DNS query returned the correct addresses, while UDP DNS on this network continued returning old records. This distinction means the current network's resolver path remains stale; do not assume every named UDP resolver query is an independent global signal.

Removed www and default Vercel domain redirects through Vercel's domain API, and removed matching host redirects from vercel.json. Commit 331d6d9 deployed automatically to production dpl_W8w7QqbTHXUd5UPBtML1SmmHcmDh, READY. www.lagoslifehelper.com and lagos-life-helper.vercel.app now directly serve HTTP 200 with valid HTTPS. A real browser loaded the www homepage and navigated to the calculator. Site navigation uses relative paths and stays on the working www host. Cloudflare DNS purge request queued; Google's embedded purge tool could not load on this network.

Keep the direct access entrances until ordinary apex HTTPS and real browser navigation work. Do not restore forced apex redirects merely because authoritative DNS or pinned HTTPS works. Apex remains the canonical origin; site content and sitemap are unchanged. Signed-in UI screenshots remain local.


## Apex browser verification completed

After the user reported apex success, a subsequent real in-app browser navigation directly to https://lagoslifehelper.com/ loaded the homepage. The tab URL was explicitly confirmed as the apex, without www. Clicking Budget tool loaded https://lagoslifehelper.com/budget-calculator/ with the calculator form, then the brand link returned to the apex homepage. No DNS override, certificate warning bypass, hosts edit or persistent network configuration change was used. A local screenshot was saved at /private/tmp/lagos-apex-browser-verified.jpg. This confirms browser access; it does not claim every global resolver has converged.


## Search and analytics setup — 12 October 2026

- GSC domain property sc-domain:lagoslifehelper.com: Settings explicitly confirms verified owner. Root TXT [recorded privately], TTL 3600, saved in NameSilo and observed through public HTTPS DNS. A/CNAME and unrelated TXT unchanged. HTTPS URL-prefix property also accessible with the global HTML verification tag preserved.
- Sitemap https://lagoslifehelper.com/sitemap.xml: Google confirmed successful submission, including a retry after the live fetch. Domain and URL-prefix sitemap reports currently say Couldn't fetch / unknown type / 0 discovered pages. Google live URL test at 23:06 explicitly confirms crawl allowed, fetch successful. Ordinary HTTPS fetch parses as valid XML with 10 canonical URLs. The report-level failure is not claimed resolved. Sitemap indexing itself is not required and no indexing request was submitted for the XML file.
- Bing site https://lagoslifehelper.com/ added through manual verification with [recorded privately]. Its site-specific Sitemaps page is accessible. Two manual sitemap submissions stayed Submitting without confirmation, and reloading showed no saved rows. No successful Bing sitemap submission is claimed yet. Existing Google account connection is visible, but its import flow requests renewed OAuth read-only sites/sitemaps + account email access. Automatic review rejected Continue without explicit scoped permission; user confirmation requested. Only this site will be imported if authorized; other sites and analytics will not be imported.
- GA4: Lagos Life Helper, property [recorded privately] in existing account [recorded privately]; Lagos Life Helper Web, stream [recorded privately], measurement [recorded privately]. China GMT+08 / CNY. Enhanced measurement: page views, scroll, outbound clicks and downloads; site search, forms and video disabled. Signals and ad personalization disabled in tag.
- GA4 real-time page report confirms 3 active users and 5 page views across /, /budget-calculator/ and /jobs/ during verification. Overview includes page_view, scroll, guide_navigation, session_start and budget_calculate. These observations include verification traffic and are not organic traffic claims. Tag Assistant independently found [recorded privately] and showed a sent page-view hit for Lagos Life Helper Web. Debugging was stopped after validation.
- Clarity: Lagos Life Helper, project [recorded privately], https://lagoslifehelper.com/. Strict text masking saved; Cookie setting off, consentv2 analytics grant only after opt-in, advertising denied, bot detection enabled. Its aggregate live notification showed 1 user online. Dashboard/heatmaps initially processing. Automatic review rejected opening an individual live recording; aggregate receipt was used instead. No individual visitor replay viewed.
- Website: initial and persisted rejection do not load vendor scripts. GA4-only and Clarity-only choices each load only the chosen provider; both load after Accept both; withdrawing consent reloads without vendor scripts. Calculator inputs explicitly masked; custom budget_calculate sends no values. Query/hash removed from configured page/referrer URLs. Privacy policy and permanent choice controls updated; preferences expire after 180 days.
- Build passed; no automated test suite added or run. Published through CLI when GitHub connectivity failed; subsequent push succeeded through commit b059c37. Current Ready code deployment dpl_DN6rNo4xduNy7vknA2ixR19nPXMw, primary alias https://lagoslifehelper.com. Official no-ads GA CSP endpoints allowed, persistent security restrictions retained.
- Account screenshots kept outside the public repository in ../lagos-life-helper-evidence/analytics/. No new paid Gefei tool calls; reused prior GSC guide req_955d6dc18d41161c, 0 additional credits.

## Search and analytics follow-up — 13 October 2026

- User explicitly authorized renewing Bing's read-only Google Search Console connection and importing only lagoslifehelper.com. Google account selection and consent completed with the same read-only Search Console and account identity scopes. Bing's OAuth callback remained blank; refreshing, opening the site-specific Sitemaps page, and using a fresh tab did not load usable controls. No site-selection or import confirmation was reached, so no new site import or successful sitemap submission is claimed. Other sites were not selected or imported.
- GSC domain Sitemaps report still displays Couldn't fetch / unknown / 0 URLs on recheck. Prior verified ownership, accepted submission and successful Google live fetch remain the available evidence; report-level processing is unresolved.
- Clarity now displays its populated aggregate dashboard: 2 sessions, 2 unique users, and budget_calculate / guide_navigation smart events. This includes setup validation traffic. No individual recording opened. Dashboard screenshot is private.
- No website code, DNS, security controls or unrelated projects changed in this follow-up. No new Gefei calls or credits.
