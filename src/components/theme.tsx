'use client';
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { useEffect, useState } from "react";

export default function ThemeButton() {
  const [isDark, setIsDark] = useState(false);
  useIsomorphicLayoutEffect(() => {
    const isDarkInLocalStorage = localStorage.getItem("theme") === "dark";
    setIsDark(isDarkInLocalStorage);
    document.documentElement.classList.toggle("dark", isDarkInLocalStorage);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  }

  return (
    <button onClick={toggleTheme} className="">
      {isDark ? "🌞" : "🌙"}
    </button>
  )
}