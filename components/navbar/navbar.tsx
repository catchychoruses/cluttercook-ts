'use client';

import Link from 'next/link';
import React from 'react';
import { buttonVariants } from '../ui/button';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { Croissant, Import, PlusCircle } from 'lucide-react';
import { SettingsButton } from './settings-button';
import clsx from 'clsx';
const Navbar = () => {
  const currentPath = usePathname();

  return (
    <nav
      className={clsx('flex gap-x-4 pt-10 max-md:hidden', {
        ['hidden']: currentPath === '/auth/signin',
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
        {
          path: '/import',
          statePaths: ['import'],

          display: 'Import Recipe',
          icon: <Import className="mx-2" />,
        },
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
            'w-40 pl-0 text-lg font-semibold'
          )}
          href={path}
        >
          {icon || ''} <span>{display}</span>
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
