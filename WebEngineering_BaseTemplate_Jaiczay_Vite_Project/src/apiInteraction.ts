// apiInteraction.ts

const baseUrl = 'https://en.wikipedia.org/w/api.php';

// interface for the expected response structure of the image info
interface ImageInfo {
  url: string;
}

// interface for the page response structure
interface Page {
  imageinfo?: ImageInfo[];
}

// interface for the entire query response
interface QueryResponse {
  query: {
    pages: Record<string, Page>;
  };
}

export const fetchImageUrl = async (fileName: string): Promise<string> => {
  const imageParams: Record<string, string> = {
    action: 'query',
    titles: `File:${fileName}`,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
    origin: '*',
  };

  const url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;

  try {
    const res = await fetch(url);
    const data: QueryResponse = await res.json();
    const pages = data.query.pages;
    const imageInfo = Object.values(pages)[0]?.imageinfo;

    if (imageInfo?.[0].url != null) {
      return imageInfo[0].url;
    } else {
      return '../media/urban-bear.jpg'; // Placeholder image
    }
  } catch (error) {
    console.error('Error fetching image URL:', error);
    alert('There was an error fetching the image. Please try again later.');
    return '/media/urban-bear.jpg'; // Placeholder image in case of error
  }
};

// interface for the bear data response structure
interface BearDataResponse {
  parse: {
    wikitext: {
      '*': string;
    };
  };
}

export const getBearData = async (): Promise<string | undefined> => {
  const params: Record<string, string> = {
    action: 'parse',
    page: 'List_of_ursids',
    prop: 'wikitext',
    section: '3', // Ensure this is a string as per the expected API parameter
    format: 'json',
    origin: '*',
  };

  const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch bear data');
    }
    const data: BearDataResponse = await res.json();
    return data.parse.wikitext['*'];
  } catch (error) {
    console.error('Error fetching bear data:', error);
    alert('Failed to load bear data. Please check your internet connection and try again.');
  }
};