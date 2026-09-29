/*
 * GA4 with Google Consent Mode v2, for Revitt's owned sites. Same model as
 * revitt.co: every consent signal starts denied, so Google gets cookieless,
 * redacted pings until the visitor presses Accept on the banner.
 *
 * Load in <head>:
 *   <script defer src="/consent-analytics.js" data-ga-id="G-XXXX" data-privacy-url="…"></script>
 * Any element with a data-cookie-settings attribute reopens the banner, as
 * does window.revittConsent.open().
 */
(function () {
  var script = document.currentScript;
  var id = script && script.getAttribute('data-ga-id');
  if (!id) return;
  var privacyUrl = script.getAttribute('data-privacy-url') || 'https://revitt.co/privacy';
  var KEY = 'revitt-analytics-consent';

  function stored() {
    try {
      var v = localStorage.getItem(KEY);
      return v === 'granted' || v === 'denied' ? v : null;
    } catch {
      return null;
    }
  }
  function signals(state) {
    return {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state,
    };
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  var choice = stored();
  gtag('consent', 'default', signals(choice === 'granted' ? 'granted' : 'denied'));
  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', true);
  gtag('js', new Date());
  gtag('config', id);

  var tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
  document.head.appendChild(tag);

  var banner = null;

  function choose(state) {
    try {
      localStorage.setItem(KEY, state);
    } catch {}
    gtag('consent', 'update', signals(state));
    close();
  }
  function close() {
    if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
    banner = null;
  }
  function button(label, primary, onClick) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    b.style.cssText =
      'min-height:44px;padding:8px 18px;font:inherit;font-weight:600;cursor:pointer;border:1px solid currentColor;' +
      (primary ? 'background:#edf2e6;color:#0a0c08;border-color:#edf2e6;' : 'background:transparent;color:inherit;');
    b.addEventListener('click', onClick);
    return b;
  }
  function open() {
    if (banner) return;
    banner = document.createElement('div');
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Analytics consent');
    banner.style.cssText =
      'position:fixed;left:12px;right:12px;bottom:12px;z-index:2147483000;max-width:28rem;margin-left:auto;' +
      'background:#0a0c08;color:#edf2e6;border:1px solid #3a4035;padding:16px;font:14px/1.5 system-ui,sans-serif;' +
      'box-shadow:0 12px 32px -12px rgba(0,0,0,.5)';
    var p = document.createElement('p');
    p.style.margin = '0 0 12px';
    p.appendChild(
      document.createTextNode(
        'With your consent we use Google Analytics to see how this site is used and which links bring visitors. We never sell your data. '
      )
    );
    var a = document.createElement('a');
    a.href = privacyUrl;
    a.textContent = 'Privacy policy';
    a.style.color = 'inherit';
    p.appendChild(a);
    var row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap';
    row.appendChild(button('Decline', false, function () { choose('denied'); }));
    row.appendChild(button('Accept', true, function () { choose('granted'); }));
    banner.appendChild(p);
    banner.appendChild(row);
    document.body.appendChild(banner);
  }

  window.revittConsent = { open: open };
  document.addEventListener('click', function (event) {
    var target = event.target;
    if (target && target.closest && target.closest('[data-cookie-settings]')) {
      event.preventDefault();
      open();
    }
  });
  if (!choice) {
    if (document.body) open();
    else document.addEventListener('DOMContentLoaded', open);
  }
})();
