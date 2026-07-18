(function(){
'use strict';
function addCard(){
  var sec=document.getElementById('knowledge');
  if(!sec||document.getElementById('dailyInsightsKnowledgeCard'))return;
  var grid=sec.querySelector('.knowledge-grid');
  if(!grid)return;
  var card=document.createElement('article');
  card.className='knowledge-card';
  card.id='dailyInsightsKnowledgeCard';
  card.innerHTML='<small>每日动态</small><h3>每日制造改善动态</h3><p>围绕精益生产、目视化管理、IE方法与数智化工厂持续更新，按日期沉淀适合学习、交流与朋友圈分享的专业内容。</p><ul class="knowledge-tags"><li>精益生产</li><li>目视化</li><li>数智化工厂</li></ul><div class="knowledge-actions"><a class="button" href="daily-insights.html">查看每日目录</a></div>';
  grid.insertBefore(card,grid.firstChild);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addCard,{once:true});else addCard();
setTimeout(addCard,500);setTimeout(addCard,1500);
})();