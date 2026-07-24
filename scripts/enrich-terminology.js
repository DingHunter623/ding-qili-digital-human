#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const terminologyPath = path.join(root, 'knowledge/terminology.html');
const knowledgeIndexPath = path.join(root, 'knowledge/index.html');

let html = fs.readFileSync(terminologyPath, 'utf8');

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function articlePattern(code) {
  return new RegExp(
    '<article class="term-card" data-term-card>\\s*' +
    '<div class="term-code">' + escapeRegExp(code) + '<\\/div>[\\s\\S]*?<\\/article>'
  );
}

function replaceArticle(code, replacement) {
  const pattern = articlePattern(code);
  if (!pattern.test(html)) throw new Error('未找到术语卡片：' + code);
  html = html.replace(pattern, replacement.trim());
}

function insertAfter(code, cardCode, cardHtml) {
  if (html.includes('<div class="term-code">' + cardCode + '</div>')) return;
  const pattern = articlePattern(code);
  const match = html.match(pattern);
  if (!match) throw new Error('未找到插入锚点：' + code);
  html = html.replace(pattern, match[0] + '\n' + cardHtml.trim());
}

function insertBefore(code, cardCode, cardHtml) {
  if (html.includes('<div class="term-code">' + cardCode + '</div>')) return;
  const pattern = articlePattern(code);
  const match = html.match(pattern);
  if (!match) throw new Error('未找到插入锚点：' + code);
  html = html.replace(pattern, cardHtml.trim() + '\n' + match[0]);
}

insertAfter('Lean', 'TPS', `
<article class="term-card" data-term-card>
  <div class="term-code">TPS</div>
  <div class="term-en">Toyota Production System</div>
  <h3>丰田生产方式／丰田生产系统</h3>
  <p><strong>应用场景：</strong>以准时化生产（JIT）和自働化（Jidoka）为两大支柱，以标准作业、生产均衡化、持续改善、目视化及尊重人为基础，追求在更短交付周期内稳定提供质量、成本和交付结果。TPS不是简单复制看板、零库存或单件流，而是围绕客户价值建立完整的制造管理系统。</p>
</article>`);

insertAfter('7S', '8S', `
<article class="term-card" data-term-card>
  <div class="term-code">8S</div>
  <div class="term-en">5S + Safety + Saving + Study</div>
  <h3>整理、整顿、清扫、清洁、素养、安全、节约、学习</h3>
  <p><strong>应用场景：</strong>在7S基础上增加学习（Study），用于把现场秩序、安全、资源节约与员工知识技能提升结合起来。不同企业也可能把第八项定义为服务或满意，制度、看板和稽查表必须先统一本企业口径，不能只增加口号而不定义检查标准。</p>
</article>`);

insertBefore('DFMEA', 'FMEA', `
<article class="term-card" data-term-card>
  <div class="term-code">FMEA</div>
  <div class="term-en">Failure Mode and Effects Analysis</div>
  <h3>失效模式及后果分析</h3>
  <p><strong>应用场景：</strong>用于在问题发生前系统识别产品、过程或系统可能怎样失效、造成什么后果、由什么原因引起，以及现有预防与探测控制是否充分。FMEA是上位概念，常按对象展开为DFMEA、PFMEA及系统FMEA；正确缩写为FMEA，“FEMA”属于常见误写。</p>
</article>`);

insertAfter('FAI', '品质三检', `
<article class="term-card" data-term-card>
  <div class="term-code">品质三检</div>
  <div class="term-en">First / In-process / Final Inspection</div>
  <h3>首检、中检、终检</h3>
  <p><strong>应用场景：</strong>首检用于开线、换线、换模、换料、调机或工程变更后的首件确认；中检用于生产过程中按规定频次、批次或时间节点检查尺寸、外观、参数和关键特性；终检用于工序完结、包装或放行前确认最终质量状态。品质三检强调检验时点，不等同于“自检、互检、专检”的责任分工。</p>
</article>`);

replaceArticle('QA', `
<article class="term-card" data-term-card>
  <div class="term-code">QA</div>
  <div class="term-en">Quality Assurance</div>
  <h3>质量保证</h3>
  <p><strong>应用场景：</strong>侧重质量体系、流程规则、审核监督、风险预防和放行机制，确保从研发、采购、制造到交付的全过程持续满足标准与客户要求。QA关注“体系能否稳定保证质量”，不等同于现场QC检验。</p>
</article>`);

replaceArticle('QE', `
<article class="term-card" data-term-card>
  <div class="term-code">QE</div>
  <div class="term-en">Quality Engineering</div>
  <h3>质量工程</h3>
  <p><strong>应用场景：</strong>用于质量策划、客户要求转化、检验与控制方案设计、过程能力分析、异常根因改善、质量工具应用及跨部门闭环。QE承担工程化预防与改进职责，不只是检验判定；企业还可按阶段细分为DQE、PQE、CQE或SQE。</p>
</article>`);

replaceArticle('Cp/Cpk', `
<article class="term-card" data-term-card>
  <div class="term-code">Cp/Cpk</div>
  <div class="term-en">Process Capability / Process Capability Index</div>
  <h3>过程能力／过程能力指数</h3>
  <p><strong>应用场景：</strong>Cp＝(USL−LSL)/(6σ)，反映过程波动宽度相对规格宽度的潜在能力；Cpk＝min[(USL−μ)/(3σ)，(μ−LSL)/(3σ)]，同时考虑均值偏移后的实际能力。常用参考：Cpk＜1.00为能力不足；1.00≤Cpk＜1.33为临界、需改善；1.33≤Cpk＜1.67通常具备一般量产能力；Cpk≥1.67表示能力较好，关键特性或新过程常采用更高目标；Cpk≥2.00表示高能力。使用前应确认过程稳定、数据分布和测量系统可信，最终判定以客户特殊要求、产品风险与企业标准为准。</p>
</article>`);

replaceArticle('IQC', `
<article class="term-card" data-term-card>
  <div class="term-code">IQC</div>
  <div class="term-en">Incoming Quality Control</div>
  <h3>来料质量控制／来料检验</h3>
  <p><strong>应用场景：</strong>用于供应商来料的规格核对、抽样或全检、性能与外观判定、批次追溯、隔离和异常反馈。IQC结果应与供应商质量、采购、仓储及MRB处置联动，不能只完成检验而不推动来料风险闭环。</p>
</article>`);

replaceArticle('IPQC', `
<article class="term-card" data-term-card>
  <div class="term-code">IPQC</div>
  <div class="term-en">In-Process Quality Control</div>
  <h3>制程质量控制／过程检验</h3>
  <p><strong>应用场景：</strong>用于生产过程中的首件、中检／巡检、工艺参数、关键特性、人员与设备状态确认，并按控制计划执行异常反应。IPQC重点是及时发现过程偏移、遏制不良继续制造和流转，而不是等到终检再筛选。</p>
</article>`);

replaceArticle('FQC/OQC', `
<article class="term-card" data-term-card>
  <div class="term-code">FQC/OQC</div>
  <div class="term-en">Final / Outgoing Quality Control</div>
  <h3>最终质量控制／出货质量控制</h3>
  <p><strong>应用场景：</strong>FQC侧重产品完成后的最终尺寸、外观、功能和文件符合性确认；OQC侧重出货前的抽检、包装、标识、数量、客户特殊要求及放行。部分企业由同一岗位承担，但最终检验和出货放行的控制时点与责任应明确区分。</p>
</article>`);

const termCount = (html.match(/data-term-card/g) || []).length;
html = html
  .replace(/QilyLean全站制造管理与工程专业术语词典：\d+项/, 'QilyLean全站制造管理与工程专业术语词典：' + termCount + '项')
  .replace(/<div class="term-count" id="termCount">共收录 \d+ 项术语<\/div>/, '<div class="term-count" id="termCount">共收录 ' + termCount + ' 项术语</div>')
  .replace(/count\.textContent=query\?'找到 '\+visible\+' 项术语':'共收录 \d+ 项术语';/, "count.textContent=query?'找到 '+visible+' 项术语':'共收录 '+cards.length+' 项术语';")
  .replace('/site-shell.css?v=20260724-terminology-v2', '/site-shell.css?v=20260724-terminology-v3');

if (!html.includes('<div class="term-code">TPS</div>')) throw new Error('TPS补充失败');
if (!html.includes('<div class="term-code">8S</div>')) throw new Error('8S补充失败');
if (!html.includes('<div class="term-code">FMEA</div>')) throw new Error('FMEA补充失败');
if (!html.includes('<div class="term-code">品质三检</div>')) throw new Error('品质三检补充失败');
if (!html.includes('Cpk＜1.00')) throw new Error('Cpk等级补充失败');

fs.writeFileSync(terminologyPath, html);

let index = fs.readFileSync(knowledgeIndexPath, 'utf8');
index = index
  .replace(/全站术语词典｜\d+项/, '全站术语词典｜' + termCount + '项')
  .replace('从 PQCD、IE、VSM 到 ERP / MES / APS', '从 TPS、FMEA、Cpk 到 ERP / MES / APS')
  .replace('覆盖精益改善、工业工程、质量体系、计划系统、电子制造、标准文件与安全管理等专业术语；支持按英文、代码或中文关键词快速查找。', '覆盖精益改善、工业工程、质量体系、品质职能、过程能力、生产运营、电子制造、标准文件与安全管理等专业术语；支持按英文、代码或中文关键词快速查找。');
fs.writeFileSync(knowledgeIndexPath, index);

process.stdout.write('Terminology dictionary enriched. Total terms: ' + termCount + '\n');
