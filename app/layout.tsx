import './globals.css';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Session } from 'next-auth';
import { headers } from 'next/dist/client/components/headers';
import AuthContext from './api/auth/AuthContext';
import { HamburgerMenu } from '@/components/hamburger';
import Navbar from '@/components/navbar/navbar';

const workSans = Work_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cluttercook',
  description: 'scuk me',
};

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`http://localhost:3000/api/auth/session`, {
    headers: {
      cookie,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession(headers().get('cookie') ?? '');

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(workSans.className)}>
        <AuthContext session={session}>
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
