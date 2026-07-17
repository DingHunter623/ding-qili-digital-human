(function(){
'use strict';
function addStyle(){
  if(document.getElementById('projectImagesV2Style'))return;
  var s=document.createElement('style');
  s.id='projectImagesV2Style';
  s.textContent='.project-media-v2{margin:-22px -22px 18px;border-bottom:1px solid var(--line);background:#eef3f5;overflow:hidden}.project-media-v2 img{display:block;width:100%;height:auto;object-fit:contain;background:#eef3f5}.project-media-v2 figcaption{padding:10px 14px;color:var(--muted);background:#f8fbfa;font-size:14px;line-height:1.55;font-weight:750}.project-photo-grid-v2{display:grid;grid-template-columns:1fr 1fr;gap:1px;align-items:start;background:var(--line)}.project-photo-grid-v2>div{position:relative;background:#eef3f5}.project-photo-grid-v2 span{position:absolute;left:10px;bottom:10px;padding:4px 9px;color:#fff;background:rgba(15,75,90,.88);font-size:13px;font-weight:900}@media(max-width:760px){.project-photo-grid-v2{grid-template-columns:1fr}}';
  document.head.appendChild(s);
}
function findProject(words){
  var cards=[].slice.call(document.querySelectorAll('#projects .project'));
  return cards.find(function(card){var h=card.querySelector('h3');if(!h)return false;return words.some(function(w){return h.textContent.indexOf(w)>-1;});});
}
function addFuse(){
  var card=findProject(['切口工艺改良','玻璃管保险丝切口断裂率改善']);
  if(!card)return;
  var old=card.querySelector('#fuseCuttingProjectImages,.fuse-project-media');if(old)old.remove();
  if(card.querySelector('#fuseProjectImagesV2'))return;
  var h=card.querySelector('h3');if(h)h.textContent='玻璃管保险丝切口断裂率改善';
  var f=document.createElement('figure');f.id='fuseProjectImagesV2';f.className='project-media-v2';
  f.innerHTML='<div class="project-photo-grid-v2"><div><img src="/fuse-cutting-after.jpg?v=20260718-1" alt="玻璃管保险丝改善后成品"><span>改善后成品</span></div><div><img src="/fuse-cutting-before.jpg?v=20260718-1" alt="玻璃管保险丝改善后半成品"><span>改善后半成品</span></div></div><figcaption>玻璃管保险丝切口断裂率改善｜改善后成品与半成品实物</figcaption>';
  card.insertBefore(f,card.firstChild);
}
function addMold(){
  var card=findProject(['智能模具库与可追溯管理']);
  if(!card)return;
  var old=card.querySelector('#moldWarehouseProjectImage');if(old)old.remove();
  if(card.querySelector('#moldProjectImageV2'))return;
  var f=document.createElement('figure');f.id='moldProjectImageV2';f.className='project-media-v2';
  f.innerHTML='<img src="/mold-smart-warehouse.png?v=20260718-1" alt="智能模具立体库现场"><figcaption>1200+副模具标准化与二维码追溯｜智能模具立体库现场</figcaption>';
  card.insertBefore(f,card.firstChild);
}
function run(){addStyle();addFuse();addMold();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
setTimeout(run,300);
})();