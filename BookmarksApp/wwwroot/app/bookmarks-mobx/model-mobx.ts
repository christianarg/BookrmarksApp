import { makeAutoObservable } from "mobx"

// Global state

export class BookmarksStore {
    tags: TagModel[];
    searachText: string;
    
    constructor(){
        makeAutoObservable(this);
    }

    coso(){
        this.tags[0].name = this.tags[0].name + '1';
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