import { Auth } from './auth';

export default async function Home() {
  return (
    <main className="container h-[90vh]">
      <div className="flex flex-col items-center justify-between p-16 align-middle">
        <Auth />
      </div>
    </main>
  );
}
