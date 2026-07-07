(function(){
  const WECHAT_ID='Qily259';
  const WECHAT_URL='https://u.wechat.com/MLB4bqkwRqFx4Olc1YASELw?s=2';
  const HOME_PAGE='home.html';
  const QR_SIZE=41;
  const QR_BITS='0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001111111011111111111010010011111110000000010000010101111001010011110100000100000000101110100110100101001001001011101000000001011101010110011100110100010111010000000010111010001010100000111000101110100000000100000100011000000111010101000001000000001111111010101010101010101011111110000000000000000111100100110100010000000000000000101101110001101000110100001001011000000001101000011111010101101010011011110000000010101010101110101100010110011100100000000001000000010011110111000100101010000000000001011001010000001100000100010010000000000100000111110001010001010110001000000000110010111110000110100010001110000000000001001000100110110101111100111011000000000000100011101011110111111001101100000000000101100001001111101001101101011001000000001111001001011101110011100001101100000000011001101101011000001001011101000000000000110011111000101000101110000101100000000001101000111001111001001100101010010000000000010011100001001000001111111011100000000011111011110001010010010100011010000000001011101100111001111000001111100000000000000000000111000011111000010001100100000000111111101101011010011111101010000000000001000001010111000000101011000111100000000010111010010010100100100111111010100000000101110101101100000111110110101101000000001011101010111110000100110011001000000000010000010010111011101000100111000100000000111111101101011111100101001010100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';

  const style=document.createElement('style');
  style.textContent=`
    .brand-mark{display:none!important}
    .brand{gap:0!important}
    .float-dock{position:fixed;right:18px;bottom:86px;z-index:9999;display:flex;flex-direction:column;gap:10px;user-select:none;touch-action:none}
    .float-btn{width:62px;height:62px;border:1px solid rgba(255,232,173,.55);border-radius:50%;box-shadow:0 12px 30px rgba(15,75,90,.28);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:0;cursor:pointer;font:inherit;font-weight:900;line-height:1.12;transition:transform .18s ease,box-shadow .18s ease,filter .18s ease}
    .float-btn:hover{transform:translateY(-1px);box-shadow:0 16px 36px rgba(15,75,90,.32);filter:saturate(1.08)}
    .float-btn .float-icon{font-size:18px;font-weight:900;line-height:1}
    .float-btn .float-text{font-size:10px;text-align:center;padding:0 4px;letter-spacing:.2px}
    .float-home{color:#fff;background:linear-gradient(135deg,#0f4b5a,#178b94)}
    .float-share{color:#fff;background:linear-gradient(135deg,#6e3f5f,#9e4a78)}
    .float-wx{color:#17322d;background:linear-gradient(135deg,#ffe39b,#f5c861)}
    .wx-mask{position:fixed;inset:0;z-index:10000;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.42);padding:20px}
    .wx-mask.show{display:flex}
    .wx-panel{position:relative;width:min(92vw,460px);max-height:90vh;overflow:auto;padding:24px 20px 20px;border-radius:20px;background:#fff;box-shadow:0 24px 70px rgba(0,0,0,.24);border:1px solid #d5e4e3;color:#182420;text-align:center}
    .wx-panel h3{margin:0 0 10px;color:#0f4b5a;font-size:24px;line-height:1.25}
    .wx-panel p{margin:0 0 12px;color:#4b6260;line-height:1.65}
    .wx-qr-wrap{width:max-content;max-width:100%;margin:14px auto 16px;padding:10px;border:1px solid #d5e4e3;border-radius:16px;background:#fff;box-shadow:0 8px 22px rgba(15,75,90,.08)}
    .wx-qr-canvas{display:block;width:min(68vw,300px);height:min(68vw,300px);max-width:300px;max-height:300px;margin:0 auto;border-radius:10px;background:#fff}
    .wx-id-box{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:14px 0;padding:14px;border:1px solid #d5e4e3;border-radius:14px;background:#eef8f6;text-align:left}
    .wx-id-text{font-size:24px;font-weight:950;color:#0f4b5a;letter-spacing:.4px;word-break:break-all}
    .wx-copy-btn,.wx-link-btn{border:none;border-radius:12px;background:#0f4b5a;color:#fff;padding:10px 14px;font:inherit;font-weight:850;cursor:pointer;white-space:nowrap;text-decoration:none;display:inline-flex;align-items:center;justify-content:center}
    .wx-copy-btn:hover,.wx-link-btn:hover{background:#178b94}
    .wx-close{position:absolute;right:12px;top:10px;width:34px;height:34px;border:none;border-radius:50%;background:#eef5f2;color:#35524f;font-size:21px;cursor:pointer}
    .wx-tip{font-size:14px;color:#6a7d7b!important;text-align:left}
    .float-toast{position:fixed;left:50%;bottom:28px;z-index:11000;transform:translateX(-50%) translateY(18px);opacity:0;pointer-events:none;padding:10px 15px;border-radius:999px;color:#fff;background:rgba(15,75,90,.94);box-shadow:0 12px 30px rgba(0,0,0,.2);font-size:14px;font-weight:850;transition:opacity .18s ease,transform .18s ease;white-space:nowrap}
    .float-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
    @media(max-width:760px){.float-dock{right:12px;bottom:74px;gap:8px}.float-btn{width:56px;height:56px}.float-btn .float-icon{font-size:16px}.float-btn .float-text{font-size:10px}.wx-id-box{align-items:stretch;flex-direction:column}.wx-copy-btn,.wx-link-btn{width:100%}.wx-qr-canvas{width:min(72vw,260px);height:min(72vw,260px)}}
  `;
  document.head.appendChild(style);

  function copyText(text){
    if(navigator.clipboard&&window.isSecureContext){return navigator.clipboard.writeText(text)}
    const input=document.createElement('input');
    input.value=text;input.setAttribute('readonly','');input.style.position='fixed';input.style.left='-9999px';
    document.body.appendChild(input);input.select();document.execCommand('copy');document.body.removeChild(input);return Promise.resolve();
  }

  function toast(msg){
    let el=document.getElementById('floatToast');
    if(!el){el=document.createElement('div');el.id='floatToast';el.className='float-toast';document.body.appendChild(el)}
    el.textContent=msg;el.classList.add('show');
    clearTimeout(el._t);el._t=setTimeout(function(){el.classList.remove('show')},2200);
  }

  function isHomePage(){
    return /\/home\.html$/i.test(location.pathname)||/\/index\.html$/i.test(location.pathname)||/\/digital_human\/?$/i.test(location.pathname);
  }

  function currentShareTarget(){
    let title=document.title.replace('｜丁启利 AI 数字人','').trim()||'丁启利 AI 数字人主页';
    let url=location.href.split('#')[0];
    const articles=Array.from(document.querySelectorAll('.article[id]'));
    let current=null;
    for(const a of articles){
      const r=a.getBoundingClientRect();
      if(r.top<=140&&r.bottom>140){current=a;break}
    }
    if(!current&&location.hash){current=document.querySelector(location.hash)}
    if(current&&current.id){
      const h=current.querySelector('h2');
      if(h&&h.textContent.trim())title=h.textContent.trim();
      url=location.href.split('#')[0]+'#'+current.id;
    }
    return {title,url,text:title};
  }

  async function shareCurrent(){
    const item=currentShareTarget();
    try{
      if(navigator.share){
        await navigator.share(item);
        toast('已调起系统分享');
      }else{
        await copyText(item.title+'\n'+item.url);
        toast('链接已复制，可粘贴转发');
      }
    }catch(e){
      try{await copyText(item.title+'\n'+item.url);toast('链接已复制，可粘贴转发')}catch(err){toast('请手动复制地址栏链接')}
    }
  }

  function drawQr(){
    const c=document.getElementById('wxQrCanvas');
    if(!c)return;
    const px=8;
    c.width=QR_SIZE*px;c.height=QR_SIZE*px;
    const ctx=c.getContext('2d');
    ctx.fillStyle='#fff';ctx.fillRect(0,0,c.width,c.height);
    ctx.fillStyle='#000';
    for(let y=0;y<QR_SIZE;y++){
      for(let x=0;x<QR_SIZE;x++){
        if(QR_BITS[y*QR_SIZE+x]==='1')ctx.fillRect(x*px,y*px,px,px);
      }
    }
  }

  function makeDock(){
    if(document.getElementById('floatDock'))return;
    const dock=document.createElement('div');
    dock.className='float-dock';dock.id='floatDock';
    dock.innerHTML=`
      <button class="float-btn float-home" id="floatHomeBtn" type="button" aria-label="回到首页"><span class="float-icon">⌂</span><span class="float-text">回首页</span></button>
      <button class="float-btn float-share" id="floatShareBtn" type="button" aria-label="分享当前页面"><span class="float-icon">↗</span><span class="float-text">分享</span></button>
      <button class="float-btn float-wx" id="floatWxBtn" type="button" aria-label="微信在线服务"><span class="float-icon">微</span><span class="float-text">微信服务</span></button>`;
    document.body.appendChild(dock);

    const mask=document.createElement('div');
    mask.className='wx-mask';mask.id='wxMask';
    mask.innerHTML=`
      <div class="wx-panel" role="dialog" aria-modal="true" aria-label="微信在线服务">
        <button class="wx-close" id="wxCloseBtn" type="button" aria-label="关闭">×</button>
        <h3>${WECHAT_ID} 微信在线服务</h3>
        <p>欢迎就精益生产、IE标准工时、VSM价值流、SMED、数智化工厂与项目改善进行交流。</p>
        <div class="wx-qr-wrap"><canvas class="wx-qr-canvas" id="wxQrCanvas" aria-label="${WECHAT_ID} 微信二维码"></canvas></div>
        <div class="wx-id-box"><div class="wx-id-text">${WECHAT_ID}</div><button class="wx-copy-btn" id="copyWxBtn" type="button">复制微信号</button></div>
        <a class="wx-link-btn" href="${WECHAT_URL}" target="_blank" rel="noopener">打开微信添加链接</a>
        <p class="wx-tip">电脑、平板、手机均可复制微信号；手机端也可长按二维码保存或识别。</p>
      </div>`;
    document.body.appendChild(mask);
    drawQr();

    const homeBtn=document.getElementById('floatHomeBtn');
    const shareBtn=document.getElementById('floatShareBtn');
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
    shareBtn.addEventListener('click',function(e){if(moved){e.preventDefault();return}shareCurrent()});
    wxBtn.addEventListener('click',function(e){if(moved){e.preventDefault();return}mask.classList.add('show');drawQr()});
    closeBtn.addEventListener('click',function(){mask.classList.remove('show')});
    mask.addEventListener('click',function(e){if(e.target===mask)mask.classList.remove('show')});
    copyBtn.addEventListener('click',function(){copyText(WECHAT_ID).then(function(){copyBtn.textContent='已复制';toast('微信号已复制');setTimeout(function(){copyBtn.textContent='复制微信号'},1600)})});
    window.addEventListener('resize',function(){
      const r=dock.getBoundingClientRect(),maxLeft=window.innerWidth-dock.offsetWidth-8,maxTop=window.innerHeight-dock.offsetHeight-8;
      if(r.left>maxLeft)dock.style.left=maxLeft+'px';if(r.top>maxTop)dock.style.top=maxTop+'px';
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',makeDock);else makeDock();
})();
