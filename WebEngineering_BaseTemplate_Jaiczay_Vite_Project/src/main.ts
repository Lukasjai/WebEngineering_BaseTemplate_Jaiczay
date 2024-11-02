// main.ts

import { initializeComments, initializeCommentForm } from './domManipulation';
import { getBearData } from './apiInteraction';
import { extractBears } from './bearData';

const main = async (): Promise<void> => {
  initializeComments();
  initializeCommentForm();

  const wikitext: string | undefined = await getBearData();
  if (wikitext != null) {
    await extractBears(wikitext);
  }
};

// Fetch and display the bear data
main().catch((error) => {
  console.error('An error occurred in the main function:', error);
});
