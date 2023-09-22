import { useTheme } from "@/components/ThemeProvider";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";

export default function Footer() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => theme === "dark" ? setTheme("light") : setTheme("dark");

  return (
    <footer className="w-full h-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 flex items-center justify-between border-t">
      <p className="text-sm text-muted-foreground font-normal">
        Built by <a href="https://github.com/ShrideepP" target="_blank" className="text-foreground font-medium hover:underline underline-offset-2">ShrideepP</a>
      </p>
      <div>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          <Icons.sun 
            className="w-4 h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" 
            aria-hidden="true"
          />
          <Icons.moon 
            className="w-4 h-4 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" 
            aria-hidden="true"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <a href="https://github.com/ShrideepP/weather_bot" target="_blank">
          <Button variant="ghost" size="icon">
            <Icons.github className="w-4 h-4" />
          </Button>
        </a>
      </div>
    </footer>
  );
};