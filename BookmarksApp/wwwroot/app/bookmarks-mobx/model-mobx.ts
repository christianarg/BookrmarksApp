import { makeAutoObservable, observable } from "mobx"

// Global state

export class BookmarksStore {
    tags: TagModel[] = [];
    searchText: string = ""
    
    get filteredTags(){
        return this.tags.filter(x => !x.hidden);
    }

    constructor(){
        makeAutoObservable(this, {
            tags: observable,
            searchText: observable
        });
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