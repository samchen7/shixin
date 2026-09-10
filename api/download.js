import { get, list } from '@vercel/blob';
import { accessCode, grantHeaders, hasCookie, json, sessionIsPaid } from '../lib/entitlement.js';

export const maxDuration = 60;

function apkPath() {
  return process.env.SHIXIN_APK_PATHNAME || 'shixin.apk';
}

async function loadApk() {
  const named = apkPath();
  const direct = await get(named, { access: 'private' });
  if (direct && direct.statusCode === 200) return direct;

  const { blobs } = await list({ access: 'private', limit: 20 });
  const match = blobs.find((item) => item.pathname === named || item.pathname.endsWith('.apk'));
  if (!match) return null;
  return get(match.pathname, { access: 'private' });
}

export async function POST(request) {
  if (hasCookie(request)) return json(200, { ok: true }, grantHeaders(request));

  let payload = {};
  try { payload = await request.json(); } catch (_) {}
  const code = String(payload.code || '').trim();
  const sessionId = String(payload.session_id || '').trim();

  try {
    if (sessionId && await sessionIsPaid(sessionId)) {
      return json(200, { ok: true }, grantHeaders(request));
    }
  } catch (error) {
    console.error('shixin download claim failed', error);
    return json(500, { error: 'unavailable' });
  }

  if (!code || code !== accessCode()) return json(403, { ok: false });
  return json(200, { ok: true }, grantHeaders(request));
}

export async function GET(request) {
  if (!hasCookie(request)) return json(401, { error: 'locked' });
  try {
    const blob = await loadApk();
    if (!blob || blob.statusCode !== 200) {
      console.error('shixin apk missing from blob store');
      return json(404, { error: 'missing' });
    }
    return new Response(blob.stream, {
      headers: {
        'content-type': blob.blob.contentType || 'application/vnd.android.package-archive',
        'content-disposition': blob.blob.contentDisposition || 'attachment; filename="shixin.apk"',
        'cache-control': 'private, no-store'
      }
    });
  } catch (error) {
    console.error('shixin apk download failed', error);
    return json(500, { error: 'unavailable' });
  }
}
