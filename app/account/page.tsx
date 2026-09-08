import Link from 'next/link';
import {redirect} from 'next/navigation';
import {getServerSession} from 'next-auth';
import {ArrowLeft,Heart,MapPin,Package} from 'lucide-react';
import {authOptions} from '../../auth';
import {prisma} from '../../lib/prisma';
import {money} from '../../lib/products';
import SignOutButton from '../../components/sign-out-button';

type AccountOrder = {
  id: string;
  status: string;
  total: number;
  address: unknown;
  items: {product: {name: string}}[];
};

export const dynamic = 'force-dynamic';

export default async function Account() {
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    if ((error as { digest?: string })?.digest === 'DYNAMIC_SERVER_USAGE') {
      throw error;
    }
    console.warn('Session retrieval error in Account page:', error);
  }

  const user = session?.user as {id?: string; email?: string; name?: string} | undefined;
  if (!user?.id) {
    redirect('/auth/signin?callbackUrl=/account');
  }

  let orders: AccountOrder[] = [];
  try {
    orders = await prisma.order.findMany({
      where: {userId: user.id},
      include: {items: {include: {product: {select: {name: true}}}}},
      orderBy: {createdAt: 'desc'},
      take: 20,
    });
  } catch {
    orders = [];
  }

  const latestAddress = orders[0]?.address as {address?: string; phone?: string} | undefined;

  return (
    <main className="min-h-screen">
      <header className="border-b border-[var(--line)] px-5 py-5 lg:px-10">
        <div className="mx-auto flex max-w-[1200px] justify-between">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[.08em]">
            DAMMY T &amp; MOTION WEARS
          </Link>
          <Link href="/" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest">
            <ArrowLeft size={15} /> Shop
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-[1200px] px-5 py-12 lg:px-10">
        <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[var(--accent)]">My account</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h1 className="display text-5xl">Hello{user.name ? `, ${user.name.split(' ')[0]}` : ''}.</h1>
          <SignOutButton />
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-[220px_1fr]">
          <nav className="space-y-6 text-[11px] font-bold uppercase tracking-widest">
            <a href="#orders" className="block text-[var(--accent)]">Orders</a>
            <Link href="/wishlist" className="block">Wishlist</Link>
            <a href="#profile" className="block">Profile</a>
          </nav>
          <section>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                [Package, 'Orders', String(orders.length)],
                [Heart, 'Saved pieces', '—'],
                [MapPin, 'Delivery address', latestAddress?.address ? '1' : '0'],
              ].map(([Icon, label, value]) => (
                <div key={String(label)} className="border border-[var(--line)] p-5">
                  <Icon size={18} />
                  <p className="mt-6 text-xs text-[#777]">{String(label)}</p>
                  <p className="mt-1 text-xl font-semibold">{String(value)}</p>
                </div>
              ))}
            </div>
            <h2 id="profile" className="mt-12 text-[11px] font-bold uppercase tracking-widest">Profile</h2>
            <div className="mt-4 grid gap-3 border-t border-[var(--line)] py-6 text-sm">
              <p><span className="text-[#777]">Name</span> · {user.name || 'Not set'}</p>
              <p><span className="text-[#777]">Email</span> · {user.email}</p>
              <p><span className="text-[#777]">Phone</span> · {latestAddress?.phone || 'Add this at checkout'}</p>
              <p><span className="text-[#777]">Address</span> · {latestAddress?.address || 'No saved address yet'}</p>
            </div>
            <h2 id="orders" className="mt-8 text-[11px] font-bold uppercase tracking-widest">Recent orders</h2>
            <div className="mt-4 border-t border-[var(--line)]">
              {orders.length ? (
                orders.map((order) => (
                  <div key={order.id} className="grid gap-3 border-b border-[var(--line)] py-5 sm:grid-cols-[1fr_1fr_auto] sm:items-center">
                    <div>
                      <p className="text-sm font-semibold">{order.id}</p>
                      <p className="mt-1 text-xs text-[#777]">
                        {order.items.map((item) => item.product.name).join(', ')}
                      </p>
                    </div>
                    <p className="text-xs text-[var(--accent)]">{order.status}</p>
                    <p className="text-sm font-semibold">{money(order.total)}</p>
                  </div>
                ))
              ) : (
                <p className="py-10 text-sm text-[#777]">No orders yet. When you check out, they will show up here.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
