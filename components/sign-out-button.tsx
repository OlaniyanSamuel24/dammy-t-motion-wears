'use client';

import {signOut} from 'next-auth/react';

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({callbackUrl: '/'})}
      className="text-[11px] font-bold uppercase tracking-widest underline"
    >
      Sign out
    </button>
  );
}
