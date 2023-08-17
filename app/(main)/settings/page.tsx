import { PageWrapper } from '@/components/page-wrapper';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import UserInfo from './user-info';

export default async function Page() {
  const session = await getServerSession(authOptions);

  const user = session?.user || undefined;

  return (
    <div className="container flex flex-col items-center p-8 align-middle max-sm:p-16 lg:p-16">
      <PageWrapper>
        <div className="container m-auto mt-10 flex flex-col items-center gap-4 rounded-sm border p-4">
          <UserInfo name={user?.name} email={user?.email} image={user?.image} />
        </div>
      </PageWrapper>
    </div>
  );
}
