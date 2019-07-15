import { BookmarkModel, TagModel, AddOrEditTagResult, EditBookmark } from "./bookmark-model";

export const ADD_BOOKMARK = 'ADD_BOOKMARK';
export const ADD_OR_EDIT_TAG = 'ADD_OR_EDIT_TAG';
export const EDIT_BOOKMARK = 'EDIT_BOOKMARK';
export const SEARCH = 'SEARCH';

export type AddBookmark = {
    tag: TagModel;
    bookmarkModel: BookmarkModel;
}

export function addBookmark(args: AddBookmark): AddBookmark & ActionType {
    return { ...args, type: ADD_BOOKMARK }
}

export type AddOrEditTag = {
    type: typeof ADD_OR_EDIT_TAG;
    addOrEditTagResult: AddOrEditTagResult, parentTag: TagModel
}

export function addOrEditTag(args: AddOrEditTag): AddOrEditTag & ActionType {
    return { ...args, type: ADD_OR_EDIT_TAG }
}

export type EditBookmark = {
    tag: TagModel, editedBookmark: EditBookmark
}

export function editBookmark(args: EditBookmark): EditBookmark & ActionType {
    return { ...args, type: EDIT_BOOKMARK }
}

export function search(searchValue: string) {
    return {
        type: SEARCH,
        searchValue: searchValue
    }
}

type ActionType = {
    type: string;
}

export type BookmarkActionTypes =
    AddBookmark |
    EditBookmark |
    AddOrEditTag;

var kito: BookmarkActionTypes;
kito.bookmarkModel;