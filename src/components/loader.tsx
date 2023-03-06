import { useRef } from "react";

export default function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="fixed w-full h-full bg-zinc-900 z-50" />
  );
}