// bearData.js

import { fetchImageUrl } from './apiInteraction.js';

export const extractBears = async (wikitext) => {
    try {
        const speciesTables = wikitext.split('{{Species table/end}}');
        const bears = [];

        for (const table of speciesTables) {
            const rows = table.split('{{Species table/row');

            for (const row of rows) {
                const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
                const binomialMatch = row.match(/\|binomial=(.*?)\n/);
                const imageMatch = row.match(/\|image=(.*?)\n/);
                const rangeMatch = row.match(/\|range=(.*?)\n/);

                if (nameMatch && binomialMatch && imageMatch && rangeMatch) {
                    const fileName = imageMatch[1].trim().replace('File:', '');
                    const imageUrl = await fetchImageUrl(fileName);

                    const bear = {
                        name: nameMatch[1],
                        binomial: binomialMatch[1],
                        image: imageUrl,
                        range: rangeMatch[1].trim()
                    };
                    bears.push(bear);
                }
            }
        }


        const moreBearsSection = document.querySelector('.more_bears');
        moreBearsSection.innerHTML = '';

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

    } catch (error) {
        console.error('Error extracting the bear data', error);
        alert('There was an error fetching the bears. Please try again later.');
    }
};
