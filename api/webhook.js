import { getStripe, json } from '../lib/entitlement.js';

export async function POST(request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return json(503, { error: 'unconfigured' });

  const signature = request.headers.get('stripe-signature');
  if (!signature) return json(400, { error: 'invalid' });

  let event;
  try {
    event = stripe.webhooks.constructEvent(await request.text(), signature, secret);
  } catch (error) {
    console.error('shixin webhook signature failed', error);
    return json(400, { error: 'invalid' });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    if (session.payment_status !== 'paid') {
      return json(200, { received: true, ignored: true });
    }
  }

  return json(200, { received: true });
}
