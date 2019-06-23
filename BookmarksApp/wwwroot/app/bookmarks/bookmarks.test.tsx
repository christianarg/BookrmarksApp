import * as Bookrmarks from './bookrmarks';

describe('filterTests', () => {
    test('filter', () => {
        // ARRANGE
        const tag1: Bookrmarks.TagModel = {
            name: '.Net',
            bookmarks: [
                { name: 'download', url: 'https://dotnet.microsoft.com/download' }
            ]
        };
        const tag2: Bookrmarks.TagModel = {
            name: 'react',
            bookmarks: [
                { name: 'react docs', url: 'https://reactjs.org/docs/getting-started.html' }
            ]
        };
        const tags = [tag1, tag2];

        // ACT
        Bookrmarks.filterTags([tag1, tag2], 'down');

        // ARRANGE
        expect(tag1.hidden).toBe(false);
        expect(tag1.bookmarks[0].hidden).toBe(false);

        expect(tag2.hidden).toBe(true);
        expect(tag2.bookmarks[0].hidden).toBe(true);

    });
})