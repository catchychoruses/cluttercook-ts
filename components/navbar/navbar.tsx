'use client';

import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { buttonVariants } from '../ui/button';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { SettingsButton } from './settings-button';
const Navbar = () => {
  const currentPath = usePathname();

  return (
    <nav
      className={clsx('mt-10 flex gap-4 max-md:hidden', {
        ['hidden']: currentPath === '/auth',
      })}
    >
      {[
        { path: '/', display: 'Browse Recipes' },
        { path: '/scrape', display: 'New Recipe' },
        { path: '/import-recipe', display: 'Import Recipe' },
      ].map(({ path, display }) => (
        <Link
          key={path}
          className={clsx(
            buttonVariants({
              variant: path === currentPath ? 'default' : 'outline',
            }),
            'text-lg font-semibold'
          )}
          href={path}
        >
          <span>{display}</span>
        </Link>
      ))}
      <div className="ml-auto flex gap-4">
        <ThemeToggle />
        <SettingsButton />
      </div>
    </nav>
  );
};

export default Navbar;
