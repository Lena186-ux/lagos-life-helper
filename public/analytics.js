(() => {
  'use strict';
  const gaId = 'G-P4LZ4QKH28', clarityId = 'ywm3jbcb1h';
  const key = 'lagoslife-consent-v1', lifetime = 180 * 24 * 60 * 60 * 1000;
  const panel = document.querySelector('#privacy-settings');
  if (!panel) return;
  const gaChoice = panel.querySelector('#consent-ga');
  const clarityChoice = panel.querySelector('#consent-clarity');
  let enabled = {ga: false, clarity: false}, gaLoaded = false, clarityLoaded = false;
  let opener = null;
  function readChoice() {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value && value.version === 1 && value.expires > Date.now() &&
        typeof value.ga === 'boolean' && typeof value.clarity === 'boolean' ? value : null;
    } catch { return null; }
  }
  function cleanUrl(value) {
    try { const u = new URL(value); return u.origin + u.pathname; } catch { return ''; }
  }
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied'
  });
  function script(src) {
    const node = document.createElement('script'); node.async = true; node.src = src;
    document.head.append(node);
  }
  function enable(choice) {
    enabled = {ga: choice.ga, clarity: choice.clarity};
    if (!['lagoslifehelper.com', 'www.lagoslifehelper.com'].includes(location.hostname)) return;
    if (enabled.ga && !gaLoaded) {
      gaLoaded = true;
      window.gtag('consent', 'update', {analytics_storage: 'granted'});
      window.gtag('js', new Date());
      window.gtag('config', gaId, {
        page_location: cleanUrl(location.href), page_referrer: cleanUrl(document.referrer),
        allow_google_signals: false, allow_ad_personalization_signals: false,
        cookie_expires: 60 * 60 * 24 * 180
      });
      script('https://www.googletagmanager.com/gtag/js?id=' + gaId);
    }
    if (enabled.clarity && !clarityLoaded) {
      clarityLoaded = true;
      window.clarity = window.clarity || function () {
        (window.clarity.q = window.clarity.q || []).push(arguments);
      };
      window.clarity('consentv2', {analytics_Storage: 'granted', ad_Storage: 'denied'});
      script('https://www.clarity.ms/tag/' + clarityId);
    }
  }
  function eraseCookies(prefixes) {
    for (const entry of document.cookie.split(';')) {
      const name = entry.trim().split('=')[0];
      if (!prefixes.some(prefix => name.startsWith(prefix))) continue;
      for (const domain of ['', location.hostname, '.' + location.hostname]) {
        document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax; Secure' +
          (domain ? '; Domain=' + domain : '');
      }
    }
  }
  function show() {
    opener = document.activeElement;
    gaChoice.checked = enabled.ga; clarityChoice.checked = enabled.clarity;
    panel.hidden = false; panel.querySelector('button').focus();
  }
  function save(ga, clarity) {
    const old = enabled;
    const choice = {version: 1, ga, clarity, expires: Date.now() + lifetime};
    try { localStorage.setItem(key, JSON.stringify(choice)); } catch { /* Current page still works. */ }
    enabled = {ga, clarity};
    panel.hidden = true;
    if ((old.ga && !ga) || (old.clarity && !clarity)) {
      if (!ga) {
        window['ga-disable-' + gaId] = true;
        window.gtag('consent', 'update', {analytics_storage: 'denied'});
        eraseCookies(['_ga']);
      }
      if (!clarity) {
        if (clarityLoaded) window.clarity('consentv2', {analytics_Storage: 'denied', ad_Storage: 'denied'});
        eraseCookies(['_clck', '_clsk']);
      }
      // A fresh document removes previously loaded trackers, including cookieless tracking.
      location.reload();
      return;
    }
    enable(choice);
    if (opener && opener.isConnected) opener.focus();
  }
  document.querySelectorAll('[data-privacy-settings]').forEach(button => button.addEventListener('click', show));
  panel.querySelector('[data-consent="accept"]').addEventListener('click', () => save(true, true));
  panel.querySelector('[data-consent="reject"]').addEventListener('click', () => save(false, false));
  panel.querySelector('[data-consent="save"]').addEventListener('click', () => save(gaChoice.checked, clarityChoice.checked));
  panel.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const nodes = [...panel.querySelectorAll('a, button, input')];
    const first = nodes[0], last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  window.addEventListener('storage', event => {
    if (event.key === key) location.reload();
  });
  function track(name, params = {}) {
    if (!['lagoslifehelper.com', 'www.lagoslifehelper.com'].includes(location.hostname)) return;
    if (enabled.ga) window.gtag('event', name, {...params, page_location: cleanUrl(location.href)});
    if (enabled.clarity) window.clarity('event', name);
  }
  document.addEventListener('click', event => {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link) return;
    const u = new URL(link.href, location.href);
    if (u.hostname === 'lagoslife.app') track('official_game_click', {link_url: cleanUrl(u.href)});
    else if (u.origin === location.origin && ['/beginner-guide/', '/jobs/', '/housing/', '/budget-calculator/'].includes(u.pathname)) track('guide_navigation', {destination: u.pathname});
  });
  document.querySelector('#budget-form')?.addEventListener('submit', event => {
    if (event.target.checkValidity()) track('budget_calculate');
  });
  const choice = readChoice();
  if (choice) enable(choice);
  else if (location.pathname !== '/privacy/') show();
})();
