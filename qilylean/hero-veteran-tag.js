(function(){
  function apply(){
    var heroTags=document.querySelector('.hero .tags');
    document.querySelectorAll('li,span,.tag,.pill').forEach(function(el){
      if((el.textContent||'').trim()==='退役军人' && (!heroTags || !heroTags.contains(el)))el.remove();
    });
    if(!heroTags)return;
    var existing=Array.from(heroTags.children).find(function(el){return (el.textContent||'').trim()==='退役军人';});
    if(!existing){
      var li=document.createElement('li');
      li.textContent='退役军人';
      li.setAttribute('data-core-tag','veteran');
      heroTags.appendChild(li);
    }
    Array.from(heroTags.children).forEach(function(el,index,arr){
      if((el.textContent||'').trim()==='退役军人' && el!==arr.find(function(x){return (x.textContent||'').trim()==='退役军人';}))el.remove();
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
  setTimeout(apply,300);setTimeout(apply,900);setTimeout(apply,1800);
  new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true});
})();