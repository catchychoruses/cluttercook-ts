import { getServerSession } from 'next-auth';
import { getCsrfToken, getProviders, signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Auth } from './auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Page() {
  const session = await getServerSession(authOptions);

  const csrfToken = await getCsrfToken();

  if (session) {
    redirect('/');
  }

  const providers = await getProviders();

  return (
    <div className="container flex justify-center">
      <div className="m-4 mt-[8rem] w-max flex-col justify-center rounded border align-middle">
        <h1 className="pt-10 text-center text-5xl font-bold">ClutterCook</h1>
        <p className="text-center text-lg font-light">Recipe manager</p>
        {providers && <Auth providers={providers} token={csrfToken} />}
      </div>
    </div>
  );
}
