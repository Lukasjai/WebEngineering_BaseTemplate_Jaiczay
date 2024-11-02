// main.ts

import { initializeComments, initializeCommentForm } from './domManipulation';
import { getBearData } from './apiInteraction';
import { extractBears } from './bearData';

const main = async (): Promise<void> => {
  initializeComments();
  initializeCommentForm();

  const wikitext: string | undefined = await getBearData();
  if (wikitext) {
    await extractBears(wikitext);
  }
};

// Fetch and display the bear data
main();
