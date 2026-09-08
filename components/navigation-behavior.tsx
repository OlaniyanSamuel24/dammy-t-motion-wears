'use client';
import {useEffect} from 'react';

export default function NavigationBehavior(){
  useEffect(()=>{
    const handleClick=(event:MouseEvent)=>{
      const target=event.target as HTMLElement;
      const button=target.closest('button');
      if(!button)return;
      const label=button.getAttribute('aria-label');
      if(label==='Search')window.location.href='/search';
      if(label==='Account')window.location.href='/account';
      if(button.classList.contains('lg:hidden'))window.location.href='/menu';
    };
    document.addEventListener('click',handleClick);
    return()=>document.removeEventListener('click',handleClick);
  },[]);
  return null;
}
