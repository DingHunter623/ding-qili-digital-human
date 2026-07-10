(function(){
  function clamp(el,left,top){
    var m=8;
    var maxL=Math.max(m,window.innerWidth-el.offsetWidth-m);
    var maxT=Math.max(m,window.innerHeight-el.offsetHeight-m);
    return {left:Math.min(Math.max(m,left),maxL),top:Math.min(Math.max(m,top),maxT)};
  }
  function bind(el,key){
    if(!el||el.dataset.dragReady==='1')return;
    el.dataset.dragReady='1';
    el.style.touchAction='none';
    var head=el.querySelector('.voice-head')||el;
    head.style.cursor='move';
    head.style.userSelect='none';
    var saved=null;
    try{saved=JSON.parse(localStorage.getItem(key)||'null')}catch(e){}
    if(saved&&typeof saved.left==='number'&&typeof saved.top==='number'){
      var p=clamp(el,saved.left,saved.top);
      el.style.left=p.left+'px';
      el.style.top=p.top+'px';
      el.style.right='auto';
      el.style.bottom='auto';
    }
    var down=false,moved=false,sx=0,sy=0,sl=0,st=0;
    el.addEventListener('pointerdown',function(e){
      if(!e.target.closest('.voice-head,.voice-mini'))return;
      if(e.target.closest('button,input,select,textarea,a'))return;
      down=true;moved=false;
      var r=el.getBoundingClientRect();
      sx=e.clientX;sy=e.clientY;sl=r.left;st=r.top;
      el.style.left=sl+'px';el.style.top=st+'px';el.style.right='auto';el.style.bottom='auto';
      try{el.setPointerCapture(e.pointerId)}catch(err){}
    });
    el.addEventListener('pointermove',function(e){
      if(!down)return;
      var dx=e.clientX-sx,dy=e.clientY-sy;
      if(Math.abs(dx)>3||Math.abs(dy)>3)moved=true;
      if(!moved)return;
      e.preventDefault();
      var p=clamp(el,sl+dx,st+dy);
      el.style.left=p.left+'px';
      el.style.top=p.top+'px';
      el.style.right='auto';
      el.style.bottom='auto';
    });
    function end(e){
      if(!down)return;
      down=false;
      try{el.releasePointerCapture(e.pointerId)}catch(err){}
      if(moved){
        var r=el.getBoundingClientRect();
        localStorage.setItem(key,JSON.stringify({left:r.left,top:r.top}));
      }
    }
    el.addEventListener('pointerup',end);
    el.addEventListener('pointercancel',end);
  }
  function apply(){
    bind(document.getElementById('voiceCard'),'voicePos');
    bind(document.getElementById('voiceMini'),'voiceMiniPos');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
  setTimeout(apply,400);
  setTimeout(apply,1200);
  new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true});
})();