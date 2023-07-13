'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Separator } from './ui/separator';
import { useState } from 'react';

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

  return (
    <div className="absolute left-3 top-6">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild onClick={() => setIsOpen(true)}>
          <Button
            variant="outline"
            className="ml-4 mt-4 bg-white p-0.5 md:hidden "
          >
            <HamburgerIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side={'left'}>
          <div className="mt-4 max-w-[80%]">
            {[
              { link: '/', display: 'Browse Recipes' },
              { link: '/new-recipe', display: 'New Recipe' },
              { link: '/import-recipe', display: 'Import Recipe' },
            ].map(({ link, display }) => (
              <>
                <div onClick={() => setIsOpen(false)}>
                  <Link href={link}>{display}</Link>
                </div>
                <Separator className="my-4" />
              </>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
