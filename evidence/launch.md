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

GSC/Bing submission and analytics/advertising setup have not been performed. After domain verification, submit sitemap, monitor queries and improve guides using confirmed gameplay data before seeking an advertising account. No revenue forecast.

SEO used the parent chat's existing gefei trend findings. No new gefei queries, request IDs or credits in this chat (0 additional credits).


## Access incident and mitigation — 19:40–19:47 Asia/Shanghai

User reported that apex could not open. Normal DNS queries on the current network still returned old registrar parking addresses, causing TLS internal errors. All three DNSOWL authoritative nodes returned only Vercel addresses. Cloudflare HTTPS DNS query returned the correct addresses, while UDP DNS on this network continued returning old records. This distinction means the current network's resolver path remains stale; do not assume every named UDP resolver query is an independent global signal.

Removed www and default Vercel domain redirects through Vercel's domain API, and removed matching host redirects from vercel.json. Commit 331d6d9 deployed automatically to production dpl_W8w7QqbTHXUd5UPBtML1SmmHcmDh, READY. www.lagoslifehelper.com and lagos-life-helper.vercel.app now directly serve HTTP 200 with valid HTTPS. A real browser loaded the www homepage and navigated to the calculator. Site navigation uses relative paths and stays on the working www host. Cloudflare DNS purge request queued; Google's embedded purge tool could not load on this network.

Keep the direct access entrances until ordinary apex HTTPS and real browser navigation work. Do not restore forced apex redirects merely because authoritative DNS or pinned HTTPS works. Apex remains the canonical origin; site content and sitemap are unchanged. Signed-in UI screenshots remain local.
