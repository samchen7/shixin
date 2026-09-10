(function () {
  'use strict';
  var access = window.ShixinAccess;
  var gate = document.getElementById('gate');
  var card = gate.querySelector('.gate-card');
  var form = document.getElementById('gate-form');
  var input = document.getElementById('gate-code');
  var error = document.getElementById('gate-err');
  var submit = form.querySelector('[type="submit"]');
  var success = document.getElementById('gate-success');
  var again = document.getElementById('download-again');
  var status = document.getElementById('download-status');
  var downloadTab = document.getElementById('tab-download');
  var guideTab = document.getElementById('tab-guide');
  var downloadPanel = document.getElementById('panel-download');
  var guidePanel = document.getElementById('panel-guide');
  var purchaseNote = document.getElementById('purchase-note');
  var previousFocus;
  var pending = false;
  var version = 0;
  var activeTab = 'download';
  var openToGuide = false;

  function clearError() { error.hidden = true; error.textContent = ''; input.removeAttribute('aria-invalid'); }
  function showError(message) { error.textContent = message; error.hidden = false; }
  function t(key) { return window.ShixinI18n.t(key); }
  function refreshButtons() {
    var unlocked = access.hasAccess();
    document.querySelectorAll('[data-cta]').forEach(function (button) {
      button.textContent = unlocked ? t('js.downloadUnlocked') : t('cta.buy');
    });
    document.querySelectorAll('[data-guide]').forEach(function (link) {
      link.textContent = unlocked ? t('get.guideOpened') : t('get.guideCta');
    });
    purchaseNote.textContent = unlocked ? t('js.sessionUnlocked') : t('get.note');
  }
  function setTab(name) {
    activeTab = name === 'guide' ? 'guide' : 'download';
    var isGuide = activeTab === 'guide';
    downloadTab.setAttribute('aria-selected', String(!isGuide));
    guideTab.setAttribute('aria-selected', String(isGuide));
    downloadTab.tabIndex = isGuide ? -1 : 0;
    guideTab.tabIndex = isGuide ? 0 : -1;
    downloadPanel.hidden = isGuide;
    guidePanel.hidden = !isGuide;
  }
  function render() {
    var unlocked = access.hasAccess();
    form.hidden = unlocked;
    success.hidden = !unlocked;
    document.getElementById('gate-progress').hidden = unlocked;
    card.classList.toggle('is-unlocked', unlocked);
    document.getElementById('gate-kicker').textContent = unlocked ? t('kicker.workspace') : t('kicker.gate');
    document.getElementById('gate-title').textContent = unlocked ? t('js.workspaceTitle') : t('gate.title');
    document.getElementById('gate-lead').textContent = unlocked ? t('js.workspaceLead') : t('gate.lead');
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
        if (activeTab === 'download') again.focus();
      }
    }
  }
  function showWorkspace(options) {
    options = options || {};
    openToGuide = !!options.guide;
    gate.hidden = false;
    document.body.classList.add('gate-open');
    document.querySelectorAll('header, main, footer').forEach(function (element) { element.inert = true; });
    clearError();
    setTab(openToGuide ? 'guide' : 'download');
    render();
    if (access.hasAccess()) {
      (openToGuide ? guideTab : document.getElementById('gate-cancel')).focus();
      if (!openToGuide && options.download !== false) download();
      else status.textContent = t('gate.ready');
    } else { input.value = ''; input.focus(); }
  }
  function openGate(event) {
    event.preventDefault();
    previousFocus = document.activeElement;
    showWorkspace({ guide: event.currentTarget.hasAttribute('data-guide'), download: !event.currentTarget.hasAttribute('data-guide') });
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
  async function startBuy(event) {
    event.preventDefault();
    if (access.hasAccess()) { openGate(event); return; }
    if (pending) return;
    pending = true;
    var button = event.currentTarget;
    button.textContent = t('js.redirecting');
    try {
      await access.startCheckout();
    } catch (err) {
      pending = false;
      refreshButtons();
      purchaseNote.textContent = err.message;
    }
  }
  async function claimFromUrl() {
    var params = new URLSearchParams(location.search);
    if (params.get('checkout') !== 'success') return false;
    var sessionId = params.get('session_id') || '';
    history.replaceState({}, '', location.pathname + '#get');
    if (!sessionId) throw new Error(t('err.claimFailed'));
    await access.claim(sessionId);
    return true;
  }
  document.querySelectorAll('[data-cta]').forEach(function (button) { button.addEventListener('click', startBuy); });
  document.querySelectorAll('[data-download]').forEach(function (button) { button.addEventListener('click', openGate); });
  document.getElementById('gate-cancel').addEventListener('click', closeGate);
  gate.addEventListener('click', function (event) { if (event.target === gate) closeGate(); });
  again.addEventListener('click', download);
  downloadTab.addEventListener('click', function () { setTab('download'); });
  guideTab.addEventListener('click', function () { setTab('guide'); });
  document.getElementById('open-guide').addEventListener('click', function () {
    setTab('guide');
    guideTab.focus();
  });
  document.querySelector('.workspace-tabs').addEventListener('keydown', function (event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    var next = 'download';
    if (event.key === 'End') next = 'guide';
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') next = activeTab === 'download' ? 'guide' : 'download';
    setTab(next);
    (next === 'guide' ? guideTab : downloadTab).focus();
  });
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
      setTab(openToGuide ? 'guide' : 'download');
      render();
      if (openToGuide) {
        status.textContent = t('gate.ready');
        guideTab.focus();
      } else {
        document.getElementById('gate-cancel').focus();
        await download();
      }
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
  document.addEventListener('shixin:lang', function () {
    refreshButtons();
    if (!gate.hidden) render();
  });
  access.restore().then(async function () {
    refreshButtons();
    try {
      if (await claimFromUrl()) {
        previousFocus = document.querySelector('[data-cta]');
        showWorkspace({ download: true });
      }
    } catch (err) {
      previousFocus = document.querySelector('[data-cta]');
      showWorkspace({ download: false });
      showError(err.message);
      purchaseNote.textContent = err.message;
    }
  });
})();
