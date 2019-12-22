import { BookmarkModel, TagModelState, AddOrEditTagResult, EditBookmark } from "./bookmarks-redux";

export const ADD_BOOKMARK = 'ADD_BOOKMARK';
export const ADD_OR_EDIT_TAG = 'ADD_OR_EDIT_TAG';
export const EDIT_BOOKMARK = 'EDIT_BOOKMARK';
export const SEARCH = 'SEARCH';

export type AddBookmark = {
    type: typeof ADD_BOOKMARK;
    tagName: string;
    bookmarkModel: BookmarkModel;
}

export function addBookmark(bookmarkModel: BookmarkModel, tagName: string): AddBookmark {
    return {
        type: ADD_BOOKMARK,
        bookmarkModel: bookmarkModel, 
        tagName: tagName
    }
}

export type AddOrEditTag = {
    type: typeof ADD_OR_EDIT_TAG;
    addOrEditTagResult: AddOrEditTagResult;
    parentTagName: string;
}


export function addOrEditTag(addOrEditTagResult: AddOrEditTagResult, parentTagName: string): AddOrEditTag  {
    return {
        type: ADD_OR_EDIT_TAG,
        addOrEditTagResult: addOrEditTagResult,
        parentTagName: parentTagName
    }
}

export type Search = {
    type: typeof SEARCH;
    searchValue: string;
}


export function search(searchValue: string): Search {
    return {
        type: SEARCH,
        searchValue: searchValue
    }
}


export type BookmarkActionTypes =
    AddBookmark | AddOrEditTag | Search;