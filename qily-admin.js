(function(){
'use strict';
var API='https://qilylean-ai.dinghunter623.workers.dev/admin/status';
var token=document.getElementById('token');
var login=document.getElementById('loginBox');
var dashboard=document.getElementById('dashboard');
var connect=document.getElementById('connect');
var refresh=document.getElementById('refresh');
var logout=document.getElementById('logout');
var badge=document.getElementById('serviceBadge');

function setText(id,value){document.getElementById(id).textContent=value;}
function setBadge(text,ok){badge.textContent=text;badge.className='badge '+(ok?'ok':'bad');}
function savedToken(){return sessionStorage.getItem('qily_admin_token')||'';}

async function load(){
  var value=token.value.trim()||savedToken();
  if(!value){setBadge('需要口令',false);return;}
  connect.disabled=true;refresh.disabled=true;setBadge('连接中',true);
  try{
    var response=await fetch(API,{headers:{Authorization:'Bearer '+value}});
    var data=await response.json().catch(function(){return{};});
    if(!response.ok)throw new Error(response.status===401?'管理口令不正确':'后台请求失败：'+response.status);
    sessionStorage.setItem('qily_admin_token',value);
    login.classList.add('hidden');dashboard.classList.remove('hidden');
    setBadge('运行正常',true);
    setText('todayRequests',data.today.requests||0);
    setText('todaySuccess',data.today.success||0);
    setText('todayErrors',data.today.errors||0);
    setText('todayLimited',data.today.rate_limited||0);
    setText('model',data.model||'—');
    setText('limit',(data.daily_ip_limit||0)+' 次/日');
    setText('maxTokens',data.max_output_tokens||'—');
    setText('keyState',data.openai_key_configured?'已配置':'未配置');
    setText('storage',data.statistics_storage==='enabled'?'已启用 Cloudflare KV':'尚未绑定 KV');
    setText('allTime',[data.all_time.requests||0,data.all_time.success||0,data.all_time.errors||0].join(' / '));
    setText('dateUtc',data.date_utc||'—');
  }catch(e){
    setBadge(e.message||'连接失败',false);
    login.classList.remove('hidden');dashboard.classList.add('hidden');
  }finally{connect.disabled=false;refresh.disabled=false;}
}

connect.addEventListener('click',load);
token.addEventListener('keydown',function(e){if(e.key==='Enter')load();});
refresh.addEventListener('click',load);
logout.addEventListener('click',function(){sessionStorage.removeItem('qily_admin_token');token.value='';dashboard.classList.add('hidden');login.classList.remove('hidden');setBadge('已退出',false);});
if(savedToken()){token.value=savedToken();load();}
})();
