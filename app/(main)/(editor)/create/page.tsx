import React from 'react';
import { Wrapper } from '../wrapper';
import Create from './create';

type Params = {
  searchParams: { url: string | undefined; scrapeImage: boolean | undefined };
};

export default function Page({ searchParams }: Params) {
  return (
    <Wrapper>
      <Create url={searchParams.url} scrapeImage={searchParams.scrapeImage} />
    </Wrapper>
  );
}
