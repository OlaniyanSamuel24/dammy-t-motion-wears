'use client';
import {useEffect} from 'react';
import {useStore} from '../lib/store';
import type {CartItem} from '../lib/store';
const key='dammy-t-motion-cart';
export default function CartHydration(){const hydrate=useStore(state=>state.hydrate);useEffect(()=>{try{const saved=JSON.parse(window.localStorage.getItem(key)||'{}') as {cart?:CartItem[];wishlist?:string[]};hydrate(saved.cart||[],saved.wishlist||[])}catch{hydrate([],[])}const unsubscribe=useStore.subscribe(state=>{if(state.hasHydrated)window.localStorage.setItem(key,JSON.stringify({cart:state.cart,wishlist:state.wishlist}))});return unsubscribe},[hydrate]);return null}
