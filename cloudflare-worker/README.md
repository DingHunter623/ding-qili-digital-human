# QilyLean AI Cloudflare Worker

## 已准备内容

- `worker.js`：安全调用 OpenAI Responses API
- 仅允许 `https://qilylean.com` 与 `https://www.qilylean.com`
- API Key 仅从 Cloudflare Secret `OPENAI_API_KEY` 读取
- 支持 `previous_response_id` 连续对话
- 输入长度、超时、错误处理与禁止缓存

## Cloudflare 网页部署

1. 打开 Cloudflare → Workers 和 Pages → `qilylean-ai`。
2. 点击“编辑代码”。
3. 删除 Hello World 示例代码。
4. 将本目录 `worker.js` 的全部内容粘贴进去。
5. 点击“部署”。
6. 返回 Worker → 设置 → 变量和密钥 → 添加。
7. 名称填写 `OPENAI_API_KEY`，类型选择“机密/Secret”，填入专用 OpenAI API Key 并保存。
8. 测试：访问 `https://qilylean-ai.dinghunter623.workers.dev/health`，应返回 `{"ok":true,"service":"QilyLean AI"}`。

## 前端

网站入口：`https://qilylean.com/ai.html`

前端默认请求：

`https://qilylean-ai.dinghunter623.workers.dev/chat`

不要把 OpenAI API Key 写入任何 HTML、JavaScript 或 GitHub 文件。