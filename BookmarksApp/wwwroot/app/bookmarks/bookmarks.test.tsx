import * as Bookrmarks from './bookmarks';

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

describe('replaceTagTests', () => {
    test('replaceTag', () => {
        // ARRANGE
        const newTag: Bookrmarks.TagModel = {
            name: '.Net',
            bookmarks: [{ name: 'download', url: 'https://dotnet.microsoft.com/download' }]
        }
        const tag1: Bookrmarks.TagModel = {
            name: '.Net',
            bookmarks: []
        };
        const tag2: Bookrmarks.TagModel = {
            name: 'react',
            bookmarks: []
        };
        const tags = [tag1, tag2];
        // ACT
        const replacedTags = Bookrmarks.replaceTag(tags, newTag);

        // ASSERT
        var newTagFromReplaced = replacedTags.find(tag => tag.name == newTag.name);
        expect(newTagFromReplaced.bookmarks[0].name).toBe(newTag.bookmarks[0].name);
    });

    test('replaceSubTag', () => {
        // ARRANGE
        const newTag: Bookrmarks.TagModel = {
            name: 'Asp.Net',
            bookmarks: [ { name: 'asp.net', url: 'https://dotnet.microsoft.com/apps/aspnet' }]
        }

        const subTag: Bookrmarks.TagModel = {
            name: 'Asp.Net',
            bookmarks: []
        };

        const tag1: Bookrmarks.TagModel = {
            name: '.Net',
            bookmarks: [],
            subTags: [subTag]
        };
        
        const tags = [tag1];
        // ACT
        const replacedTags = Bookrmarks.replaceTag(tags, newTag);

        // ASSERT
        var newTagFromReplaced = replacedTags[0].subTags.find(tag => tag.name == newTag.name);
        expect(newTagFromReplaced.bookmarks[0].name).toBe(newTag.bookmarks[0].name);
    });
})