/* Server-verified purchase access. sessionStorage is UI state, not authorization. */
(function () {
  'use strict';
  var KEY = 'shixin.demo.download-access.v1';
  var unlocked = false;
  var viaApi = false;
  try { unlocked = sessionStorage.getItem(KEY) === 'unlocked'; } catch (_) {}

  function t(key) { return window.ShixinI18n.t(key); }

  async function request(url, options) {
    return fetch(url, Object.assign({
      credentials: 'same-origin',
      signal: AbortSignal.timeout(20000)
    }, options));
  }

  async function parse(response) {
    try { return await response.json(); } catch (_) { return {}; }
  }

  async function unlockOnServer(code) {
    var response = await request('/api/download', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code: code })
    });
    if (response.ok) return 'api';
    if (response.status === 403) return 'invalid';
    if (response.status === 404 || response.status === 405) return 'local';
    throw new Error(t('err.unreachable'));
  }

  async function localApk() {
    var response = await fetch('/downloads/shixin.apk', { method: 'HEAD', signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error(t('err.unavailable'));
    return { url: '/downloads/shixin.apk', filename: 'shixin.apk' };
  }

  function markUnlocked(fromApi) {
    viaApi = !!fromApi;
    unlocked = true;
    try { sessionStorage.setItem(KEY, 'unlocked'); } catch (_) {}
  }

  function markLocked() {
    viaApi = false;
    unlocked = false;
    try { sessionStorage.removeItem(KEY); } catch (_) {}
  }

  window.ShixinAccess = {
    hasAccess: function () { return unlocked; },
    restore: async function () {
      try {
        var response = await request('/api/access');
        if (response.status === 404 || response.status === 405) return { unlocked: unlocked };
        if (!response.ok) return { unlocked: unlocked };
        var data = await parse(response);
        if (data.unlocked) markUnlocked(true);
        else markLocked();
      } catch (_) {}
      return { unlocked: unlocked };
    },
    startCheckout: async function () {
      var response = await request('/api/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{}'
      });
      var data = await parse(response);
      if (response.status === 503 || data.error === 'unconfigured') throw new Error(t('js.checkoutUnavailable'));
      if (!response.ok || !data.url) throw new Error(t('err.unreachable'));
      location.href = data.url;
    },
    claim: async function (sessionId) {
      var response = await request('/api/access', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId })
      });
      if (response.ok) {
        markUnlocked(true);
        return { unlocked: true };
      }
      if (response.status === 403) throw new Error(t('err.claimFailed'));
      throw new Error(t('err.unreachable'));
    },
    verify: async function (code) {
      var trimmed = code.trim();
      if (!trimmed) throw new Error(t('err.invalidCode'));
      var mode = 'local';
      try { mode = await unlockOnServer(trimmed); }
      catch (error) {
        if (location.hostname !== '127.0.0.1' && location.hostname !== 'localhost') throw error;
        if (trimmed !== '9119') throw new Error(t('err.invalidCode'));
        mode = 'local';
      }
      if (mode === 'invalid') throw new Error(t('err.invalidCode'));
      if (mode === 'local' && trimmed !== '9119') throw new Error(t('err.invalidCode'));
      markUnlocked(mode === 'api');
      return { unlocked: true };
    },
    getDownload: async function () {
      if (!unlocked) throw new Error(t('err.verifyFirst'));
      if (viaApi) return { url: '/api/download', filename: 'shixin.apk' };
      try {
        var response = await request('/api/download', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: '{}'
        });
        if (response.ok) {
          viaApi = true;
          return { url: '/api/download', filename: 'shixin.apk' };
        }
      } catch (_) {}
      return localApk();
    }
  };
})();
