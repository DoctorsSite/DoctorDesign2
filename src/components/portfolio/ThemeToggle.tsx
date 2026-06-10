import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function useThemeInit() {
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored ? stored === "dark" : true;
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="glass rounded-full h-9 w-9 grid place-items-center text-foreground/80 hover:text-primary transition"
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}