'use client'
import gsap from "gsap";
import Link from "next/link";
import { useRef } from "react";

export default function CustomLink({href, children, isBlank = false}: {href: string, children: React.ReactNode, isBlank?: boolean}) {
  const tl = useRef<GSAPTimeline>(gsap.timeline({ paused: true }));
  const elRef = useRef<HTMLAnchorElement>(null);
  const onMouseEnter = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    tl.current.clear();
    tl.current.to(elRef.current, {
      duration: 0.3,
      ease: "power2.out",
      paddingLeft: '2rem',
    })
    .to(elRef.current?.querySelector('div') as HTMLDivElement, {
      duration: 0.3,
      ease: "power2.out",
      left: '0',
    }, 0);
    tl.current.play();
  }

  const onMouseLeave = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    tl.current.reverse();
  }

  return (
    <Link
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    ref={elRef}
    target={isBlank ? '_blank' : '_self'}
    className="py-4 text-title border-b-2 border-zinc-900 dark:border-zinc-100 uppercase relative overflow-hidden flex" href={href}>
    <div className="-left-full absolute">✳</div>
    <span className="relative z-10">{children}</span>
    </Link>
  );
}