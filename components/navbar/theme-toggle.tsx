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

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            onClick={() =>
              theme === 'dark' ? setTheme('light') : setTheme('dark')
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
          {theme == 'dark' ? (
            <p>Switch to Light Mode</p>
          ) : (
            <p>Switch to Dark Mode</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
