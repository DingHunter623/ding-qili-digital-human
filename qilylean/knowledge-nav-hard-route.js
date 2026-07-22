(function(){
'use strict';
var TARGET='https://qilylean.com/knowledge/?entry=homepage-nav-v4';
function cleanText(node){return (node&&node.textContent||'').replace(/\s+/g,'').trim();}
function isHomepage(){var p=location.pathname.toLowerCase();return p==='/'||p==='/index.html'||p==='/qilylean/'||p==='/qilylean/home.html';}
function isKnowledgeAnchor(anchor){
  if(!anchor)return false;
  var label=cleanText(anchor);
  var href=anchor.getAttribute('href')||'';
  return label==='知识分享'||label==='精益知识分享'||/\/knowledge(?:\/|\.html)(?:[?#]|$)/i.test(href)||/lean-knowledge\.html(?:[?#]|$)/i.test(href);
}
function enforce(){
  if(!isHomepage())return;
  Array.prototype.forEach.call(document.querySelectorAll('a'),function(anchor){
    if(!isKnowledgeAnchor(anchor))return;
    anchor.textContent='知识分享';
    anchor.setAttribute('href',TARGET);
    anchor.setAttribute('target','_top');
    anchor.setAttribute('data-hard-route','knowledge');
    anchor.onclick=function(event){
      if(event){event.preventDefault();event.stopPropagation();}
      try{window.top.location.assign(TARGET);}catch(error){location.assign(TARGET);}
      return false;
    };
  });
}
function route(event){
  if(!isHomepage())return;
  var anchor=event.target&&event.target.closest?event.target.closest('a'):null;
  if(!isKnowledgeAnchor(anchor))return;
  event.preventDefault();
  event.stopPropagation();
  if(event.stopImmediatePropagation)event.stopImmediatePropagation();
  try{window.top.location.assign(TARGET);}catch(error){location.assign(TARGET);}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enforce,{once:true});else enforce();
document.addEventListener('click',route,true);
window.addEventListener('load',function(){enforce();setTimeout(enforce,300);setTimeout(enforce,1000);},{once:true});
var observer=new MutationObserver(enforce);
observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['href']});
})();