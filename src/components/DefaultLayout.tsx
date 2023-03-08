'use client';
import { PropsWithChildren, useEffect, useRef } from "react"; 
import Router, {RouterEvent} from "next/router"; 
import { gsap } from "gsap"; 
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import Lenis, {} from "@studio-freight/lenis";
import useStore from "@/context/store";


function Layout({ children}: PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const tl = useRef<GSAPTimeline>(gsap.timeline({ paused: true }));

  const { lenis, setLenis } = useStore();
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return; // If window is undefined, return
    // Function to handle route change start
    gsap.set(loaderRef.current, { top: '0' });
    const timeline = tl.current;
    timeline.to(loaderRef.current, {
      top: '100%',
      duration: 0.5,
      ease: "power2.out",
    });

    const to = setTimeout(() => {
      timeline.play();
    }, 1000);

    // Remove event listeners on cleanup
    return () => {
      clearTimeout(to);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })
    

    lenis.on('scroll', ({ progress } : { progress: number }) => {
      if(!scrollBarRef.current) return;
      const progressEl = scrollBarRef.current.querySelector('.scrollbar-progress');
      gsap.to(progressEl, {
        height: `${progress * 100}%`,
        duration: 0.5,
        ease: "power2.out",
      });
      if(progress >= 0.90 || progress <= 0.10) {
        gsap.to(progressEl, {
          borderRadius: '0 0 0 0',
          duration: 0.5,
        })
      } else {
        gsap.to(progressEl, {
          borderRadius: '0 0 0.375rem 0.375rem',
          duration: 0.5,
        })
      }
    })
      
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)
    setLenis(lenis);
    return () => {
      setLenis(null);
      lenis.destroy()
    }
  }, [ref.current]);

  return (
    // Wrapping component inside a div with opacity set to 0
    <>
      <div id="loader" ref={loaderRef} className="fixed bg-zinc-900 dark:bg-zinc-100 transition-all z-50 top-0 left-0 w-full h-full grid place-content-center">
        <div className="text-hero text-zinc-100 dark:text-zinc-900">FABROOS</div>
      </div>
      <div id="scrollBar" ref={scrollBarRef} className="fixed z-50 top-0 right-0 h-full w-1.5">
        <div className="bg-zinc-200 h-0 w-full scrollbar-progress rounded-b-md"></div>
      </div>
        
      {children}
    </>
  );
}

export default Layout;
