(function () {
  'use strict';

  var DATA_URL = '/qilylean/private/ding-qili-resume.pdf.b64?v=20260723-resume-v2';
  var FILE_NAME = '精益经理-工程部经理-丁启利.pdf';
  var blobUrl = '';
  var loadingPromise = null;

  function isUnlocked() {
    try {
      return sessionStorage.getItem('experienceUnlocked') === '1';
    } catch (error) {
      return false;
    }
  }

  function addStyle() {
    if (document.getElementById('careerResumeDocumentStyle')) return;
    var style = document.createElement('style');
    style.id = 'careerResumeDocumentStyle';
    style.textContent = [
      '.career-document-card{margin-top:18px;padding:clamp(22px,4vw,34px);border:1px solid var(--line,#d5e4e3);border-top:4px solid var(--copper,#caa15f);background:#fff;box-shadow:0 12px 32px rgba(15,75,90,.08)}',
      '.career-document-card small{display:block;margin-bottom:8px;color:var(--copper,#caa15f);font-size:15px;font-weight:900;letter-spacing:.04em}',
      '.career-document-card h3{margin:0 0 10px;color:var(--forest,#0f4b5a);font-size:clamp(24px,3vw,34px);line-height:1.3}',
      '.career-document-card p{margin:0;color:var(--muted,#5f7474);font-size:18px;line-height:1.75}',
      '.career-document-meta{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}',
      '.career-document-meta span{padding:5px 10px;border:1px solid var(--line,#d5e4e3);border-radius:999px;color:#17443b;background:#eef8f6;font-size:14px;font-weight:850}',
      '.career-document-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}',
      '.career-document-actions button{min-height:46px;padding:10px 18px;border:1px solid var(--forest,#0f4b5a);border-radius:999px;color:#fff;background:var(--forest,#0f4b5a);cursor:pointer;font:inherit;font-weight:900;transition:transform .18s ease,box-shadow .18s ease,background-color .18s ease}',
      '.career-document-actions button.secondary{color:var(--forest,#0f4b5a);background:#fff;border-color:var(--line,#d5e4e3)}',
      '.career-document-actions button:hover,.career-document-actions button:focus-visible{transform:translateY(-2px);box-shadow:0 8px 20px rgba(15,75,90,.18);outline:none}',
      '.career-document-actions button:disabled{cursor:wait;opacity:.68;transform:none}',
      '.career-document-status{min-height:28px;margin-top:10px!important;color:#17443b!important;font-size:15px!important;font-weight:850}',
      '.career-document-preview{margin-top:16px;overflow:hidden;border:1px solid var(--line,#d5e4e3);background:#e9f0ef}',
      '.career-document-preview[hidden]{display:none}',
      '.career-document-preview iframe{display:block;width:100%;height:min(78vh,900px);min-height:620px;border:0;background:#e9f0ef}',
      '.career-document-note{margin-top:12px!important;padding:12px 14px;border-left:4px solid var(--copper,#caa15f);background:#eef8f6;color:#17443b!important;font-size:15px!important}',
      '@media(max-width:620px){.career-document-actions button{width:100%}.career-document-preview iframe{height:72vh;min-height:480px}}',
      '@media(prefers-reduced-motion:reduce){.career-document-actions button{transition:none}}'
    ].join('');
    document.head.appendChild(style);
  }

  function decodeBase64Pdf(encoded) {
    var binary = atob(encoded.replace(/\s/g, ''));
    var bytes = new Uint8Array(binary.length);
    for (var index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    return new Blob([bytes], { type: 'application/pdf' });
  }

  function getPdfUrl(status, buttons) {
    if (blobUrl) return Promise.resolve(blobUrl);
    if (loadingPromise) return loadingPromise;

    buttons.forEach(function (button) { button.disabled = true; });
    status.textContent = '正在加载高清履历文件……';

    loadingPromise = fetch(DATA_URL, { credentials: 'same-origin', cache: 'force-cache' })
      .then(function (response) {
        if (!response.ok) throw new Error('resume_data_unavailable');
        return response.text();
      })
      .then(function (encoded) {
        blobUrl = URL.createObjectURL(decodeBase64Pdf(encoded));
        return blobUrl;
      })
      .catch(function (error) {
        loadingPromise = null;
        status.textContent = '履历文件暂未加载成功，请稍后重试。';
        throw error;
      })
      .finally(function () {
        buttons.forEach(function (button) { button.disabled = false; });
      });

    return loadingPromise;
  }

  function mount() {
    if (!isUnlocked()) return;
    if (document.getElementById('careerResumeDocument')) return;

    var chain = document.querySelector('.career-chain');
    if (!chain) return;

    addStyle();
    var card = document.createElement('section');
    card.className = 'career-document-card';
    card.id = 'careerResumeDocument';
    card.innerHTML = [
      '<small>ORIGINAL PDF / READY TO VIEW</small>',
      '<h3>个人履历高清原版</h3>',
      '<p>附件为三页 A4 高清原版 PDF，完整保留原始版面与清晰度。进入履历主线后可直接在线预览或下载。</p>',
      '<div class="career-document-meta"><span>3 页 A4</span><span>高清原版</span><span>在线预览</span><span>支持下载</span></div>',
      '<div class="career-document-actions">',
      '<button type="button" data-resume-action="preview">预览高清原版</button>',
      '<button class="secondary" type="button" data-resume-action="download">下载 PDF</button>',
      '</div>',
      '<p class="career-document-status" role="status" aria-live="polite"></p>',
      '<div class="career-document-preview" hidden>',
      '<iframe title="丁启利个人履历高清原版 PDF 预览"></iframe>',
      '</div>',
      '<p class="career-document-note">访问说明：仅进入“履历主线”时需要密码；进入后在线预览与下载的 PDF 均无需再次输入密码。</p>'
    ].join('');
    chain.insertAdjacentElement('afterend', card);

    var status = card.querySelector('.career-document-status');
    var previewBox = card.querySelector('.career-document-preview');
    var iframe = previewBox.querySelector('iframe');
    var buttons = Array.prototype.slice.call(card.querySelectorAll('[data-resume-action]'));

    card.addEventListener('click', function (event) {
      var button = event.target.closest('[data-resume-action]');
      if (!button) return;
      var action = button.getAttribute('data-resume-action');

      getPdfUrl(status, buttons).then(function (url) {
        if (action === 'preview') {
          if (!iframe.src) iframe.src = url + '#view=FitH&toolbar=1&navpanes=0';
          previewBox.hidden = false;
          status.textContent = '高清预览已打开，可直接浏览完整原版。';
          previewBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }

        var link = document.createElement('a');
        link.href = url;
        link.download = FILE_NAME;
        document.body.appendChild(link);
        link.click();
        link.remove();
        status.textContent = 'PDF 已开始下载，下载后可直接打开查看。';
      }).catch(function () {});
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
  setInterval(mount, 500);
  window.addEventListener('beforeunload', function () {
    if (blobUrl) URL.revokeObjectURL(blobUrl);
  }, { once: true });
})();
