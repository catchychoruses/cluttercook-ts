import Browser from '@/components/(browser)/browser';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <main className="container flex flex-col items-center p-8 align-middle max-sm:p-16 lg:px-16 lg:pb-0">
      <Browser />
    </main>
  );
}
