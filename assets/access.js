/* Local demo adapter. Replace this boundary with server-verified purchase access
   when integrating Stripe; sessionStorage is UI state, not authorization. */
(function () {
  'use strict';
  var KEY = 'shixin.demo.download-access.v1';
  var unlocked = false;
  try { unlocked = sessionStorage.getItem(KEY) === 'unlocked'; } catch (_) {}
  window.ShixinAccess = {
    hasAccess: function () { return unlocked; },
    verify: async function (code) {
      if (code.trim() !== '9119') throw new Error(window.ShixinI18n.t('err.invalidCode'));
      unlocked = true;
      try { sessionStorage.setItem(KEY, 'unlocked'); } catch (_) {}
      return { unlocked: true };
    },
    getDownload: async function () {
      if (!unlocked) throw new Error(window.ShixinI18n.t('err.verifyFirst'));
      var response;
      try { response = await fetch('/downloads/shixin.apk', { method: 'HEAD', signal: AbortSignal.timeout(15000) }); }
      catch (_) { throw new Error(window.ShixinI18n.t('err.unreachable')); }
      if (!response.ok) throw new Error(window.ShixinI18n.t('err.unavailable'));
      return { url: '/downloads/shixin.apk', filename: 'shixin.apk' };
    }
  };
})();
