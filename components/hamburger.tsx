'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Separator } from './ui/separator';
import { useState } from 'react';
import { cn } from '@/lib/utils';

import { usePathname } from 'next/navigation';
import { ThemeToggle } from './navbar/theme-toggle';

const HamburgerIcon = () => (
  <div className="p-1/2">
    <svg
      className="h-10 w-10 text-gray-500"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  </div>
);

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();

  return (
    <div
      className={cn('absolute left-1.5 ', {
        hidden: currentPath === '/auth/signin',
      })}
    >
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild onClick={() => setIsOpen(true)}>
          <Button
            variant="outline"
            className="ml-4 mt-4 bg-white p-0.5 md:hidden "
          >
            <HamburgerIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side={'left'} className="flex flex-col ">
          <div className="mt-4 flex h-full max-w-[80%] flex-col">
            {[
              { link: '/', display: 'Browse Recipes' },
              { link: '/scrape', display: 'New Recipe' },
              { link: '/settings', display: 'Settings' },
            ].map(({ link, display }) => (
              <div key={link}>
                <div onClick={() => setIsOpen(false)}>
                  <Link href={link}>{display}</Link>
                </div>
                <Separator className="my-4" />
              </div>
            ))}
          </div>
          <div>
            <ThemeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
