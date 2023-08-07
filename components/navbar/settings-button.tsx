import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { cn } from '@/lib/utils';

import { Settings } from 'lucide-react';
import { buttonVariants } from '../ui/button';
import Link from 'next/link';

export const SettingsButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={'/settings'}
            className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
          >
            <Settings />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Settings</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
