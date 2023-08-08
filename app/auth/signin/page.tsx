import { getServerSession } from 'next-auth';
import { getProviders, signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Auth } from './auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  const providers = await getProviders();

  return (
    <div className="container mt-[10rem] w-max  flex-col justify-center rounded border align-middle">
      <h1 className="p-10 text-center text-5xl font-bold">ClutterCook</h1>
      {providers && <Auth providers={providers} />}
    </div>
  );
}
