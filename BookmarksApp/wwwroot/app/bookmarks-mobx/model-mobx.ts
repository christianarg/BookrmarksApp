import { action, makeAutoObservable, observable } from "mobx"

// Global state

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
