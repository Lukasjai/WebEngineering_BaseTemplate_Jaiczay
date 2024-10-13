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
        bears.forEach((bear) => {
            moreBearsSection.innerHTML += `
            <div>
                <h3>${bear.name} (${bear.binomial})</h3>
                <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
                <p><strong>Range:</strong> ${bear.range}</p>
            </div>
            `;
        });
    } catch (error) {
        console.error('Error extracting the bear data', error);
        alert('There was an error fetching the bears. Please try again later.');
    }
};
