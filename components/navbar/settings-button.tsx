import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import clsx from 'clsx';
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
            className={clsx(
              buttonVariants({ variant: 'outline', size: 'icon' })
            )}
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
