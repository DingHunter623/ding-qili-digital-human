(function(){
'use strict';
function copyText(text){
  if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(text);
  var t=document.createElement('textarea');t.value=text;t.style.position='fixed';t.style.left='-9999px';document.body.appendChild(t);t.select();document.execCommand('copy');t.remove();return Promise.resolve();
}
function showTip(text){
  var tip=document.getElementById('copyLinkTip');
  if(!tip){tip=document.createElement('div');tip.id='copyLinkTip';tip.style.cssText='position:fixed;left:50%;bottom:28px;z-index:12000;transform:translateX(-50%);padding:10px 16px;border-radius:999px;background:rgba(15,75,90,.95);color:#fff;font-weight:800;opacity:0;transition:.2s;pointer-events:none';document.body.appendChild(tip);}
  tip.textContent=text;tip.style.opacity='1';clearTimeout(tip._timer);tip._timer=setTimeout(function(){tip.style.opacity='0';},1600);
}
function refineNote(){
  var note=document.querySelector('#knowledge .knowledge-note');
  if(note)note.textContent='围绕精益理念、IE方法、质量工具与现场改善持续沉淀实用内容，便于专业交流、学习参考与方法复用。';
}
function addCopyLink(){
  var dock=document.getElementById('floatDock');
  if(!dock||dock.querySelector('[data-a="copy-link"]'))return;
  var btn=document.createElement('button');
  btn.className='float-btn float-share';
  btn.type='button';
  btn.setAttribute('data-a','copy-link');
  btn.textContent='复制链接';
  dock.insertBefore(btn,dock.querySelector('[data-a="contact"]'));
  dock.addEventListener('pointerup',function(e){
    var target=e.target.closest('[data-a="copy-link"]');
    if(!target)return;
    e.preventDefault();e.stopImmediatePropagation();
    copyText(location.href).then(function(){showTip('网址已复制');});
  },true);
}
function apply(){refineNote();addCopyLink();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
setTimeout(apply,500);setTimeout(apply,1600);
})();