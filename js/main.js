// functionality for showing/hiding the comments section

var showHideBtn = document.querySelector('.show-hide');
var commentWrapper = document.querySelector('.comment-wrapper');

commentWrapper.style.display = 'none';
// changed to arrow function instead of function() syntax
showHideBtn.onclick = () => {
  try {
    var showHideText = showHideBtn.textContent;
    if (showHideText == 'Show comments') {
      showHideBtn.textContent = 'Hide comments';
      commentWrapper.style.display = 'block';
    } else {
      showHideBtn.textContent = 'Show comments';
      commentWrapper.style.display = 'none';
    }
  } catch (error) {
    console.error('Error showing/hiding comments:', error);
    alert('There was an error toggling the comments section. Please try again.');
  }
};

// functionality for adding a new comment via the comments form
var form = document.querySelector('.comment-form');
var nameField = document.querySelector('#name');
var commentField = document.querySelector('#comment');
var list = document.querySelector('.comment-container');

// changed to arrow function instead of function() syntax
form.onsubmit = (e) => {
  e.preventDefault();
  try {
    var listItem = document.createElement('li');
    var namePara = document.createElement('p');
    var commentPara = document.createElement('p');
    var nameValue = nameField.value;
    var commentValue = commentField.value;

    if (!nameValue || !commentValue) {
      throw new Error('Both name and comment are required.');
    }

    namePara.textContent = nameValue;
    commentPara.textContent = commentValue;

    list.appendChild(listItem);
    listItem.appendChild(namePara);
    listItem.appendChild(commentPara);

    nameField.value = '';
    commentField.value = '';
  } catch (error) {
    console.error('Error adding comment:', error);
    alert('Failed to add your comment. Please ensure all fields are filled and try again.');
  }
};

var baseUrl = "https://en.wikipedia.org/w/api.php";
var title = "List_of_ursids";

var params = {
    action: "parse",
    page: title,
    prop: "wikitext",
    section: 3,
    format: "json",
    origin: "*"
};

// Function to fetch the image URLs based on the file names
// changed to arrow function instead of function() syntax
const fetchImageUrl = async (fileName) => {
  const imageParams = {
    action: "query",
    titles: `File:${fileName}`,
    prop: "imageinfo",
    iiprop: "url",
    format: "json",
    origin: "*"
  };

  const url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query.pages;
    const imageInfo = Object.values(pages)[0].imageinfo;

    // **Check if imageInfo exists before accessing URL**
    if (imageInfo && imageInfo[0].url) {
      return imageInfo[0].url;
    } else {
      // **Return placeholder image URL if no valid image is found**
      return '/media/urban-bear.jpg';
    }
  } catch (error) {
    console.error('Error fetching image URL:', error);
    alert('There was an error fetching the image. Please try again later.');
  }
};

// Function to extract bear data from the wikitext
const extractBears = async (wikitext) => {
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
  }catch (error) {
    console.error('Error extracting the bear data', error);
    alert('There was an error fetching the bears. Please try again later.');
  }

};


// Refactored to async/await and arrow function
const getBearData = async () => {
  const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch bear data');
    }
    const data = await res.json();
    const wikitext = data.parse.wikitext['*'];
    await extractBears(wikitext);
  } catch (error) {
    console.error('Error fetching bear data:', error);
    alert('Failed to load bear data. Please check your internet connection and try again.');
  }
};

// Fetch and display the bear data
getBearData();
