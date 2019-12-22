import * as React from 'react';
import * as Bookmarks from './bookmarks';
import { TagsRoot } from './bookmarks';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe("TagsRoot tests", () => {

    test("Render root tag test", () => {
        // ARRANGE
        // ACT
        const tagsRoot = shallow(<TagsRoot />);

        // ASSERT
        expect(shallowToJson(tagsRoot)).toMatchSnapshot();
    });

    test("Add root tag", () => {
        // ARRANGE

        // ACT

        // ASSERT
    });

    test("Remove root tag", () => {
        // ARRANGE

        // ACT

        // ASSERT
    });

    test("Edit root tag", () => {
        // ARRANGE

        // ACT

        // ASSERT
    });

    test("Render nested tag", () => {
        // ARRANGE

        // ACT

        // ASSERT
    });

});

test("Add nested tag", () => {
    // ARRANGE

    // ACT

    // ASSERT
});

test("Remove nested tag", () => {
    // ARRANGE

    // ACT

    // ASSERT
});

test("Edit nested tag", () => {
    // ARRANGE

    // ACT

    // ASSERT
});

test("Render bookmark", () => {
    // ARRANGE

    // ACT

    // ASSERT
});


test("Add bookmark", () => {
    // ARRANGE

    // ACT

    // ASSERT
});

test("Remove bookmark", () => {
    // ARRANGE

    // ACT

    // ASSERT
});

test("Edit bookmark", () => {
    // ARRANGE

    // ACT

    // ASSERT
});

describe("helerFunctionTests", () => {
    describe('filterTests', () => {
        test('filter', () => {
            // ARRANGE
            const tag1: Bookmarks.TagModel = {
                name: '.Net',
                bookmarks: [
                    { name: 'download', url: 'https://dotnet.microsoft.com/download' }
                ]
            };
            const tag2: Bookmarks.TagModel = {
                name: 'react',
                bookmarks: [
                    { name: 'react docs', url: 'https://reactjs.org/docs/getting-started.html' }
                ]
            };
            const tags = [tag1, tag2];

            // ACT
            Bookmarks.filterTags([tag1, tag2], 'down');

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
            const newTag: Bookmarks.TagModel = {
                name: '.Net',
                bookmarks: [{ name: 'download', url: 'https://dotnet.microsoft.com/download' }]
            }
            const tag1: Bookmarks.TagModel = {
                name: '.Net',
                bookmarks: []
            };
            const tag2: Bookmarks.TagModel = {
                name: 'react',
                bookmarks: []
            };
            const tags = [tag1, tag2];
            // ACT
            const replacedTags = Bookmarks.replaceTag(tags, newTag);

            // ASSERT
            var newTagFromReplaced = replacedTags.find(tag => tag.name == newTag.name);
            expect(newTagFromReplaced.bookmarks[0].name).toBe(newTag.bookmarks[0].name);
        });

        test('replaceSubTag', () => {
            // ARRANGE
            const newTag: Bookmarks.TagModel = {
                name: 'Asp.Net',
                bookmarks: [{ name: 'asp.net', url: 'https://dotnet.microsoft.com/apps/aspnet' }]
            }

            const subTag: Bookmarks.TagModel = {
                name: 'Asp.Net',
                bookmarks: []
            };

            const tag1: Bookmarks.TagModel = {
                name: '.Net',
                bookmarks: [],
                subTags: [subTag]
            };

            const tags = [tag1];
            // ACT
            const replacedTags = Bookmarks.replaceTag(tags, newTag);

            // ASSERT
            var newTagFromReplaced = replacedTags[0].subTags.find(tag => tag.name == newTag.name);
            expect(newTagFromReplaced.bookmarks[0].name).toBe(newTag.bookmarks[0].name);
        });
    })
});
