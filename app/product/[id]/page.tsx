'use client';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowLeft,Heart,Star} from 'lucide-react';
import {use,useState} from 'react';
import {products,money} from '../../../lib/products';
import {useStore} from '../../../lib/store';

export default function ProductPage({params}:{params:Promise<{id:string}>}){
  const {id}=use(params);
  const product=products.find(item=>item.id===id)||products[0];
  const [size,setSize]=useState(product.sizes[0]);
  const {addToCart,wishlist,toggleWishlist}=useStore();
  return <main className="min-h-screen"><header className="border-b border-[var(--line)] px-5 py-5 lg:px-10"><div className="mx-auto flex max-w-[1400px] justify-between"><Link href="/" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest"><ArrowLeft size={16}/> Back to shop</Link><Link href="/" className="display text-2xl tracking-[.18em]">MIONDO</Link><span className="w-24"/></div></header><div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-10 md:grid-cols-2 lg:gap-16 lg:px-10 lg:py-16"><div className="grid grid-cols-2 gap-3">{[product.image,product.image].map((image,index)=><div key={index} className="relative aspect-[.78] bg-[#e7e3dc]"><Image src={image} alt={`${product.name} view ${index+1}`} fill className="object-cover" sizes="50vw"/></div>)}</div><div className="pt-2 md:pt-10"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[var(--accent)]">{product.category} / {product.seller}</p><h1 className="display mt-4 text-4xl md:text-5xl">{product.name}</h1><p className="mt-5 text-xl">{money(product.price)}</p><div className="mt-4 flex items-center gap-2 text-xs"><Star size={14} fill="currentColor"/> {product.rating} ({product.reviews} reviews)</div><p className="mt-8 max-w-md text-sm leading-6 text-[#666]">Designed with intention and made to be lived in. This piece is part of our considered edit from independent African makers.</p><div className="mt-10 border-t border-[var(--line)] pt-6"><div className="mb-4 flex justify-between text-[11px] font-bold uppercase tracking-widest"><span>Select size</span><span className="text-[#888]">Size guide</span></div><div className="flex gap-2">{product.sizes.map(item=><button key={item} onClick={()=>setSize(item)} className={`border px-5 py-3 text-xs ${size===item?'border-[var(--ink)] bg-[var(--ink)] text-white':'border-[var(--line)]'}`}>{item}</button>)}</div></div><div className="mt-8 flex gap-3"><button onClick={()=>addToCart(product,size)} className="flex-1 bg-[var(--ink)] py-4 text-[11px] font-bold uppercase tracking-[.16em] text-white">Add to bag</button><button aria-label="Add to wishlist" onClick={()=>toggleWishlist(product.id)} className="border border-[var(--ink)] px-5"><Heart size={18} fill={wishlist.includes(product.id)?'currentColor':'none'}/></button></div><p className="mt-5 text-xs text-[#777]">{product.stock} pieces available · Free delivery over ₦150,000</p></div></div></main>
}
