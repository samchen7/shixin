import { grantHeaders, hasCookie, json, sessionIsPaid } from '../lib/entitlement.js';

export async function GET(request) {
  return json(200, { unlocked: hasCookie(request) });
}

export async function POST(request) {
  if (hasCookie(request)) return json(200, { unlocked: true }, grantHeaders(request));

  let payload = {};
  try { payload = await request.json(); } catch (_) {}
  const sessionId = String(payload.session_id || '').trim();
  if (!sessionId) return json(400, { unlocked: false, error: 'missing' });

  try {
    if (!await sessionIsPaid(sessionId)) return json(403, { unlocked: false, error: 'unpaid' });
    return json(200, { unlocked: true }, grantHeaders(request));
  } catch (error) {
    console.error('shixin claim failed', error);
    return json(500, { unlocked: false, error: 'unavailable' });
  }
}
