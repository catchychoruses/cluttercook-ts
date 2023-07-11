'use client';

import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { buttonVariants } from '../ui/button';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const currentPath = usePathname();

  return (
    <nav className="container mt-10 flex flex-row justify-start gap-4 max-md:hidden">
      {[
        { path: '/', display: 'Browse Recipes' },
        { path: '/new-recipe', display: 'New Recipe' },
        { path: '/import-recipe', display: 'Import Recipe' },
      ].map(({ path, display }) => (
        <Link
          key="path"
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
    </nav>
  );
};

export default Navbar;
