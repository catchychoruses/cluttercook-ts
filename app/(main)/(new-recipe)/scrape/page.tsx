import React from 'react';
import { Wrapper } from '../wrapper';
import { Scraper } from './scraper';

export default function Page() {
  return (
    <div className="flex justify-center">
      <Wrapper className="flex flex-nowrap justify-end gap-4 pb-6 max-md:justify-between  ">
        <Scraper />
      </Wrapper>
    </div>
  );
}
