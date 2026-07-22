(function(){
  'use strict';

  var TARGET='https://qilylean.com/knowledge/?entry=homepage-nav-v5';

  function cleanText(node){
    return (node&&node.textContent||'').replace(/\s+/g,'').trim();
  }

  function isHomepage(){
    var path=location.pathname.toLowerCase();
    return path==='/'||path==='/index.html'||path==='/qilylean/'||path==='/qilylean/home.html';
  }

  function isKnowledgeAnchor(anchor){
    if(!anchor)return false;
    var label=cleanText(anchor);
    var href=anchor.getAttribute('href')||'';
    return label==='知识分享'||
      label==='精益知识分享'||
      /\/knowledge(?:\/|\.html)(?:[?#]|$)/i.test(href)||
      /lean-knowledge\.html(?:[?#]|$)/i.test(href);
  }

  function enforce(){
    if(!isHomepage())return;
    Array.prototype.forEach.call(
      document.querySelectorAll('nav[aria-label="网站导航"] a, .site-nav a'),
      function(anchor){
        if(!isKnowledgeAnchor(anchor))return;
        if(cleanText(anchor)!=='知识分享')anchor.textContent='知识分享';
        if(anchor.getAttribute('href')!==TARGET)anchor.setAttribute('href',TARGET);
        if(anchor.getAttribute('target')!=='_top')anchor.setAttribute('target','_top');
        if(anchor.getAttribute('data-hard-route')!=='knowledge')anchor.setAttribute('data-hard-route','knowledge');
      }
    );
  }

  function route(event){
    if(!isHomepage())return;
    var anchor=event.target&&event.target.closest?event.target.closest('a'):null;
    if(!isKnowledgeAnchor(anchor))return;
    event.preventDefault();
    event.stopImmediatePropagation();
    try{window.top.location.assign(TARGET);}
    catch(error){location.assign(TARGET);}
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enforce,{once:true});
  else enforce();

  document.addEventListener('click',route,true);
  window.addEventListener('load',enforce,{once:true});
})();