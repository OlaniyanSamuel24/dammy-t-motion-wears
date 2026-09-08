import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getServerSession} from 'next-auth';
import {prisma} from '../../../lib/prisma';
import {authOptions} from '../../../auth';
import {authError} from '../../../lib/authz';
import {ensureCatalogProducts} from '../../../lib/ensure-catalog';

const deliveryFees = {Lagos: 3500, Abuja: 5000, 'Port Harcourt': 5000, Other: 7000, Ibadan: 2500} as const;

const orderSchema = z.object({
  items: z
    .array(z.object({productId: z.string(), quantity: z.number().int().positive().max(20), size: z.string().min(1).max(20)}))
    .min(1),
  address: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().min(7).max(30),
    address: z.string().min(5).max(300),
    zone: z.enum(['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Other']),
  }),
});

async function customerFromCheckout(email: string, name: string) {
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as {id?: string} | undefined;
  if (sessionUser?.id) {
    const existing = await prisma.user.findUnique({where: {id: sessionUser.id}});
    if (existing) return existing;
  }
  return prisma.user.upsert({
    where: {email: email.toLowerCase()},
    update: {name},
    create: {email: email.toLowerCase(), name, role: 'CUSTOMER'},
  });
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as {id?: string} | undefined;
    if (!user?.id) return NextResponse.json({error: 'Authentication required'}, {status: 401});
    const orders = await prisma.order.findMany({
      where: {userId: user.id},
      include: {items: {include: {product: {select: {name: true, images: true}}}}},
      orderBy: {createdAt: 'desc'},
    });
    return NextResponse.json(orders);
  } catch (error) {
    const result = authError(error);
    return NextResponse.json({error: result.error}, {status: result.status});
  }
}

export async function POST(request: Request) {
  try {
    const input = orderSchema.parse(await request.json());
    const user = await customerFromCheckout(input.address.email, input.address.name);
    await ensureCatalogProducts(input.items.map((item) => item.productId));
    const products = await prisma.product.findMany({
      where: {id: {in: input.items.map((item) => item.productId)}, active: true},
    });
    const items = input.items.map((item) => {
      const product = products.find((candidate) => candidate.id === item.productId);
      if (!product || product.stock < item.quantity) {
        throw new Error('One or more items are unavailable. Please refresh your bag.');
      }
      const sizes = Array.isArray(product.sizes) ? (product.sizes as string[]) : [];
      if (!sizes.includes(item.size)) throw new Error(`Size ${item.size} is unavailable`);
      return {...item, price: product.price};
    });
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = subtotal >= 150000 ? 0 : deliveryFees[input.address.zone];
    const total = subtotal + deliveryFee;
    const order = await prisma.order.create({
      data: {userId: user.id, address: input.address, deliveryFee, total, items: {create: items}},
      include: {items: {include: {product: {select: {name: true}}}}},
    });
    return NextResponse.json(order, {status: 201});
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create order';
    const status = message.toLowerCase().includes('authentication') ? 401 : 400;
    return NextResponse.json({error: message}, {status});
  }
}
