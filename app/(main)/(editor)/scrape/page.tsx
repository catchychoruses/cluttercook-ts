import React from 'react';
import { Wrapper } from '../wrapper';
import { Scraper } from './scraper';

export default function Page() {
  return (
    <Wrapper>
      <h1 className="text-3xl font-semibold">Scrape Recipe</h1>
      <Scraper />
    </Wrapper>
  );
}
