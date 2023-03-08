'use client';

import useStore from "@/context/store";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { useRef } from "react";
import LenisAnchor from "./LenisAnchor";

type Props = {
  children: React.ReactNode;
  to: string;
  startsIn?: string | number;
} & React.HTMLAttributes<HTMLButtonElement>;

export default function AnchorButton({children, to, className, startsIn, ...props}:Props) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const tl = useRef<GSAPTimeline>(gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'linear' } }));


  useIsomorphicLayoutEffect(() => {
    if(!btnRef.current) return;
    const btn = btnRef.current;
    const timeline = tl.current;
    timeline.to(btn, {
      duration: 5,
      x: '-=0.1rem',
      y: '-=0.4rem',
    }).to(btn, {
      duration: 8,
      x: '+=0.2rem',
      y: '+=0.6rem',
    }).to(btn, {
      duration: 5,
      x: '-=0.1rem',
      y: '+=0.1rem',
    }).play(startsIn)
  }, [startsIn])

  return (
  <LenisAnchor ref={btnRef} to={to} className={`w-[12vw] text-lg hover:backdrop-blur-md hover:bg-opacity-40 transition-all hidden md:flex h-[12vw] rounded-full border-2 bg-white dark:bg-opacity-10 dark:border-zinc-700 bg-opacity-50 absolute origin-center translate-y-full backdrop-blur-sm justify-center items-center ${className}`} {...props} >
    {children}
  </LenisAnchor>
  );
}