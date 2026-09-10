(function () {
  'use strict';
  var header = document.querySelector('.top');
  function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 12); }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  var cmp = document.getElementById('cmp');
  function currentKey() {
    var active = document.querySelector('[data-contact][aria-pressed="true"]');
    return (active && active.dataset.contact) || 'zhou';
  }
  function fillContact(key, animate) {
    var pack = window.ShixinI18n.contacts();
    var contact = pack[key] || pack.zhou;
    var me = window.ShixinI18n.t('demo.me');
    cmp.querySelectorAll('.pane [data-k="name"]').forEach(function (item) { item.textContent = contact.name; });
    cmp.querySelectorAll('.pane [data-k="who"]').forEach(function (item) { item.textContent = contact.number; });
    cmp.querySelectorAll('.pane [data-k="me"]').forEach(function (item) { item.textContent = contact.mine; });
    cmp.querySelector('.sms [data-k="time"]').textContent = contact.date;
    cmp.querySelector('.stamp').textContent = contact.time;
    cmp.querySelectorAll('.thread > div').forEach(function (item, index) { item.textContent = contact.messages[index]; });
    var glue = window.ShixinI18n.getLang() === 'zh' ? '：' : ': ';
    cmp.querySelectorAll('.gm .body > div').forEach(function (item, index) {
      item.textContent = (index === 1 ? me : contact.name) + glue + contact.messages[index];
    });
    if (animate) {
      cmp.classList.remove('switching');
      void cmp.offsetWidth;
      cmp.classList.add('switching');
    }
    cmp.dispatchEvent(new Event('contactchange'));
  }
  document.querySelectorAll('[data-contact]').forEach(function (button) {
    button.addEventListener('click', function () {
      if (button.getAttribute('aria-pressed') === 'true') return;
      document.querySelectorAll('[data-contact]').forEach(function (item) { item.setAttribute('aria-pressed', String(item === button)); });
      fillContact(button.dataset.contact, true);
    });
  });
  fillContact(currentKey(), false);
  document.addEventListener('shixin:lang', function () {
    fillContact(currentKey(), false);
  });

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.sec > h2, .sec > .sub, .workflow, .feature-grid > article, .demo-toolbar, .cmp, .purchase-copy > h2').forEach(function (item) {
      item.classList.add('reveal');
      observer.observe(item);
    });
  }
})();
