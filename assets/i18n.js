(function () {
  'use strict';
  var KEY = 'shixin.lang';
  var dict = {
    en: {
      'doc.title': 'Shixin — Keep every SMS, safely, in Gmail',
      'doc.description': 'Shixin brings SMS history from every phone and number into your Gmail, so you can search, read, and keep it.',
      'skip': 'Skip to main content',
      'nav.label': 'Main',
      'nav.product': 'Features',
      'nav.stories': 'Use cases',
      'nav.buy': 'Buy & download',
      'lang.label': 'Language',
      'cta.download': 'Download',
      'kicker.gate': 'SHIXIN / DOWNLOAD',
      'hero.eyebrow': "Don't lose a single message",
      'hero.h1a': 'Every message you send or receive',
      'hero.h1b': 'deserves to be kept safe',
      'hero.lede1': 'Bring SMS history from every phone and number into one inbox.',
      'hero.lede2': 'Sorted by contact, with the original conversation and time. Search and read whenever you need to.',
      'hero.demo': 'See the product demo',
      'hero.note': 'Android app',
      'hero.scene': 'Illustration of an old text saved in Gmail',
      'name.zhou': 'Lao Zhou',
      'name.wang': 'Xiao Wang',
      'name.phone': 'Phone number',
      'hero.msgDate': 'Mar 12, 2014 · 23:41',
      'msg.home': 'Made it home? Be careful on the road.',
      'hero.original': 'Original text · original time',
      'hero.toMe': 'to me',
      'hero.archiveTag': 'Shixin / Lao Zhou',
      'hero.byContact': 'Filed by contact',
      'hero.archived': 'Archived',
      'hero.archivedHint': 'Search and read it in Gmail.',
      'hero.caption': 'Product mockup · sample data',
      'how.h2': 'Three steps to archive SMS to email.',
      'how.workflow': 'Animated demo: choose contacts on the phone, Shixin organizes the messages, then archives them to Gmail. Sample data.',
      'how.select': 'Select messages',
      'how.sms': 'Messages',
      'how.chooseContacts': 'Choose contacts',
      'msg.gotIt': 'Did you get it?',
      'msg.weekend': 'See you this weekend, usual place.',
      'how.contacts3': '3 contacts',
      'how.selected': 'Selected ✓',
      'how.organize': 'Auto-organize',
      'how.tagContact': 'Contacts',
      'how.tagTime': 'Time',
      'how.tagContent': 'Content',
      'how.saveGmail': 'Save to Gmail',
      'how.smsArchive': 'SMS archive',
      'how.threadZhou': 'SMS with Lao Zhou',
      'how.threadWang': 'SMS with Xiao Wang',
      'how.done': '✓ Archived',
      'stories.h2': 'Old messages, still in order.',
      'stories.find': 'Find it fast',
      'stories.findH3a': 'Remember one word,',
      'stories.findH3b': 'find that conversation.',
      'stories.findP': 'Use Gmail search to get back the person, the date, and the message.',
      'stories.hit': 'SMS with <mark>Lao Zhou</mark>',
      'stories.hitLine': 'Did you get it? · Got it. Thanks for thinking of me.',
      'stories.searchCaption': 'Gmail search mockup',
      'stories.archive': 'One archive',
      'stories.archiveH3a': 'Many phones,',
      'stories.archiveH3b': ' one home.',
      'stories.archiveP': 'Scattered messages, filed by contact and time.',
      'stories.everyday': 'Everyday chat',
      'stories.weekend': 'Weekend plans',
      'stories.foot': 'SMS → email → kept for good',
      'stories.read': 'Read anywhere',
      'stories.readH3a': 'Leave the old phone behind.',
      'stories.readH3b': ' You can still read them.',
      'stories.readP': 'Phone, computer, or tablet — sign in to Gmail and read.',
      'stories.inbox': 'Inbox',
      'stories.devicePc': 'Computer',
      'stories.devicePhone': 'Phone',
      'stories.deviceTablet': 'Tablet',
      'demo.h2': 'The original conversation, intact.',
      'demo.sub': 'The contact becomes the sender. Your number at the time becomes the recipient. The time becomes the date. The thread becomes a label. Not a word is changed.',
      'demo.pick': 'Choose a sample contact',
      'demo.hint': 'Click a contact to see the archived version · sample data',
      'demo.onPhone': 'On the phone',
      'demo.inGmail': 'In Gmail',
      'demo.smsWithBefore': 'SMS with ',
      'demo.smsWithAfter': '',
      'demo.from': 'From',
      'demo.to': 'To',
      'demo.mine': 'This phone',
      'demo.date': 'Date',
      'demo.label': 'Label',
      'demo.compose': 'Message',
      'demo.me': 'Me',
      'demo.dateZhou': 'Mar 12, 2014',
      'demo.dateZhouFull': 'Mar 12, 2014 23:41',
      'get.h2a': 'From now on,',
      'get.h2b': 'don’t lose a single message',
      'get.p': 'Download the Android app and file your SMS history in your own Gmail.',
      'get.step1': 'Click download',
      'get.step2': 'Enter your code',
      'get.step3': 'Unlock and download',
      'get.plan': '拾信',
      'get.badge': 'Early access',
      'get.access': 'Unlock with a code',
      'get.planDesc': 'For now, an activation code is your proof of purchase.',
      'get.feat1': 'Archive SMS to Gmail',
      'get.feat2': 'Organized by contact and time',
      'get.feat3': 'Search and read in Gmail',
      'get.note': 'Have a code? Click download, then verify.',
      'get.meta': 'Android 6.0+ · APK',
      'footer.copy': '© 2026 Nyquiste Corporation - shixin. All rights reserved.',
      'gate.close': 'Close download',
      'gate.title': 'Unlock the download',
      'gate.lead': 'Enter your activation code to verify purchase.',
      'gate.steps': 'Download steps',
      'gate.step1': 'Verify',
      'gate.step2': 'Download',
      'gate.code': 'Activation code',
      'gate.placeholder': 'Enter your activation code',
      'gate.submit': 'Verify and unlock',
      'gate.footnote': 'Activation codes only for now. Online payment is not open yet.',
      'gate.unlocked': 'Download unlocked',
      'gate.preparing': 'Preparing the installer…',
      'gate.downloadApk': 'Download APK',
      'gate.session': 'You can download again in this browser session.',
      'js.downloadUnlocked': 'Download · unlocked',
      'js.sessionUnlocked': 'Unlocked in this session. You can download now.',
      'js.getAndroid': 'Get Shixin Android',
      'js.verified': 'Purchase verified. You can download the app.',
      'js.preparingShort': 'Preparing…',
      'js.downloadStarted': 'Download requested. If it didn’t start, tap the button below.',
      'js.downloadHeld': 'Access is saved. The installer did not start.',
      'js.downloadAgain': 'Download APK again',
      'js.verifying': 'Verifying…',
      'err.invalidCode': 'That code isn’t valid. Check it and try again.',
      'err.verifyFirst': 'Verify your activation code first.',
      'err.unreachable': 'Couldn’t reach the installer. Try again.',
      'err.unavailable': 'The installer isn’t available right now. Try again later.'
    },
    zh: {
      'doc.title': '拾信 — 把旧短信收进你的 Gmail',
      'doc.description': '拾信把多台手机、多个号码里的历史短信汇进同一个 Gmail，可以搜索、阅读、长期留存。',
      'skip': '跳到主要内容',
      'nav.label': '主导航',
      'nav.product': '产品功能',
      'nav.stories': '使用场景',
      'nav.buy': '购买下载',
      'lang.label': '语言',
      'cta.download': '下载应用',
      'kicker.gate': '拾信 / 下载',
      'hero.eyebrow': '不放弃任何一条短信',
      'hero.h1a': '收发的每一条短信，',
      'hero.h1b': '都值得安全收藏',
      'hero.lede1': '将不同手机、不同号码的历史短信汇入同一个邮箱。',
      'hero.lede2': '按联系人整理，保留对话与时间，随时搜索、阅读。',
      'hero.demo': '查看产品演示',
      'hero.note': '安卓应用',
      'hero.scene': '一条旧短信被保存在 Gmail 中的示意',
      'name.zhou': '老周',
      'name.wang': '小王',
      'name.phone': '电话号码',
      'hero.msgDate': '2014 年 3 月 12 日 · 23:41',
      'msg.home': '到家了吗，路上小心',
      'hero.original': '原始内容 · 原始时间',
      'hero.toMe': '发给我',
      'hero.archiveTag': '拾信 / 老周',
      'hero.byContact': '按联系人归档',
      'hero.archived': '归档完成',
      'hero.archivedHint': '可在 Gmail 中搜索和阅读。',
      'hero.caption': '产品示意 · 示例数据',
      'how.h2': '将短信归档到邮箱',
      'how.workflow': '循环演示：选择手机里的联系人，拾信整理短信，归档到 Gmail。示例数据。',
      'how.select': '选择短信',
      'how.sms': '短信',
      'how.chooseContacts': '选择联系人',
      'msg.gotIt': '东西收到了吗',
      'msg.weekend': '周末见，老地方',
      'how.contacts3': '3 位联系人',
      'how.selected': '已选择 ✓',
      'how.organize': '自动整理',
      'how.tagContact': '联系人',
      'how.tagTime': '时间',
      'how.tagContent': '内容',
      'how.saveGmail': '存入 Gmail',
      'how.smsArchive': '短信归档',
      'how.threadZhou': '与老周的短信',
      'how.threadWang': '与小王的短信',
      'how.done': '✓ 归档完成',
      'stories.h2': '旧短信，也能井井有条。',
      'stories.find': '快速查找',
      'stories.findH3a': '记得一个词，',
      'stories.findH3b': '就能找到那段对话。',
      'stories.findP': '使用 Gmail 搜索，找回联系人、日期和消息。',
      'stories.hit': '与<mark>老周</mark>的短信',
      'stories.hitLine': '东西收到了吗 · 收到了，谢谢你惦记着',
      'stories.searchCaption': 'Gmail 搜索示意',
      'stories.archive': '集中归档',
      'stories.archiveH3a': '不同手机，',
      'stories.archiveH3b': '同一个归处。',
      'stories.archiveP': '把分散的消息，按联系人和时间整理。',
      'stories.everyday': '日常对话',
      'stories.weekend': '周末计划',
      'stories.foot': '短信 → 邮件 → 长期留存',
      'stories.read': '随时阅读',
      'stories.readH3a': '离开旧手机，',
      'stories.readH3b': '照样读得到。',
      'stories.readP': '电脑、手机、平板，登录 Gmail 即可阅读。',
      'stories.inbox': '收件箱',
      'stories.devicePc': '电脑',
      'stories.devicePhone': '手机',
      'stories.deviceTablet': '平板',
      'demo.h2': '原始对话，完整呈现。',
      'demo.sub': '联系人成了发件人，当时的本机号码成了收件人。时间成了日期，会话成了标签。内容一个字没变。',
      'demo.pick': '选择示例联系人',
      'demo.hint': '点击联系人，看看归档后的样子 · 示例数据',
      'demo.onPhone': '手机里',
      'demo.inGmail': 'Gmail 里',
      'demo.smsWithBefore': '与',
      'demo.smsWithAfter': '的短信',
      'demo.from': '发件人',
      'demo.to': '收件人',
      'demo.mine': '本机',
      'demo.date': '日期',
      'demo.label': '标签',
      'demo.compose': '短信',
      'demo.me': '我',
      'demo.dateZhou': '2014年3月12日',
      'demo.dateZhouFull': '2014年3月12日 23:41',
      'get.h2a': '从现在开始，',
      'get.h2b': '不放弃任何一条短信',
      'get.p': '下载安卓应用，将历史短信整理到自己的 Gmail。',
      'get.step1': '点击下载',
      'get.step2': '验证激活码',
      'get.step3': '解锁并下载',
      'get.plan': '拾信',
      'get.badge': '初版体验',
      'get.access': '激活码解锁',
      'get.planDesc': '当前使用激活码作为购买凭证。',
      'get.feat1': '短信归档到 Gmail',
      'get.feat2': '按联系人和时间整理',
      'get.feat3': '在 Gmail 中搜索与阅读',
      'get.note': '已有激活码？点击下载后验证即可。',
      'get.meta': '安卓 6.0+ · APK 安装包',
      'footer.copy': '© 2026 Nyquiste Corporation - shixin. All rights reserved.',
      'gate.close': '关闭下载窗口',
      'gate.title': '解锁应用下载',
      'gate.lead': '输入激活码，验证你的购买凭证。',
      'gate.steps': '下载步骤',
      'gate.step1': '验证凭证',
      'gate.step2': '下载应用',
      'gate.code': '激活码',
      'gate.placeholder': '输入你的激活码',
      'gate.submit': '验证并解锁下载',
      'gate.footnote': '当前仅支持激活码验证，在线支付尚未开放。',
      'gate.unlocked': '下载权限已解锁',
      'gate.preparing': '正在准备安装包…',
      'gate.downloadApk': '下载 APK',
      'gate.session': '本次浏览器会话内可再次下载。',
      'js.downloadUnlocked': '下载应用 · 已解锁',
      'js.sessionUnlocked': '本次会话已解锁，可直接下载。',
      'js.getAndroid': '获取拾信安卓',
      'js.verified': '购买凭证验证通过，可以下载应用。',
      'js.preparingShort': '正在准备…',
      'js.downloadStarted': '已请求下载。若未开始，请点击下方按钮。',
      'js.downloadHeld': '权限已保留，安装包下载暂未开始。',
      'js.downloadAgain': '再次下载 APK',
      'js.verifying': '正在验证…',
      'err.invalidCode': '激活码无效，请检查后重试。',
      'err.verifyFirst': '请先验证激活码。',
      'err.unreachable': '安装包暂时无法连接，请重试。',
      'err.unavailable': '安装包暂时不可用，请稍后重试。'
    }
  };
  var contacts = {
    en: {
      zhou: { name: 'Lao Zhou', number: '138 0013 8000', mine: '139 1234 5678', date: 'Mar 12, 2014', time: '23:41', messages: ['Did you get it?', 'Got it. Thanks for thinking of me.', 'Good. Get some rest.'] },
      wang: { name: 'Xiao Wang', number: '138 0013 8001', mine: '186 2345 6789', date: 'Nov 8, 2016', time: '19:26', messages: ['Free this weekend? Let’s get dinner.', 'Sure — same place?', 'Sounds good. See you Saturday.'] },
      phone: { name: 'Phone number', number: '138 0013 8002', mine: '188 3456 7890', date: 'Jun 16, 2018', time: '16:08', messages: ['Hi, the package is on its way.', 'Got it, thanks.', 'Please confirm when it arrives.'] }
    },
    zh: {
      zhou: { name: '老周', number: '138 0013 8000', mine: '139 1234 5678', date: '2014年3月12日', time: '23:41', messages: ['东西收到了吗', '收到了，谢谢你惦记着', '那就好，早点休息'] },
      wang: { name: '小王', number: '138 0013 8001', mine: '186 2345 6789', date: '2016年11月8日', time: '19:26', messages: ['周末有空吗，一起吃个饭', '好呀，还是老地方？', '没问题，周六见'] },
      phone: { name: '电话号码', number: '138 0013 8002', mine: '188 3456 7890', date: '2018年6月16日', time: '16:08', messages: ['你好，东西已经寄出了', '收到，谢谢', '到了以后请确认一下'] }
    }
  };
  var lang = 'en';

  function t(key) {
    return (dict[lang] && dict[lang][key]) || dict.en[key] || key;
  }

  function apply() {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = t('doc.title');
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t('doc.description'));
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.setAttribute('aria-pressed', String(el.getAttribute('data-lang') === lang));
    });
  }

  function setLang(next, persist) {
    lang = next === 'zh' ? 'zh' : 'en';
    if (persist !== false) {
      try { localStorage.setItem(KEY, lang); } catch (_) {}
    }
    apply();
    document.dispatchEvent(new CustomEvent('shixin:lang', { detail: { lang: lang } }));
  }

  function readSaved() {
    try {
      var saved = localStorage.getItem(KEY);
      if (saved === 'zh' || saved === 'en') return saved;
    } catch (_) {}
    return 'en';
  }

  window.ShixinI18n = {
    t: t,
    getLang: function () { return lang; },
    setLang: setLang,
    apply: apply,
    contacts: function () { return contacts[lang]; }
  };

  document.addEventListener('click', function (event) {
    var button = event.target.closest && event.target.closest('.lang-switch [data-lang]');
    if (!button) return;
    setLang(button.getAttribute('data-lang'));
  }, true);

  lang = readSaved();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
})();
