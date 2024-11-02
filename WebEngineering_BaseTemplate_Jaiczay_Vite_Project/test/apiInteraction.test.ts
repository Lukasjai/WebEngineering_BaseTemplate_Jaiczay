// apiInteraction.test.ts
import { fetchImageUrl } from '../src/apiInteraction';

global.fetch = jest.fn();

describe('fetchImageUrl', () => {
    const mockFetch = global.fetch as jest.Mock;

    beforeEach(() => {
        mockFetch.mockClear();
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test('should return image URL when fetch is successful', async () => {
        const mockResponse = {
            query: {
                pages: {
                    "12345": {
                        imageinfo: [{ url: 'https://example.com/image.jpg' }],
                    },
                },
            },
        };

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const url = await fetchImageUrl('example.jpg');
        expect(url).toBe('https://example.com/image.jpg');
    });

    test('should return placeholder image URL when image URL is not available', async () => {
        const mockResponse = {
            query: {
                pages: {
                    "12345": {},
                },
            },
        };

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const url = await fetchImageUrl('example.jpg');
        expect(url).toBe('../media/urban-bear.jpg');
    });

    test('should return placeholder image URL on fetch error', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Network error'));

        const url = await fetchImageUrl('example.jpg');
        expect(url).toBe('/media/urban-bear.jpg');
        expect(console.error).toHaveBeenCalledWith('Error fetching image URL:', expect.any(Error));
    });
});
