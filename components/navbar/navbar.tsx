'use client';

import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { buttonVariants } from '../ui/button';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { Settings } from 'lucide-react';

const Navbar = () => {
  const currentPath = usePathname();

  return (
    <nav className=" container my-4 mt-10 flex max-w-[80vw] gap-4 max-md:hidden">
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
        <Link href={'/settings'} className={clsx(buttonVariants())}>
          <Settings />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
