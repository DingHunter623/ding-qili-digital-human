(function(){
'use strict';
const SOUL='简单化：把复杂问题拆成流程、数据、责任、节拍、物料、设备与异常。\n专业化：以VSM、5M2E、标准工时、OEE、SMED、线平衡和PDCA识别真正影响PQCD的断点。\n标准化：把验证有效的方法固化为SOP/SWI、数据版本、点检表、看板机制与改善闭环。';
function addPrincipleBar(){
 const panel=document.getElementById('assistant');
 const body=panel&&panel.querySelector('.panel-body');
 if(!body||document.getElementById('dialogueSoulBar'))return;
 const bar=document.createElement('div');
 bar.id='dialogueSoulBar';
 bar.className='dialogue-soul-bar';
 bar.innerHTML='<strong>丁启利制造改善方法灵魂</strong><span>简单化 · 专业化 · 标准化</span>';
 const answer=document.getElementById('answer');
 if(answer)body.insertBefore(bar,answer);else body.appendChild(bar);
}
function reinforceIntro(){
 const answer=document.getElementById('answer');
 const active=document.querySelector('.topic-control.active');
 if(!answer||!active||active.dataset.topic!=='intro')return;
 const text=answer.textContent||'';
 if(text.includes('简单化：')&&text.includes('专业化：')&&text.includes('标准化：'))return;
 answer.textContent=text.trim()+'\n\n'+SOUL;
}
function boot(){
 const style=document.createElement('style');style.id='dialogueSoulStyle';style.textContent='.dialogue-soul-bar{display:flex;justify-content:space-between;gap:12px;align-items:center;margin:12px 0;padding:11px 14px;border-left:4px solid #ffe39b;background:rgba(255,255,255,.08);color:#fff}.dialogue-soul-bar strong{color:#ffe39b}.dialogue-soul-bar span{font-weight:900}@media(max-width:760px){.dialogue-soul-bar{align-items:flex-start;flex-direction:column}}';if(!document.getElementById(style.id))document.head.appendChild(style);
 addPrincipleBar();setTimeout(addPrincipleBar,400);setTimeout(reinforceIntro,700);
 document.addEventListener('click',function(e){if(e.target.closest('.topic-control'))setTimeout(reinforceIntro,30);});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();