const ALLOWED_ORIGINS = new Set([
  'https://qilylean.com',
  'https://www.qilylean.com'
]);

const SYSTEM_INSTRUCTIONS = `你是 QilyLean 制造改善 AI 顾问，代表丁启利的专业方法体系提供工程化辅助分析。
重点领域：精益生产、工业工程IE、VSM、SMED、标准工时、线平衡、OEE、UPPH、PMC、MES、APS、ERP、工厂布局、目视化、6S、质量改善、防错防呆、汽车电子与电子制造。
回答要求：
1. 优先给出问题判断、关键假设、分析步骤、可执行建议、验证指标与风险。
2. 缺少现场数据时，明确列出需要补充的数据，不得虚构企业事实、法规或改善结果。
3. 区分试运行、基准测时、正式标准和KPI考核；短期改善以试运行、问题暴露、培训沟通和复盘固化为主，不用KPI压现场。
4. 涉及安全、法律、医疗、财务或法规时，提醒用户进行专业复核。
5. 使用清晰中文；专业术语可附英文缩写。避免空泛口号和过度承诺。`;

function cors(origin) {
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : 'https://qilylean.com';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors(origin), 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
  });
}

function safeOpenAIError(data, status, requestId) {
  const error = data && data.error ? data.error : {};
  return {
    error: 'AI service request failed',
    upstream_status: status,
    upstream_code: error.code || 'unknown',
    upstream_type: error.type || 'unknown',
    request_id: requestId || undefined
  };
}

function todayUTC() {
  return new Date().toISOString().slice(0, 10);
}

function clientId(request) {
  return request.headers.get('CF-Connecting-IP') || 'unknown';
}

async function readNumber(kv, key) {
  if (!kv) return 0;
  const value = await kv.get(key);
  return Number(value || 0);
}

async function increment(kv, key, ttl) {
  if (!kv) return 0;
  const next = (await readNumber(kv, key)) + 1;
  await kv.put(key, String(next), ttl ? { expirationTtl: ttl } : undefined);
  return next;
}

async function recordMetric(env, name) {
  if (!env.QILY_STATS) return;
  const day = todayUTC();
  await Promise.all([
    increment(env.QILY_STATS, `metric:${day}:${name}`, 60 * 60 * 24 * 45),
    increment(env.QILY_STATS, `metric:all:${name}`)
  ]);
}

async function checkRateLimit(request, env) {
  const limit = Math.max(1, Number(env.DAILY_IP_LIMIT || 20));
  if (!env.QILY_STATS) return { allowed: true, used: 0, limit, storage: false };
  const day = todayUTC();
  const key = `limit:${day}:${clientId(request)}`;
  const used = await readNumber(env.QILY_STATS, key);
  if (used >= limit) return { allowed: false, used, limit, storage: true };
  const next = await increment(env.QILY_STATS, key, 60 * 60 * 48);
  return { allowed: true, used: next, limit, storage: true };
}

function isAdmin(request, env) {
  const supplied = request.headers.get('Authorization') || '';
  return Boolean(env.ADMIN_TOKEN) && supplied === `Bearer ${env.ADMIN_TOKEN}`;
}

async function adminStatus(env) {
  const day = todayUTC();
  const names = ['requests', 'success', 'errors', 'rate_limited'];
  const today = {};
  const all = {};
  for (const name of names) {
    today[name] = await readNumber(env.QILY_STATS, `metric:${day}:${name}`);
    all[name] = await readNumber(env.QILY_STATS, `metric:all:${name}`);
  }
  return {
    ok: true,
    service: 'QilyLean AI',
    date_utc: day,
    model: env.OPENAI_MODEL || 'gpt-5-mini',
    max_output_tokens: Number(env.MAX_OUTPUT_TOKENS || 1400),
    daily_ip_limit: Number(env.DAILY_IP_LIMIT || 20),
    openai_key_configured: Boolean(env.OPENAI_API_KEY),
    admin_token_configured: Boolean(env.ADMIN_TOKEN),
    statistics_storage: env.QILY_STATS ? 'enabled' : 'not_bound',
    today,
    all_time: all
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) });

    if (request.method === 'GET' && url.pathname === '/health') {
      return json({
        ok: true,
        service: 'QilyLean AI',
        key_configured: Boolean(env.OPENAI_API_KEY),
        model: env.OPENAI_MODEL || 'gpt-5-mini',
        statistics: env.QILY_STATS ? 'enabled' : 'not_bound'
      }, 200, origin);
    }

    if (request.method === 'GET' && url.pathname === '/admin/status') {
      if (!isAdmin(request, env)) return json({ error: 'Unauthorized' }, 401, origin);
      return json(await adminStatus(env), 200, origin);
    }

    if (request.method !== 'POST' || url.pathname !== '/chat') {
      return json({ error: 'Not found' }, 404, origin);
    }
    if (!ALLOWED_ORIGINS.has(origin)) return json({ error: 'Origin not allowed' }, 403, origin);
    if (!env.OPENAI_API_KEY) return json({ error: 'AI service is not configured', diagnostic: 'missing_openai_api_key' }, 503, origin);

    const rate = await checkRateLimit(request, env);
    if (!rate.allowed) {
      await recordMetric(env, 'rate_limited');
      return json({ error: 'Daily question limit reached', limit: rate.limit }, 429, origin);
    }
    await recordMetric(env, 'requests');

    let payload;
    try { payload = await request.json(); }
    catch {
      await recordMetric(env, 'errors');
      return json({ error: 'Invalid JSON' }, 400, origin);
    }

    const message = String(payload.message || '').trim();
    const previousResponseId = payload.previous_response_id ? String(payload.previous_response_id) : undefined;
    if (!message) return json({ error: 'Message is required' }, 400, origin);
    if (message.length > 3000) return json({ error: 'Message is too long' }, 413, origin);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const body = {
        model: env.OPENAI_MODEL || 'gpt-5-mini',
        instructions: SYSTEM_INSTRUCTIONS,
        input: message,
        max_output_tokens: Number(env.MAX_OUTPUT_TOKENS || 1400)
      };
      if (previousResponseId) body.previous_response_id = previousResponseId;

      const upstream = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        signal: controller.signal
      });

      const data = await upstream.json();
      const requestId = upstream.headers.get('x-request-id') || '';
      if (!upstream.ok) {
        await recordMetric(env, 'errors');
        const error = data && data.error ? data.error : {};
        console.error('OpenAI error', JSON.stringify({
          status: upstream.status,
          code: error.code || 'unknown',
          type: error.type || 'unknown',
          message: String(error.message || '').slice(0, 300),
          request_id: requestId
        }));
        return json(safeOpenAIError(data, upstream.status, requestId), 502, origin);
      }

      await recordMetric(env, 'success');
      const answer = data.output_text || extractText(data.output) || '暂未生成有效回答。';
      return json({
        answer,
        response_id: data.id,
        usage: data.usage || undefined,
        rate_limit: { used: rate.used, limit: rate.limit }
      }, 200, origin);
    } catch (error) {
      await recordMetric(env, 'errors');
      const msg = error && error.name === 'AbortError' ? 'AI request timed out' : 'AI service unavailable';
      return json({ error: msg, diagnostic: error && error.name ? error.name : 'unknown' }, 504, origin);
    } finally {
      clearTimeout(timeout);
    }
  }
};

function extractText(output) {
  if (!Array.isArray(output)) return '';
  const parts = [];
  for (const item of output) {
    if (!Array.isArray(item.content)) continue;
    for (const c of item.content) {
      if (typeof c.text === 'string') parts.push(c.text);
    }
  }
  return parts.join('\n').trim();
}
