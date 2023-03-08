'use client'
import LenisAnchor from "./LenisAnchor";

type NavItemsProps = {
  className?: string;
  items: { text: string, to: string }[];
}


export default function NavItems({ className, items }: NavItemsProps) {
  return (
    <>
      {items.map(({ text, to }) => (
        <LenisAnchor key={text} className={className} to={to}>{text}</LenisAnchor>
      ))}
    </>
  );
}