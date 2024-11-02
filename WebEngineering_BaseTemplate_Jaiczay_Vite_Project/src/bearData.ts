// bearData.ts

import { fetchImageUrl } from './apiInteraction';

// interface for the bear object
interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

export const extractBears = async (wikitext: string): Promise<void> => {
  try {
    const speciesTables = wikitext.split('{{Species table/end}}');
    const bears: Bear[] = [];

    for (const table of speciesTables) {
      const rows = table.split('{{Species table/row');

      for (const row of rows) {
        const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
        const binomialMatch = row.match(/\|binomial=(.*?)\n/);
        const imageMatch = row.match(/\|image=(.*?)\n/);
        const rangeMatch = row.match(/\|range=(.*?)\n/);

        if (
            nameMatch?.[1] != null &&
            binomialMatch?.[1] != null &&
            imageMatch?.[1] != null &&
            rangeMatch?.[1] != null
        ) {
          const fileName = imageMatch[1].trim().replace('File:', '');
          const imageUrl = await fetchImageUrl(fileName);

          const bear: Bear = {
            name: nameMatch[1],
            binomial: binomialMatch[1],
            image: imageUrl,
            range: rangeMatch[1].trim(),
          };
          bears.push(bear);
        }
      }
    }

    const moreBearsSection = document.querySelector('.more_bears');
    if (moreBearsSection != null) {
      moreBearsSection.innerHTML = ''; // Clear previous content

      bears.forEach((bear) => {
        const bearDiv = document.createElement('div');
        const bearTitle = document.createElement('h3');
        bearTitle.textContent = `${bear.name} (${bear.binomial})`;
        bearDiv.appendChild(bearTitle);

        const bearImage = document.createElement('img');
        bearImage.src = bear.image;
        bearImage.alt = bear.name;
        bearImage.style.width = '200px';
        bearImage.style.height = 'auto';
        bearDiv.appendChild(bearImage);

        const bearRange = document.createElement('p');
        bearRange.innerHTML = `<strong>Range:</strong> ${bear.range}`;
        bearDiv.appendChild(bearRange);

        moreBearsSection.appendChild(bearDiv);
      });
    } else {
      console.warn('More bears section not found in the DOM.');
    }
  } catch (error) {
    console.error('Error extracting the bear data:', error);
    alert('There was an error fetching the bears. Please try again later.');
  }
};