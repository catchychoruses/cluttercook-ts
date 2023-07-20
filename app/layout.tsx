import './globals.css';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { buttonVariants } from '@/components/ui/button';
import { HamburgerMenu } from '@/components/hamburger';
import Link from 'next/link';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Navbar from '@/components/navbar/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const workSans = Work_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cluttercook',
  description: 'scuk me',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(workSans.className, 'container')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <HamburgerMenu />
          <Navbar />
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
