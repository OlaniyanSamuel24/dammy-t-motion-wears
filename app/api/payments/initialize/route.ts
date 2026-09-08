import {NextResponse} from 'next/server';
import {randomUUID} from 'node:crypto';
import {z} from 'zod';
import {prisma} from '../../../../lib/prisma';
import {initializePaystackTransaction, isPaystackConfigured} from '../../../../lib/paystack';
import {money} from '../../../../lib/products';
import {orderWhatsAppText, whatsappNumbers, whatsappUrl} from '../../../../lib/brand';

const schema = z.object({
  orderId: z.string().min(1),
  paymentMethod: z.enum(['card', 'bank_transfer', 'ussd', 'whatsapp']).default('whatsapp'),
});

export async function POST(request: Request) {
  try {
    const {orderId, paymentMethod} = schema.parse(await request.json());
    const order = await prisma.order.findFirst({
      where: {id: orderId},
      include: {items: {include: {product: {select: {name: true}}}}},
    });
    if (!order) return NextResponse.json({error: 'Order not found'}, {status: 404});
    if (order.paymentStatus === 'PAID' || order.status === 'PAID') {
      return NextResponse.json({error: 'Order is already paid'}, {status: 409});
    }

    const address = order.address as {name?: string; phone?: string; address?: string; email?: string};
    const items = order.items.map((item) => `- ${item.product.name} x${item.quantity} (${item.size})`).join('\n');
    const message = orderWhatsAppText({
      name: address.name || '',
      phone: address.phone || '',
      address: address.address || '',
      items,
      total: money(order.total),
    });
    const whatsappCheckoutUrl = whatsappUrl(whatsappNumbers[0].e164, message);

    if (paymentMethod === 'whatsapp' || !isPaystackConfigured()) {
      await prisma.order.update({
        where: {id: order.id},
        data: {paymentStatus: 'PENDING', paymentChannel: 'whatsapp'},
      });
      return NextResponse.json({
        method: 'whatsapp',
        authorizationUrl: whatsappCheckoutUrl,
        whatsappUrl: whatsappCheckoutUrl,
        reference: order.id,
        fallback: !isPaystackConfigured() && paymentMethod !== 'whatsapp',
        notice: !isPaystackConfigured() && paymentMethod !== 'whatsapp'
          ? 'Card gateway is currently offline. Order forwarded to WhatsApp.'
          : undefined,
      });
    }

    try {
      const reference = order.paymentReference || `MIO-${order.id}-${randomUUID()}`;
      if (!order.paymentReference) {
        await prisma.order.update({
          where: {id: order.id},
          data: {paymentReference: reference, paymentStatus: 'PENDING'},
        });
      }
      const origin = process.env.NEXTAUTH_URL || new URL(request.url).origin;
      const payment = await initializePaystackTransaction({
        email: address.email || 'orders@dammytmotionwears.ng',
        amount: order.total * 100,
        reference,
        callback_url: `${origin}/checkout?order=${order.id}`,
        metadata: {orderId: order.id, userId: order.userId, paymentMethod},
        channels: [paymentMethod],
      });
      return NextResponse.json({
        method: 'paystack',
        authorizationUrl: payment.data.authorization_url,
        reference: payment.data.reference,
      });
    } catch (paystackError) {
      console.warn('Paystack initialization failed, falling back to WhatsApp:', paystackError);
      await prisma.order.update({
        where: {id: order.id},
        data: {paymentStatus: 'PENDING', paymentChannel: 'whatsapp'},
      });
      return NextResponse.json({
        method: 'whatsapp',
        authorizationUrl: whatsappCheckoutUrl,
        whatsappUrl: whatsappCheckoutUrl,
        reference: order.id,
        fallback: true,
        notice: 'Online card gateway is temporarily unavailable. Completing order via WhatsApp.',
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to start payment';
    return NextResponse.json({error: message}, {status: 500});
  }
}
