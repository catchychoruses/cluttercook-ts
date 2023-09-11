import './globals.css';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Session, getServerSession } from 'next-auth';
import AuthContext from './api/auth/AuthContext';
import { HamburgerMenu } from '@/components/hamburger';
import Navbar from '@/components/navbar/navbar';
import { authOptions } from './api/auth/[...nextauth]/route';
import { Analytics } from '@vercel/analytics/react';

const workSans = Work_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cluttercook',
  description: 'web scraper/recipe manager',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(workSans.className)}>
        <AuthContext session={session as Session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="theme"
          >
            <HamburgerMenu />
            <p
              className={
                'absolute left-0 right-0 mx-auto mt-6 w-32 text-3xl font-semibold md:hidden'
              }
            >
              Cluttercook
            </p>

            <Navbar />
            {children}
            <Analytics />
          </ThemeProvider>

          <Toaster />
        </AuthContext>
      </body>
    </html>
  );
}
