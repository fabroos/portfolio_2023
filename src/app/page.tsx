import AnchorButton from "@/components/AnchorButton";
import CustomLink from "@/components/custom-link";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";


const social = [
  { name: 'Github', href: 'https://github.com/fabroos', icon: 'github' },
  { name: 'Twitter', href: 'https://twitter.com/fabroos', icon: 'twitter' },
  { name: 'Instagram', href: 'https://instagram.com/fabroos.s', icon: 'instagram' },
  { name: 'Linkedin', href: 'https://linkedin.com/in/signorettafabrizio', icon: 'linkedin' },
]

const works = [
  { name: "1versus1", href: "/1versus1.png" },
  { name: "Museum", href: "/museum_better.png" },
  { name: "Himitsu", href: "/himitsu_better.png" },
]


export default function Home() {
  return (
    <>
      <div>
        <section className="flex flex-col gap-24 items-center h-[calc(100vh_-_64px)] container mx-auto px-4">
          <div className="flex flex-col justify-center items-center text-hero">
            <h1 className="flex w-full justify-between border-b-2 border-zinc-900 whitespace-nowrap"><span className="mr-6"><span className="animate-rotat">✳</span> FABRIZIO</span><span>SIGNORETTA</span></h1>
            <div className="relative">
              <AnchorButton className="left-[max(20vw,120px)] bottom-[30%] " to="#works">
                WORKS
              </AnchorButton>
              <AnchorButton className="right-[max(2vw,20px)] -top-[5%]" to="#contact" startsIn={6.4}>
                CONTACT
              </AnchorButton>
              <h2 className="text-center mt-8">(FULLSTACK DESIGNER & DEVELOPER)</h2>
            </div>
          </div>
            <p className="max-w-screen-md text-lg overflow-hidden">{"Hello, I'm Fabrizio Signoretta, a creative Fullstack Developer based in Cordoba, Argentina. 🇦🇷 My passion is creating exceptional experiences and crafting beautiful, interactive interfaces that captivate users. I specialize in using cutting-edge technologies such as GSAP, Tailwind CSS, React, TypeScript, and Next.js 13, but I'm always eager to learn and work with other tools and frameworks."}</p>
        </section>
        <div aria-hidden className="absolute bottom-0 left-0 w-full -z-10 overflow-hidden">
          <p className="text-[20vw] text-zinc-200/50 leading-none dark:text-zinc-800/50">FABROOS</p>
        </div>
        <section id="works" className="flex container mx-auto flex-col min-h-screen gap-4 py-4 px-4">
          <h2 className="text-title">MY PROJECTS</h2>
          <div className="grid-layout flex-1 gap-8">
            {works.map((work, i) => (
            <picture key={work.name} className={`bg-zinc-900 rounded-xl dark:bg-zinc-100 grid-area-${i+1} text-zinc-900 grid place-content-center w-full h-full relative overflow-hidden`}>
              <Image src={work.href} fill className="object-cover" alt={work.name} />
            </picture>
            ))}
            
          </div>
          <Link href="https://github.com/fabroos">MORE PROJECTS</Link>
        </section>
        <section id="contact" className="flex container mx-auto flex-col pb-12 gap-4 py-4 px-4">
          <h2 className="text-title">CONTACT ME</h2>
          <div className="flex flex-col">
            {social.map((item) => (
              <CustomLink key={item.name}  href={item.href}>{item.name}</CustomLink>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
