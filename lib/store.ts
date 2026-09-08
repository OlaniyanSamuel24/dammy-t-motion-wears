'use client';
import { create } from 'zustand';
import { Product } from './products';
type CartItem = Product & { quantity:number; size:string };
type Store = { cart:CartItem[]; wishlist:string[]; addToCart:(product:Product,size:string)=>void; removeFromCart:(id:string)=>void; toggleWishlist:(id:string)=>void; cartOpen:boolean; setCartOpen:(open:boolean)=>void };
export const useStore=create<Store>((set)=>({cart:[],wishlist:[],cartOpen:false,setCartOpen:(cartOpen)=>set({cartOpen}),addToCart:(product,size)=>set((state)=>{const found=state.cart.find(item=>item.id===product.id&&item.size===size); return {cart:found?state.cart.map(item=>item===found?{...item,quantity:item.quantity+1}:item):[...state.cart,{...product,size,quantity:1}],cartOpen:true}}),removeFromCart:(id)=>set((state)=>({cart:state.cart.filter(item=>item.id!==id)})),toggleWishlist:(id)=>set((state)=>({wishlist:state.wishlist.includes(id)?state.wishlist.filter(item=>item!==id):[...state.wishlist,id]}))}));
