/* Local demo adapter. Replace this boundary with server-verified purchase access
   when integrating Stripe; sessionStorage is UI state, not authorization. */
(function () {
  'use strict';
  var KEY = 'shixin.demo.download-access.v1';
  var unlocked = false;
  var viaApi = false;
  try { unlocked = sessionStorage.getItem(KEY) === 'unlocked'; } catch (_) {}

  async function unlockOnServer(code) {
    var response = await fetch('/api/download', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ code: code }),
      signal: AbortSignal.timeout(15000)
    });
    if (response.ok) return 'api';
    if (response.status === 403) return 'invalid';
    if (response.status === 404 || response.status === 405) return 'local';
    throw new Error(window.ShixinI18n.t('err.unreachable'));
  }

  async function localApk() {
    var response = await fetch('/downloads/shixin.apk', { method: 'HEAD', signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error(window.ShixinI18n.t('err.unavailable'));
    return { url: '/downloads/shixin.apk', filename: 'shixin.apk' };
  }

  window.ShixinAccess = {
    hasAccess: function () { return unlocked; },
    verify: async function (code) {
      var trimmed = code.trim();
      if (trimmed !== '9119') throw new Error(window.ShixinI18n.t('err.invalidCode'));
      var mode = 'local';
      try { mode = await unlockOnServer(trimmed); }
      catch (error) {
        if (location.hostname !== '127.0.0.1' && location.hostname !== 'localhost') throw error;
      }
      if (mode === 'invalid') throw new Error(window.ShixinI18n.t('err.invalidCode'));
      viaApi = mode === 'api';
      unlocked = true;
      try { sessionStorage.setItem(KEY, 'unlocked'); } catch (_) {}
      return { unlocked: true };
    },
    getDownload: async function () {
      if (!unlocked) throw new Error(window.ShixinI18n.t('err.verifyFirst'));
      if (viaApi) return { url: '/api/download', filename: 'shixin.apk' };
      try {
        var response = await fetch('/api/download', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          credentials: 'same-origin',
          body: JSON.stringify({ code: '9119' }),
          signal: AbortSignal.timeout(15000)
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
