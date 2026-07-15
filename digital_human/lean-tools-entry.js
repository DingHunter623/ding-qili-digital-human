(function(){
'use strict';
if(!/lean-knowledge\.html$/i.test(location.pathname)||document.getElementById('leanToolsEntry'))return;
var toc=document.querySelector('.toc');if(toc){var a=document.createElement('a');a.id='leanToolsEntry';a.href='lean-tools.html';a.textContent='精益生产管理十大核心工具';toc.insertBefore(a,toc.firstElementChild);}
var host=document.querySelector('.section .inner');if(!host)return;
var card=document.createElement('article');card.className='article';card.id='lean-tools-feature';card.innerHTML='<small>精益生产专题</small><h2>精益生产管理十大核心工具</h2><ul class="tag-row"><li>VSM</li><li>标准工时</li><li>SMED</li><li>TPM</li><li>数字化精益</li></ul><p>系统介绍价值流分析、标准工时、标准作业、快速换型、单件流、ECRS、5W2H+PDCA、TPM、目视化管理与数字化精益的工具定位、应用场景和改善价值。</p><h3>专题重点</h3><ul class="list"><li>理解十大工具分别解决什么制造问题。</li><li>识别不同工具的适用场景和实施边界。</li><li>建立从客户需求、流程诊断到数字化闭环的协同逻辑。</li></ul><div class="actions"><a class="button" href="lean-tools.html">查看专题</a><a class="button secondary" href="#top">返回顶部</a></div>';
host.insertBefore(card,host.firstElementChild);
})();