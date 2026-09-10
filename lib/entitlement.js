import Stripe from 'stripe';

export const COOKIE = 'shixin_dl';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

export function accessCode() {
  return process.env.SHIXIN_ACCESS_CODE || '9119';
}

export function json(status, body, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...headers }
  });
}

export function hasCookie(request) {
  return (request.headers.get('cookie') || '').split(';').some((part) => part.trim() === `${COOKIE}=1`);
}

function isSecure(request) {
  const url = new URL(request.url);
  const proto = request.headers.get('x-forwarded-proto') || url.protocol.replace(':', '');
  return proto.split(',')[0].trim() === 'https';
}

export function cookieHeader(request) {
  const parts = [`${COOKIE}=1`, 'Path=/', 'HttpOnly', 'SameSite=Lax', `Max-Age=${COOKIE_MAX_AGE}`];
  if (isSecure(request)) parts.push('Secure');
  return parts.join('; ');
}

export function grantHeaders(request) {
  return { 'set-cookie': cookieHeader(request) };
}

export function requestOrigin(request) {
  const url = new URL(request.url);
  const host = (request.headers.get('x-forwarded-host') || request.headers.get('host') || url.host).split(',')[0].trim();
  const proto = (request.headers.get('x-forwarded-proto') || url.protocol.replace(':', '')).split(',')[0].trim();
  return `${proto}://${host}`;
}

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export async function sessionIsPaid(sessionId) {
  const stripe = getStripe();
  const priceId = process.env.STRIPE_PRICE_ID;
  if (!stripe || !priceId || !sessionId) return false;
  const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['line_items'] });
  if (session.status !== 'complete' || session.payment_status !== 'paid') return false;
  const prices = (session.line_items && session.line_items.data) || [];
  if (prices.some((item) => item.price && item.price.id === priceId)) return true;
  return session.metadata && session.metadata.product === 'shixin';
}
