import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, systemTheme } = useTheme();

  const [currentTheme, setCurrentTheme] = useState('');

  useEffect(() => {
    setCurrentTheme(
      theme === 'system'
        ? systemTheme === 'light'
          ? 'light'
          : 'dark'
        : theme === 'light'
        ? 'light'
        : 'dark'
    );
  }, [systemTheme, theme]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            onClick={() =>
              currentTheme === 'dark' ? setTheme('light') : setTheme('dark')
            }
            className={cn(
              buttonVariants({ size: 'icon', variant: 'outline' }),
              className
            )}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {currentTheme === 'dark' ? (
            <p>Switch to Light Mode</p>
          ) : (
            <p>Switch to Dark Mode</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
