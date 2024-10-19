// main.js

import { initializeComments, initializeCommentForm } from './domManipulation.js';
import { getBearData } from './apiInteraction.js';
import { extractBears } from './bearData.js';

const main = async () => {
  initializeComments();
  initializeCommentForm();

  const wikitext = await getBearData();
  if (wikitext) {
    await extractBears(wikitext);
  }
};

// Fetch and display the bear data
main();

