(function(){
  function sectionByTitle(keyword){
    return Array.from(document.querySelectorAll('section')).find(function(sec){
      var h=sec.querySelector('h2');
      return h && h.textContent.indexOf(keyword)>=0;
    });
  }
  function hero(){
    var lead=document.querySelector('.hero .lead');
    if(lead)lead.textContent='制造运营改善与工程技术管理实践者。近20年制造业工程技术、精益改善、项目交付与数智化工厂推进经验，覆盖PCBA、SMT、汽车电子、电气、新能源、半导体、小家电等制造场景。主页定位不是普通个人简历，而是围绕PQCD、VSM价值流、标准工时、SMED、OEE、ERP/MES基础数据、Factory Layout、目视化和项目机制固化建立的制造改善经验入口。';
  }
  function metrics(){
    var sec=sectionByTitle('关键成果');
    if(!sec||sec.dataset.depthDone==='1')return;
    sec.dataset.depthDone='1';
    var head=sec.querySelector('.head');
    var box=sec.querySelector('.metrics');
    if(head)head.innerHTML='<h2>制造改善能力总览</h2><p>不再用几个结果数字做浅层展示，而是把制造改善拆成“诊断、数据、试运行、协同、固化、复盘”的项目交付链。数字只是结果，真正的价值是能把现场问题变成可执行、可验证、可复制的机制。</p>';
    if(box)box.innerHTML='<div class="metric"><strong>诊断</strong><span>从Gemba现场、订单流、物料流、工艺流、设备状态、质量异常和管理节奏切入，判断问题属于流程断点、数据口径、资源约束还是组织协同。</span><em>VSM / 5M2E / Pareto / 5W2H</em></div><div class="metric"><strong>数据</strong><span>建立标准工时、标准产能、人机配置、UPPH、工序节拍、线平衡、OEE损失结构和ERP/MES基础数据，避免改善停留在口号层面。</span><em>IE数据 / ERP / MES / APS</em></div><div class="metric"><strong>试运行</strong><span>以Pilot试运行验证方案，不把短期改善直接做成KPI压力；先暴露问题、稳定节拍、确认品质边界、明确角色分工。</span><em>试运行 / 基准测时 / 问题暴露</em></div><div class="metric"><strong>交付</strong><span>通过跨部门推进把改善转化为现场动作，包括计划冻结、物料齐套、工装治具、换型准备、首件确认、异常响应和日常管理。</span><em>DMS / 例会 / 红线管控 / 表单闭环</em></div><div class="metric"><strong>固化</strong><span>把有效方法沉淀为SOP/SWI、程序文件、点检表、工时版本、看板、库位编码、参数基准和系统数据规则。</span><em>标准化 / 可复制 / 可审计</em></div><div class="metric"><strong>经营</strong><span>用交付周期、WIP、OEE、良率、人效、库存、换型时间和项目收益表达改善价值，让精益从活动变成经营改善语言。</span><em>PQCD / DLT / OEE / ROI</em></div><div class="metric"><strong>规划</strong><span>面向新工厂设计规划、既有产线布局优化、人流物流动线、精益物流、库位与配送方式、NPI和ECN/ECR评审建立系统方案。</span><em>Factory Layout / NPI / PMO</em></div><div class="metric"><strong>复盘</strong><span>每个项目保留问题背景、关键动作、数据口径、阶段结果、风险边界和下一步计划，形成制造改善知识资产。</span><em>案例库 / 经验库 / 模板库</em></div>';
  }
  function capabilities(){
    var sec=document.getElementById('capabilities');
    if(!sec||sec.dataset.depthDone==='1')return;
    sec.dataset.depthDone='1';
    sec.innerHTML='<div class="inner"><div class="head"><h2>制造改善方法体系图谱</h2><p>公开主页不展开敏感履历，但必须体现专业纵深：从现场诊断到系统数据，从单点改善到机制固化，从车间问题到经营结果。这里展示的是方法体系，不是求职口号。</p></div><div class="grid-4"><article class="card"><div class="tagline">流程与交付</div><h3>VSM / LT / WIP</h3><p>识别订单信息流、物料流、生产节拍、等待、库存和发货节奏之间的断点。重点不是画图，而是形成改善优先级、责任边界和跨部门行动。</p><div class="highlight">输出：现状图、未来态、LT结构、WIP控制和交付改善路径。</div></article><article class="card"><div class="tagline">数据与产能</div><h3>标准工时 / UPPH / 线平衡</h3><p>把标准工时从考核口径还原为制造运营数据底座，服务产能、排程、报价、成本、ERP/MES参数和经营复盘。</p><div class="highlight">输出：工时版本、标准产能、人机配置、节拍和排程基础数据。</div></article><article class="card"><div class="tagline">设备与换型</div><h3>OEE / SMED / TPM</h3><p>把停机、速度损失、换型等待、首件确认、不良返工和物料准备纳入统一损失结构。SMED不是催人更快，而是标准化换型系统。</p><div class="highlight">输出：损失结构、换型流程、工具定置、参数基准和首件确认。</div></article><article class="card"><div class="tagline">质量与异常</div><h3>5M2E / 8D / PDCA</h3><p>从人、机、料、法、测、能/源、环区分主因，避免简单归因现场执行。异常闭环必须有数据口径、责任边界、验证方式和复发预防。</p><div class="highlight">输出：原因分析、改善闭环、Poka-Yoke和过程控制机制。</div></article><article class="card"><div class="tagline">布局与物流</div><h3>Factory Layout / 精益物流</h3><p>新工厂设计规划不是先画漂亮Layout，而是先定义产品、产能、工艺、物流、人员、设备、公辅、品质和扩展边界。</p><div class="highlight">输出：人流物流动线、库位、配送频次、WIP控制和扩展弹性。</div></article><article class="card"><div class="tagline">管理与固化</div><h3>DMS / 6S / 目视化</h3><p>目视化不是贴标识，而是把状态、边界、责任、异常、标准和节奏变成现场共同语言。</p><div class="highlight">输出：DMS、6S红线、点检、看板、表单和复盘机制。</div></article><article class="card"><div class="tagline">数智化协同</div><h3>ERP / MES / APS</h3><p>数智化工厂先做数据地基，再谈软件、大屏和自动化；否则系统只会放大现场混乱。</p><div class="highlight">输出：BOM、路线、工时、产能、计划、实绩和库存口径统一。</div></article><article class="card"><div class="tagline">项目机制</div><h3>阶段门 / PMO / 横向复制</h3><p>以项目机制推动改善，不靠个人英雄主义；用阶段门管理范围、风险、责任、验证和复制。</p><div class="highlight">输出：试点验证、培训稽核、复盘沉淀和横向复制。</div></article></div></div>';
  }
  function projects(){
    var sec=document.getElementById('projects');
    if(!sec||sec.dataset.depthDone==='1')return;
    sec.dataset.depthDone='1';
    sec.innerHTML='<div class="inner"><div class="head"><h2>代表项目矩阵</h2><p>代表项目不再只列标题和数字，而按“问题背景—关键动作—方法工具—阶段结果—机制沉淀”呈现。公开区控制企业敏感信息，但保留项目逻辑和改善厚度。</p></div><div class="grid-2"><article class="project"><small>汽车电子｜第一阶段精益体系建设</small><h3>精益体系、VSM、单件流与SMED标准化</h3><p>背景：汽车座椅开关、线束、注塑、装配、SMT/波峰焊等场景，存在计划协同、工时口径、WIP、换型、目视化和基础数据不统一的问题。</p><ul class="list"><li>建立精益推进总纲、DMS、6S稽查、红线管控和改善表单。</li><li>以主流产品族绘制VSM现状图，分析LT、VAT、WIP、等待和信息流断点。</li><li>推进标准工时、标准产能、人机配置、UPPH、线平衡和ERP/MES基础数据。</li></ul><div class="project-result">沉淀：公司级精益运行框架、VSM改善路径、IE数据底座、SMED程序文件和现场试运行机制。</div></article><article class="project"><small>大型模具｜SMED快速换型</small><h3>300T冲压机3.5T大型模具换模改善</h3><p>背景：大型模具换模周期长，涉及吊装、工具准备、接口确认、参数设置、首件检验和等待浪费。</p><ul class="list"><li>开展全过程Time Study，拆解内外部作业和等待损失。</li><li>结合5M2E识别吊具、工具、人员、设备接口、参数、品质确认等主因。</li><li>优化换模前准备、工具定置、角色分工、参数基准和首件确认流程。</li></ul><div class="project-result">结果：换模时间由约14小时缩短至7小时，降幅约50%；释放设备有效稼动时间，并形成可复用换型流程。</div></article><article class="project"><small>智能模具库｜库位与追溯管理</small><h3>1200+副模具标准化与二维码追溯</h3><p>背景：模具查找、领用、归还、保养、维修、报废和盘点流程分散，现场寻找时间长，账实一致性弱。</p><ul class="list"><li>规划智能模具立体库，建立模具编号和库位编码。</li><li>建立模具本体/库位二维码关联机制，覆盖领用、归还、保养、维修和盘点流程。</li><li>以库位、标识、流程、权限和数据台账形成闭环。</li></ul><div class="project-result">结果：1200+副模具实现标准化管理；取放时间缩短至1–5分钟，综合年创效约300万元。</div></article><article class="project"><small>保险丝制程｜质量与工艺改善</small><h3>玻璃管保险丝切口断裂率改善</h3><p>背景：切口断裂不良影响良率与交付，需要从刀具、速度、压力、夹持、定位、材料和首件确认多维度识别主因。</p><ul class="list"><li>建立断裂不良数据采集口径和Pareto分析。</li><li>结合5M2E分析刀具、参数、夹持、定位和作业方法。</li><li>固化SOP/SWI、首件确认、巡检频次和异常反馈机制。</li></ul><div class="project-result">结果：断裂率由约12%降至＜1%，年创效约50万元；形成工艺窗口和现场确认机制。</div></article><article class="project"><small>新工厂/新产线｜设计规划</small><h3>Factory Layout、精益物流与扩展边界规划</h3><p>背景：新工厂或新产线规划若只先画Layout，容易忽略产品族、产能、工艺路线、物流频次、库位、设备、公辅、安全和扩展弹性。</p><ul class="list"><li>先定义产品、产能、工艺、人员、设备、物料、品质、公辅和扩展边界。</li><li>规划人流物流动线、库位策略、配送方式、线边WIP和异常缓冲。</li><li>结合NPI、ECN/ECR、阶段门和PMO机制控制导入风险。</li></ul><div class="project-result">沉淀：新工厂设计规划从“画图”升级为“制造系统设计”，兼顾效率、质量、交付、安全和后续扩展。</div></article><article class="project"><small>数智化工厂｜数据地基</small><h3>ERP/MES/APS协同与IE基础数据治理</h3><p>背景：系统上线后若BOM、工艺路线、工时、产能、计划、实绩和库存口径不一致，会导致排产、齐套、领料和倒冲异常。</p><ul class="list"><li>以标准工时、标准产能、工序节拍、人机配置和工艺路线建立数据底座。</li><li>联动PMC、工程、生产、品质、物控，明确计划冻结、日计划、实绩录入和异常反馈规则。</li><li>将现场改善结果转化为系统可使用的数据、规则和参数。</li></ul><div class="project-result">沉淀：让数智化工厂从软件展示回到制造运营基本功，支撑计划、交付、成本和改善复盘。</div></article></div></div>';
  }
  function apply(){hero();metrics();capabilities();projects();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
  setTimeout(apply,350);setTimeout(apply,1000);
})();