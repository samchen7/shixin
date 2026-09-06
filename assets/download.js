(function () {
  'use strict';
  var access = window.ShixinAccess;
  var gate = document.getElementById('gate');
  var form = document.getElementById('gate-form');
  var input = document.getElementById('gate-code');
  var error = document.getElementById('gate-err');
  var submit = form.querySelector('[type="submit"]');
  var success = document.getElementById('gate-success');
  var again = document.getElementById('download-again');
  var status = document.getElementById('download-status');
  var previousFocus;
  var pending = false;
  var version = 0;

  function clearError() { error.hidden = true; error.textContent = ''; input.removeAttribute('aria-invalid'); }
  function showError(message) { error.textContent = message; error.hidden = false; }
  function t(key) { return window.ShixinI18n.t(key); }
  function refreshButtons() {
    if (access.hasAccess()) {
      document.querySelectorAll('[data-download]').forEach(function (button) { button.textContent = t('js.downloadUnlocked'); });
      document.getElementById('purchase-note').textContent = t('js.sessionUnlocked');
    }
  }
  function render() {
    var unlocked = access.hasAccess();
    form.hidden = unlocked;
    success.hidden = !unlocked;
    document.getElementById('gate-title').textContent = unlocked ? t('js.getAndroid') : t('gate.title');
    document.getElementById('gate-lead').textContent = unlocked ? t('js.verified') : t('gate.lead');
    document.getElementById('verify-step').toggleAttribute('aria-current', !unlocked);
    document.getElementById('download-step').toggleAttribute('aria-current', unlocked);
    document.getElementById(unlocked ? 'download-step' : 'verify-step').setAttribute('aria-current', 'step');
    refreshButtons();
  }
  async function download() {
    if (pending) return;
    pending = true;
    var current = ++version;
    again.disabled = true;
    again.textContent = t('js.preparingShort');
    status.textContent = t('gate.preparing');
    clearError();
    try {
      var file = await access.getDownload();
      if (current !== version || gate.hidden) return;
      var link = document.createElement('a');
      link.href = file.url;
      link.download = file.filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      status.textContent = t('js.downloadStarted');
    } catch (err) {
      if (current !== version || gate.hidden) return;
      status.textContent = t('js.downloadHeld');
      showError(err.message);
    } finally {
      if (current === version) {
        pending = false;
        again.disabled = false;
        again.textContent = t('js.downloadAgain');
        again.focus();
      }
    }
  }
  function openGate(event) {
    event.preventDefault();
    previousFocus = document.activeElement;
    gate.hidden = false;
    document.body.classList.add('gate-open');
    document.querySelectorAll('header, main, footer').forEach(function (element) { element.inert = true; });
    clearError();
    render();
    if (access.hasAccess()) { document.getElementById('gate-cancel').focus(); download(); }
    else { input.value = ''; input.focus(); }
  }
  function closeGate() {
    version++;
    pending = false;
    submit.disabled = false;
    submit.textContent = t('gate.submit');
    again.disabled = false;
    gate.hidden = true;
    document.body.classList.remove('gate-open');
    document.querySelectorAll('header, main, footer').forEach(function (element) { element.inert = false; });
    if (previousFocus) previousFocus.focus();
    clearError();
  }
  document.querySelectorAll('[data-download]').forEach(function (button) { button.addEventListener('click', openGate); });
  document.getElementById('gate-cancel').addEventListener('click', closeGate);
  gate.addEventListener('click', function (event) { if (event.target === gate) closeGate(); });
  again.addEventListener('click', download);
  input.addEventListener('input', clearError);
  document.addEventListener('keydown', function (event) {
    if (gate.hidden) return;
    if (event.key === 'Escape') { closeGate(); return; }
    if (event.key === 'Tab') {
      var items = Array.from(gate.querySelectorAll('button:not(:disabled), input, a[href]')).filter(function (item) { return !item.closest('[hidden]'); });
      var first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (pending) return;
    clearError();
    pending = true;
    var current = ++version;
    submit.disabled = true;
    submit.textContent = t('js.verifying');
    try {
      await access.verify(input.value);
      if (current !== version || gate.hidden) return;
      pending = false;
      render();
      document.getElementById('gate-cancel').focus();
      await download();
    } catch (err) {
      if (current !== version || gate.hidden) return;
      pending = false;
      showError(err.message);
      input.setAttribute('aria-invalid', 'true');
      input.focus();
    } finally {
      submit.disabled = false;
      submit.textContent = t('gate.submit');
    }
  });
  refreshButtons();
  document.addEventListener('shixin:lang', function () {
    refreshButtons();
    if (!gate.hidden) render();
  });
})();
