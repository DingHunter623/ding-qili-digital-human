(function(){
  const WECHAT_ID='Qily259';
  const WECHAT_QR='wechat-qily259.jpg';
  const HOME_PAGE='home.html';

  const style=document.createElement('style');
  style.textContent=`
    .brand-mark{display:none!important}
    .brand{gap:0!important}
    .float-dock{position:fixed;right:18px;bottom:86px;z-index:9999;display:flex;flex-direction:column;gap:10px;user-select:none;touch-action:none}
    .float-btn{width:64px;height:64px;border:1px solid rgba(255,232,173,.55);border-radius:50%;box-shadow:0 12px 30px rgba(15,75,90,.28);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:0;cursor:pointer;font:inherit;font-weight:900;line-height:1.12;transition:transform .18s ease,box-shadow .18s ease,filter .18s ease}
    .float-btn:hover{transform:translateY(-1px);box-shadow:0 16px 36px rgba(15,75,90,.32);filter:saturate(1.08)}
    .float-btn .float-icon{font-size:19px;font-weight:900;line-height:1}
    .float-btn .float-text{font-size:10px;text-align:center;padding:0 4px;letter-spacing:.2px}
    .float-home{color:#fff;background:linear-gradient(135deg,#0f4b5a,#178b94)}
    .float-wx{color:#17322d;background:linear-gradient(135deg,#ffe39b,#f5c861)}
    .wx-mask{position:fixed;inset:0;z-index:10000;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.42);padding:20px}
    .wx-mask.show{display:flex}
    .wx-panel{position:relative;width:min(92vw,460px);max-height:90vh;overflow:auto;padding:24px 20px 20px;border-radius:20px;background:#fff;box-shadow:0 24px 70px rgba(0,0,0,.24);border:1px solid #d5e4e3;color:#182420;text-align:center}
    .wx-panel h3{margin:0 0 10px;color:#0f4b5a;font-size:24px;line-height:1.25}
    .wx-panel p{margin:0 0 12px;color:#4b6260;line-height:1.65}
    .wx-qr-wrap{width:max-content;max-width:100%;margin:14px auto 16px;padding:10px;border:1px solid #d5e4e3;border-radius:16px;background:#f8fbfb;box-shadow:0 8px 22px rgba(15,75,90,.08)}
    .wx-qr{display:block;width:min(100%,320px);max-width:320px;border-radius:12px;margin:0 auto}
    .wx-id-box{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:14px 0;padding:14px;border:1px solid #d5e4e3;border-radius:14px;background:#eef8f6;text-align:left}
    .wx-id-text{font-size:24px;font-weight:950;color:#0f4b5a;letter-spacing:.4px;word-break:break-all}
    .wx-copy-btn{border:none;border-radius:12px;background:#0f4b5a;color:#fff;padding:10px 14px;font:inherit;font-weight:850;cursor:pointer;white-space:nowrap}
    .wx-copy-btn:hover{background:#178b94}
    .wx-close{position:absolute;right:12px;top:10px;width:34px;height:34px;border:none;border-radius:50%;background:#eef5f2;color:#35524f;font-size:21px;cursor:pointer}
    .wx-tip{font-size:14px;color:#6a7d7b!important;text-align:left}
    @media(max-width:760px){.float-dock{right:12px;bottom:74px;gap:8px}.float-btn{width:56px;height:56px}.float-btn .float-icon{font-size:16px}.float-btn .float-text{font-size:10px}.wx-id-box{align-items:stretch;flex-direction:column}.wx-copy-btn{width:100%}.wx-qr{max-width:260px}}
  `;
  document.head.appendChild(style);

  function copyText(text){
    if(navigator.clipboard&&window.isSecureContext){return navigator.clipboard.writeText(text)}
    const input=document.createElement('input');
    input.value=text;input.setAttribute('readonly','');input.style.position='fixed';input.style.left='-9999px';
    document.body.appendChild(input);input.select();document.execCommand('copy');document.body.removeChild(input);return Promise.resolve();
  }

  function isHomePage(){
    return /\/home\.html$/i.test(location.pathname)||/\/index\.html$/i.test(location.pathname)||/\/digital_human\/?$/i.test(location.pathname);
  }

  function makeDock(){
    if(document.getElementById('floatDock'))return;
    const dock=document.createElement('div');
    dock.className='float-dock';dock.id='floatDock';
    dock.innerHTML=`
      <button class="float-btn float-home" id="floatHomeBtn" type="button" aria-label="回到首页"><span class="float-icon">⌂</span><span class="float-text">回首页</span></button>
      <button class="float-btn float-wx" id="floatWxBtn" type="button" aria-label="微信在线服务"><span class="float-icon">微</span><span class="float-text">微信服务</span></button>`;
    document.body.appendChild(dock);

    const mask=document.createElement('div');
    mask.className='wx-mask';mask.id='wxMask';
    mask.innerHTML=`
      <div class="wx-panel" role="dialog" aria-modal="true" aria-label="微信在线服务">
        <button class="wx-close" id="wxCloseBtn" type="button" aria-label="关闭">×</button>
        <h3>${WECHAT_ID} 微信在线服务</h3>
        <p>欢迎就精益生产、IE标准工时、VSM价值流、SMED、数智化工厂与项目改善进行交流。</p>
        <div class="wx-qr-wrap"><img class="wx-qr" src="${WECHAT_QR}" alt="${WECHAT_ID} 微信二维码"></div>
        <div class="wx-id-box"><div class="wx-id-text">${WECHAT_ID}</div><button class="wx-copy-btn" id="copyWxBtn" type="button">复制微信号</button></div>
        <p class="wx-tip">可直接扫码添加，也可复制微信号后在微信中搜索添加。手机端可长按二维码保存或识别。</p>
      </div>`;
    document.body.appendChild(mask);

    const homeBtn=document.getElementById('floatHomeBtn');
    const wxBtn=document.getElementById('floatWxBtn');
    const closeBtn=document.getElementById('wxCloseBtn');
    const copyBtn=document.getElementById('copyWxBtn');

    let down=false,moved=false,startX=0,startY=0,startLeft=0,startTop=0;
    dock.addEventListener('pointerdown',function(e){
      down=true;moved=false;
      const r=dock.getBoundingClientRect();startLeft=r.left;startTop=r.top;startX=e.clientX;startY=e.clientY;
      dock.style.left=r.left+'px';dock.style.top=r.top+'px';dock.style.right='auto';dock.style.bottom='auto';
      try{dock.setPointerCapture(e.pointerId)}catch(err){}
    });
    dock.addEventListener('pointermove',function(e){
      if(!down)return;const dx=e.clientX-startX,dy=e.clientY-startY;
      if(Math.abs(dx)>4||Math.abs(dy)>4)moved=true;if(!moved)return;
      const maxLeft=window.innerWidth-dock.offsetWidth-8,maxTop=window.innerHeight-dock.offsetHeight-8;
      dock.style.left=Math.max(8,Math.min(maxLeft,startLeft+dx))+'px';
      dock.style.top=Math.max(8,Math.min(maxTop,startTop+dy))+'px';
    });
    function end(e){if(!down)return;down=false;try{dock.releasePointerCapture(e.pointerId)}catch(err){}}
    dock.addEventListener('pointerup',end);dock.addEventListener('pointercancel',end);

    homeBtn.addEventListener('click',function(e){
      if(moved){e.preventDefault();return}
      if(isHomePage()){window.scrollTo({top:0,behavior:'smooth'})}else{location.href=HOME_PAGE}
    });
    wxBtn.addEventListener('click',function(e){if(moved){e.preventDefault();return}mask.classList.add('show')});
    closeBtn.addEventListener('click',function(){mask.classList.remove('show')});
    mask.addEventListener('click',function(e){if(e.target===mask)mask.classList.remove('show')});
    copyBtn.addEventListener('click',function(){copyText(WECHAT_ID).then(function(){copyBtn.textContent='已复制';setTimeout(function(){copyBtn.textContent='复制微信号'},1600)})});
    window.addEventListener('resize',function(){
      const r=dock.getBoundingClientRect(),maxLeft=window.innerWidth-dock.offsetWidth-8,maxTop=window.innerHeight-dock.offsetHeight-8;
      if(r.left>maxLeft)dock.style.left=maxLeft+'px';if(r.top>maxTop)dock.style.top=maxTop+'px';
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',makeDock);else makeDock();
})();
