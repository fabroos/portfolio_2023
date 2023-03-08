'use client';
import useStore from "@/context/store";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import gsap from "gsap"
import { useEffect, useRef, useState } from "react";
import NavItems from "./NavItems";

const menuItems = [
  { text: "Home", to: "main" },
  { text: "Works", to: "#works" },
  { text: "Contact", to: "#contact" },
]

export default function Menu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<GSAPTimeline>(gsap.timeline({ paused: true }));
  const { lenis } = useStore();
  useIsomorphicLayoutEffect(() => {
    const menu = menuRef.current;
    const tl = tlRef.current;
    if(!menu) return;
    tl.to(menu, {
      onStart: () => lenis?.stop(),
      duration: 1,
      autoAlpha: 1,
      height: '100%', // change this to 100vh for full-height menu
      ease: 'expo.inOut',
    })
    tl.to(menu.querySelectorAll('.nav-item-mobile'), {
      duration: 1,
      opacity: 1,
      y: 0,
      stagger: 0.1,
      ease: 'expo.inOut',
      onReverseComplete: () => lenis?.start(),
    }, "-=1");   

    ()=> {
      tl.kill();
    }
  }, [lenis])

  return (
    <div className="md:hidden">
      <button className="w-6 h-6" onClick={()=> tlRef.current.play()}>
        <svg viewBox="0 0 180 181" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M180 0.5H0V36.5H180V0.5Z" fill="currentColor"/>
          <path d="M180 144.5H0V180.5H180V144.5Z" fill="currentColor"/>
          <path d="M180 72.5H0V108.5H180V72.5Z" fill="currentColor"/>
        </svg>
      </button>
      <nav ref={menuRef} className="fixed w-full top-0 h-0 opacity-0 invisible left-0 bg-zinc-100 dark:bg-zinc-900 z-30">
        <button className="w-6 h-6 absolute top-4 right-4 z-50" onClick={()=> tlRef.current.reversed() ? tlRef.current.play() : tlRef.current.reverse()}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
          </svg>
        </button>
        <div className="relative flex flex-col justify-between pt-24 items-center h-full">
          <div className="flex flex-col w-full text-4xl border-t-2 border-zinc-900 dark:border-zinc-100">
            <NavItems items={menuItems} className="border-b-2 border-zinc-900 dark:border-zinc-100 nav-item-mobile py-6 w-full opacity-0 translate-y-20" />
          </div>
          <h2 className="text-[15vw] uppercase font-bold tracking-widest text-zinc-900 dark:text-zinc-100 opacity-20">FABROOS</h2>
        </div>
      </nav>
    </div>
  );
}