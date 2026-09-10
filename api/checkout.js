import { getStripe, json, requestOrigin } from '../lib/entitlement.js';

export async function POST(request) {
  const stripe = getStripe();
  const priceId = process.env.STRIPE_PRICE_ID;
  if (!stripe || !priceId) return json(503, { error: 'unconfigured' });

  const origin = requestOrigin(request);
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      locale: 'auto',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#get`,
      metadata: { product: 'shixin' }
    });
    if (!session.url) return json(500, { error: 'unavailable' });
    return json(200, { url: session.url });
  } catch (error) {
    console.error('shixin checkout failed', error);
    return json(500, { error: 'unavailable' });
  }
}
