'use client';

import Link from 'next/link';
import React from 'react';
import { Button, buttonVariants } from '../ui/button';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { Croissant, Import, PlusCircle } from 'lucide-react';
import { SettingsButton } from './settings-button';
import clsx from 'clsx';
import { useToast } from '../ui/use-toast';

export default function Navbar() {
  const currentPath = usePathname();
  const { toast } = useToast();

  return (
    <nav
      className={clsx('flex gap-x-4 pt-10 max-md:hidden md:mx-12 lg:mx-16', {
        hidden: currentPath === '/auth/signin',
      })}
    >
      {[
        {
          path: '/',
          statePaths: ['/'],
          display: 'Browse',
          icon: <Croissant className="mx-2 hover:animate-spin" />,
        },
        {
          path: '/scrape',
          statePaths: ['/scrape', '/create'],
          display: 'New Recipe',
          icon: <PlusCircle className="mx-2" />,
        },
        /* {
          path: '/import',
          statePaths: ['import'],
          display: 'Import Recipe',
          icon: <Import className="mx-2" />,
        },*/
      ].map(({ path, statePaths, display, icon }) => (
        <Link
          key={path}
          className={clsx(
            buttonVariants({
              variant: statePaths.find((path) => path === currentPath)
                ? 'default'
                : 'outline',
              size: 'sm',
            }),
            'w-36 pl-0 font-semibold'
          )}
          href={path}
        >
          {icon || ''}
          {display}
        </Link>
      ))}
      <Button
        className="w-36 pl-0 font-semibold"
        variant="outline"
        size="sm"
        onClick={() => toast({ description: 'Coming soon ;^)' })}
      >
        <Import className="mx-2" />
        Import
      </Button>

      <div className="ml-auto flex gap-4">
        <ThemeToggle />
        <SettingsButton />
      </div>
    </nav>
  );
}
