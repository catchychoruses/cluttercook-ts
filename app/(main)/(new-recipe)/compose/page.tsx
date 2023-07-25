import React, { use } from 'react';
import { Composer } from './composer';
import { Wrapper } from '../wrapper';

type Params = {
  searchParams: { url: string | undefined };
};

export default function Page({ searchParams }: Params) {
  return (
    <Wrapper>
      <Composer url={searchParams.url} />
    </Wrapper>
  );
}
