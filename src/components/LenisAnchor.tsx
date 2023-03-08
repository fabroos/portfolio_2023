'use client'

import useStore from '@/context/store';
import React, { FC, forwardRef } from 'react'

interface LenisAnchorProps extends React.HTMLAttributes<HTMLButtonElement> {
  to?: string | Element 
  before?: () => void
} 

const LenisAnchor = ({ to, children, before, ...props }: LenisAnchorProps, ref: React.Ref<HTMLButtonElement>) => {
  const { lenis, setLenis } = useStore();
  function scrollTo(to: string | Element | undefined){
    if(before) before()
    const el = (typeof to === 'string' ? document.querySelector(to) : to) ?? document.body;
    lenis.scrollTo(el, { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
  }

  return (
    <button onPointerDown={()=> scrollTo(to)} ref={ref} {...props}>{children}</button>
  );
}

export default forwardRef(LenisAnchor)
