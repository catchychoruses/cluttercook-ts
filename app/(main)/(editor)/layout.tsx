import { PageWrapper } from '@/components/page-wrapper';
import { RecipeMaker } from './recipe-maker';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-between">
      <PageWrapper>
        <RecipeMaker>
          <div className="container mt-10">{children} </div>
        </RecipeMaker>
      </PageWrapper>
    </div>
  );
}
