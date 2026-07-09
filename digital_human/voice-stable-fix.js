(function(){
  const DEFAULT_RATE = 1.05;
  const DEFAULT_PITCH = 0.86;
  let lastTouch = 0;
  let currentBlock = null;
  function clean(s){return String(s||'').replace(/\s+/g,' ').trim();}
  function getVoices(){return (window.speechSynthesis&&speechSynthesis.getVoices)?speechSynthesis.getVoices():[];}
  function voiceScore(v){
    const n=((v.name||'')+' '+(v.lang||'')).toLowerCase();
    let s=0;
    if(/zh|chinese|中文|普通话|mandarin|cmn|cn|hans/.test(n))s+=100;
    if(/xiaoyi|xiaobei|tingting|meijia|hanhan|yuna|female|woman|女/.test(n))s+=40;
    if(/xiaoxiao|yaoyao/.test(n))s+=10;
    if(/yunxi|yunyang|kangkang|male|man|男/.test(n))s-=30;
    if(/microsoft|apple|google/.test(n))s+=3;
    return s;
  }
  function pickVoice(){return getVoices().slice().sort((a,b)=>voiceScore(b)-voiceScore(a))[0]||null;}
  function status(t){const s=document.getElementById('voiceStatus');if(s)s.textContent=t||'';}
  function introText(){
    const lead=document.querySelector('.hero .lead');
    const tags=[...document.querySelectorAll('.tags li')].map(x=>clean(x.textContent)).filter(Boolean).join('、');
    return clean('丁启利，制造运营改善与工程技术管理专家。'+(lead?lead.textContent:'')+' 核心能力标签包括：'+tags+'。本主页定位为制造改善学习交流平台。');
  }
  function blockOf(t){return t&&t.closest('.topic-control,.answer,.knowledge-card,.project,.paper-card,.method-card,.card,.metric,.timeline,.credential,.contact,article,.assistant-panel,.section,.hero');}
  function blockTitle(b){
    if(!b)return'当前模块';
    if(b.classList&&b.classList.contains('topic-control'))return clean(b.textContent)||'问答模块';
    const h=b.querySelector('h1,h2,h3,.panel-head,strong');
    return h?clean(h.textContent):'当前模块';
  }
  function blockText(b){
    if(!b)return'';
    if(b.classList&&b.classList.contains('topic-control')){
      const a=document.getElementById('answer');
      return clean(a?a.textContent:'');
    }
    let nodes=[...b.querySelectorAll('h1,h2,h3,p,li,.project-result,.highlight,.answer,em,strong')];
    if(!nodes.length)nodes=[b];
    return clean(nodes.map(n=>clean(n.textContent)).filter(Boolean).join('。')).slice(0,2200);
  }
  function speakStable(text,title,auto){
    if(!window.speechSynthesis||!window.SpeechSynthesisUtterance){status('当前浏览器不支持语音播报。');return;}
    if(!text)return;
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text);
    u.lang='zh-CN';
    u.rate=parseFloat(localStorage.getItem('voiceRate')||DEFAULT_RATE)||DEFAULT_RATE;
    u.pitch=DEFAULT_PITCH;
    u.volume=1;
    const v=pickVoice();
    if(v)u.voice=v;
    const portrait=document.querySelector('.portrait-frame');
    u.onstart=function(){status((auto?'默认播报：':'正在播报：')+(title||'当前内容')+'｜成熟稳重女声｜音量100%｜语速 '+u.rate.toFixed(2)+'x');portrait&&portrait.classList.add('speaking');};
    u.onend=function(){status('播报完成。触摸任意模块，可立即切换播报。');portrait&&portrait.classList.remove('speaking');};
    u.onerror=function(){status('浏览器限制自动播放时，请点一下“播报”。');portrait&&portrait.classList.remove('speaking');};
    speechSynthesis.speak(u);
  }
  function removeVoiceSelector(){
    document.querySelectorAll('.voice-select-row').forEach(x=>x.remove());
    localStorage.removeItem('voiceName');
    const sub=document.querySelector('.voice-sub');
    if(sub)sub.textContent='可拖动｜成熟稳重女声｜触摸模块立即播报';
  }
  function bindVoiceButtons(){
    const play=document.getElementById('voicePlay'), pause=document.getElementById('voicePause'), stop=document.getElementById('voiceStop');
    const rate=document.getElementById('voiceRate'), val=document.getElementById('voiceRateVal');
    if(rate){rate.value=localStorage.getItem('voiceRate')||String(DEFAULT_RATE);if(val)val.textContent=parseFloat(rate.value).toFixed(2)+'x';rate.oninput=function(){localStorage.setItem('voiceRate',rate.value);if(val)val.textContent=parseFloat(rate.value).toFixed(2)+'x';};}
    if(play)play.onclick=function(e){e.preventDefault();e.stopPropagation();speakStable(currentBlock?blockText(currentBlock):introText(),currentBlock?blockTitle(currentBlock):'一分钟介绍',false);};
    if(pause)pause.onclick=function(e){e.preventDefault();e.stopPropagation();if(speechSynthesis.speaking&&!speechSynthesis.paused){speechSynthesis.pause();status('已暂停。');}else if(speechSynthesis.paused){speechSynthesis.resume();status('继续播报…');}};
    if(stop)stop.onclick=function(e){e.preventDefault();e.stopPropagation();speechSynthesis.cancel();status('已停止。');const p=document.querySelector('.portrait-frame');p&&p.classList.remove('speaking');};
  }
  function speakFromTarget(t){
    if(!t||t.closest('.voice-card,.voice-mini,.float-dock,.wx-mask'))return;
    const topic=t.closest('.topic-control');
    if(topic){setTimeout(function(){currentBlock=topic;speakStable(blockText(topic),blockTitle(topic),false);},140);return;}
    if(t.closest('a,button,input,textarea,select'))return;
    const b=blockOf(t);if(!b)return;
    document.querySelectorAll('.speak-source').forEach(x=>x.classList.remove('speak-source'));
    currentBlock=b;b.classList.add('speak-source');setTimeout(()=>b.classList.remove('speak-source'),1600);
    speakStable(blockText(b),blockTitle(b),false);
  }
  function init(){
    removeVoiceSelector();bindVoiceButtons();
    if(window.speechSynthesis&&speechSynthesis.addEventListener)speechSynthesis.addEventListener('voiceschanged',function(){localStorage.removeItem('voiceName');});
    document.addEventListener('touchend',function(e){lastTouch=Date.now();speakFromTarget(e.target);},{capture:true,passive:true});
    document.addEventListener('click',function(e){if(Date.now()-lastTouch<450)return;speakFromTarget(e.target);},true);
    if(!sessionStorage.getItem('stableVoiceIntroPlayed')&&localStorage.getItem('voiceClosed')!=='1'&&/home\.html|digital_human\/?$/i.test(location.pathname)){
      sessionStorage.setItem('stableVoiceIntroPlayed','1');
      setTimeout(function(){removeVoiceSelector();bindVoiceButtons();speakStable(introText(),'一分钟介绍',true);},1600);
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();