import { PageWrapper } from '@/components/page-wrapper';
import { Composer } from './Composer';

export default function newRecipe() {
  return (
    <div className="flex flex-col items-center justify-between p-24 pt-3">
      <PageWrapper>
        <Composer />
      </PageWrapper>
    </div>
  );
}
