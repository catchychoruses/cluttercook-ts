import Browser from '@/components/browser/browser';
import { PageWrapper } from '@/components/page-wrapper';
import prisma from '@/lib/prisma';

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <PageWrapper>
        <Browser />
      </PageWrapper>
    </main>
  );
}
