import Link from 'next/link';

export default function Seller() {
  return (
    <main className="min-h-screen bg-[#1b1b18] p-5 text-white lg:p-10">
      <div className="mx-auto max-w-[1200px]">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[.08em]">
          DAMMY T &amp; MOTION WEARS
        </Link>
        <div className="mt-20 max-w-xl">
          <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#d99a79]">For independent makers</p>
          <h1 className="display mt-4 text-5xl">Sell with us.</h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-white/60">
            Apply to sell clothing, shoes and accessories with Dammy T &amp; Motion Wears.
          </p>
          <Link
            href="mailto:sell@dammytmotionwears.ng"
            className="mt-8 inline-block border border-white px-5 py-4 text-[11px] font-bold uppercase tracking-widest"
          >
            Apply to sell
          </Link>
        </div>
      </div>
    </main>
  );
}
