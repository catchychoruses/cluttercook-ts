import { PageWrapper } from '@/components/page-wrapper';
import { RecipeMaker } from './recipe-maker';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <PageWrapper>
        <RecipeMaker>
          <div className="mt-10 p-2">{children} </div>
        </RecipeMaker>
      </PageWrapper>
    </div>
  );
}
