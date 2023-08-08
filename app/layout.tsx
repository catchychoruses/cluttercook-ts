import './globals.css';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Session, getServerSession } from 'next-auth';
import { headers } from 'next/dist/client/components/headers';
import AuthContext from './api/auth/AuthContext';
import { HamburgerMenu } from '@/components/hamburger';
import Navbar from '@/components/navbar/navbar';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

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
            <h1 className="absolute left-32 top-4 text-[2rem] font-semibold md:hidden">
              ClutterCook
            </h1>
            <div className="container p-0">
              <Navbar />
            </div>
            {children}
          </ThemeProvider>

          <Toaster />
        </AuthContext>
      </body>
    </html>
  );
}
