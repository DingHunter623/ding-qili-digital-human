(function(){
'use strict';
function addCard(){
  var sec=document.getElementById('knowledge');
  if(!sec)return;
  var grid=sec.querySelector('.knowledge-grid');
  if(!grid)return;
  var card=document.getElementById('dailyInsightsKnowledgeCard');
  if(!card){card=document.createElement('article');card.className='knowledge-card';card.id='dailyInsightsKnowledgeCard';grid.insertBefore(card,grid.firstChild);}
  card.innerHTML='<small>每日工程简报｜最新：2026-07-22</small><h3>每日工程版简报</h3><p>最新简报：5W2H不是要因分析，而是把问题和行动说清楚。简报目录已完整关联2025-12-19以来全部内容，并按最新至最早自动排列。</p><ul class="knowledge-tags"><li>精益/IE</li><li>数智化工厂</li><li>汽车电子</li></ul><div class="knowledge-actions"><a class="button" href="/qilylean/daily-insights.html?view=all#all-briefs" target="_top">查看全部简报</a></div>';
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addCard,{once:true});else addCard();
window.addEventListener('load',addCard,{once:true});
setTimeout(addCard,400);setTimeout(addCard,1200);
})();