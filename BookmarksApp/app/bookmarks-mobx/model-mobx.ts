import { makeAutoObservable } from "mobx"

// Global state

function hasText(text: string, searchText: string) {
    return text.toLowerCase().includes(searchText.toLowerCase());
}

function filterTags(tags: TagModel[], searchText: string) {
    tags.forEach(tag => {
        tag.bookmarks.forEach(bookmark => bookmark.hidden = !hasText(bookmark.name, searchText));
        const anyBookmarkVisible = tag.bookmarks.some(b => !b.hidden);
        const tagNameHasText = hasText(tag.name, searchText);
        const anySubTagsVisible = tag.subTags && tag.subTags.some(t => !t.hidden);
        tag.hidden = !tagNameHasText && !anyBookmarkVisible && !anySubTagsVisible;
        if (tag.subTags) {
            filterTags(tag.subTags, searchText);
        }
    });
}

export class BookmarksStore {
    tags: TagModel[] = [];
    searchText: string = ""

    get filteredTags() {
        return this.tags.filter(x => !x.hidden);
    }

    constructor() {
        makeAutoObservable(this);
    }

    addBookmark(tag: TagModel, boomark: BookmarkModel) {
        tag.bookmarks.push(boomark);
    }

    editBookmark(bookmark: BookmarkModel, editBookmark: BookmarkModel) {
        bookmark.name = editBookmark.name;
        bookmark.url = editBookmark.url;
    }

    addTag(parentTag: TagModel, subTag: TagModel) {
        if (parentTag) {
            if (parentTag.subTags == null) {
                parentTag.subTags = [];
            }
            parentTag.subTags.push(subTag);
        }
        else {
            this.tags.push(subTag);
        }
    }

    editTag(tag: TagModel, editTag: TagModel) {
        tag.name = editTag.name;
    }

    search(searchValue: string) {
        this.searchText = searchValue;
        filterTags(store.tags, searchValue);
    }
}

// Models
export type TagModel = {
    name: string;
    subTags?: TagModel[];
    bookmarks: BookmarkModel[];
    hidden?: boolean;
}

export type AddOrEditTagResult = TagModel & { oldName?: string; }

export type BookmarkModel = {
    name: string;
    url: string;
    hidden?: boolean;
}

export type EditBookmark = BookmarkModel & { oldName: string };

// Store

export const sampleBookrmarks: TagModel[] = [
    {
        name: '.Net',
        bookmarks: [
            { name: 'download', url: 'https://dotnet.microsoft.com/download' }
        ],
        subTags: [
            {
                name: 'Asp.net',
                bookmarks: [
                    { name: 'asp.net', url: 'https://dotnet.microsoft.com/apps/aspnet' },
                    { name: 'asp.net core', url: 'https://docs.microsoft.com/es-es/aspnet/core/?view=aspnetcore-2.2' },
                ],
            }
        ]
    },
    {
        name: 'React',
        bookmarks: [
            { name: 'react docs', url: 'https://reactjs.org/docs/getting-started.html' }
        ]
    }
]

export const store = new BookmarksStore();
store.tags = sampleBookrmarks;