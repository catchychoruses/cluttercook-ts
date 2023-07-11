import { PageWrapper } from '@/components/page-wrapper';
import { Browser } from '../components/browser/browser';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <PageWrapper>
        <Browser />
      </PageWrapper>
    </main>
  );
}
