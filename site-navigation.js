(function () {
  'use strict';

  if (window.__qilyLeanSiteNavigationV1) return;
  window.__qilyLeanSiteNavigationV1 = true;

  var routes = [
    ['QilyLean AI', '/ai.html'],
    ['首页', '/'],
    ['能力画像', '/capabilities/'],
    ['履历主线', '/experience/'],
    ['代表项目', '/projects/'],
    ['改善经验', '/improvements/'],
    ['知识分享', '/knowledge/'],
    ['行走印记', '/moments.html']
  ];

  function normalizedPath(path) {
    var value = (path || '/').replace(/\/index\.html$/, '/');
    return value.length > 1 ? value.replace(/\/+$/, '/') : '/';
  }

  function currentModule(path) {
    if (path === '/') return '/';
    if (path.indexOf('/capabilities/') === 0) return '/capabilities/';
    if (path.indexOf('/experience/') === 0) return '/experience/';
    if (path.indexOf('/projects/') === 0) return '/projects/';
    if (path.indexOf('/improvements/') === 0 || /\/qilylean\/papers\.html$/.test(path)) return '/improvements/';
    if (/\/ai\.html$/.test(path)) return '/ai.html';
    if (path.indexOf('/knowledge/') === 0 || /\/qilylean\/(?:lean-knowledge|daily-insights|lean-tools|execution-loop|reference-|gbt2828)/.test(path)) return '/knowledge/';
    if (/\/moments\.html$/.test(path)) return '/moments.html';
    return '';
  }

  function parentRoute(path, modulePath) {
    if (path === '/') return '';
    if (path === '/knowledge/') return '/';
    if (path.indexOf('/knowledge/') === 0 || /\/qilylean\/(?:lean-knowledge|daily-insights|lean-tools|execution-loop|reference-|gbt2828)/.test(path)) return '/knowledge/';
    return '/';
  }

  function addStylesheet() {
    if (document.querySelector('link[href^="/site-shell.css"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/site-shell.css?v=20260722-modules-v2';
    document.head.appendChild(link);
  }

  function buildNavigation() {
    var header = document.querySelector('header.qily-site-header,header.topbar,header.top');
    if (!header) return;

    var path = normalizedPath(location.pathname);
    var modulePath = currentModule(path);
    var oldNav = header.querySelector(':scope > nav.nav,:scope > nav.site-nav');
    var nav = document.createElement('nav');
    nav.className = oldNav && oldNav.classList.contains('nav') ? 'nav' : 'site-nav';
    nav.setAttribute('aria-label', '网站导航');

    routes.forEach(function (route) {
      var link = document.createElement('a');
      link.textContent = route[0];
      link.href = route[1];
      if (modulePath === route[1]) link.setAttribute('aria-current', 'page');
      nav.appendChild(link);
    });

    var parent = parentRoute(path, modulePath);
    if (parent) {
      header.classList.add('qily-has-back');
      var back = document.createElement('a');
      back.className = 'qily-back-link';
      back.href = parent;
      back.textContent = '← 返回上一层';
      document.body.appendChild(back);
    }

    if (oldNav) oldNav.replaceWith(nav);
    else {
      var oldBack = header.querySelector(':scope > a.back');
      if (oldBack) oldBack.remove();
      header.appendChild(nav);
    }
  }

  function boot() {
    addStylesheet();
    buildNavigation();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
