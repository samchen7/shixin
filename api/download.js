import { get, list } from '@vercel/blob';

const COOKIE = 'shixin_dl';
const CODE = '9119';

export const maxDuration = 60;

function apkPath() {
  return process.env.SHIXIN_APK_PATHNAME || 'shixin.apk';
}

function cookieHeader(secure) {
  const parts = [`${COOKIE}=1`, 'Path=/', 'HttpOnly', 'SameSite=Lax', 'Max-Age=86400'];
  if (secure) parts.push('Secure');
  return parts.join('; ');
}

function hasCookie(request) {
  return (request.headers.get('cookie') || '').split(';').some((part) => part.trim() === `${COOKIE}=1`);
}

function json(status, body, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...headers }
  });
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
  let payload = {};
  try { payload = await request.json(); } catch (_) {}
  if (String(payload.code || '').trim() !== CODE) {
    return json(403, { ok: false });
  }
  const secure = new URL(request.url).protocol === 'https:';
  return json(200, { ok: true }, { 'set-cookie': cookieHeader(secure) });
}

export async function GET(request) {
  if (!hasCookie(request)) {
    return json(401, { error: 'locked' });
  }
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
