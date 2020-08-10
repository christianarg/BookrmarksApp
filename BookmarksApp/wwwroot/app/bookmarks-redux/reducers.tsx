import { BookmarksAppState, TagModelState, BookmarkModel } from "./bookmarks-redux";
import { BookmarkActionTypes, ADD_BOOKMARK, ADD_OR_EDIT_TAG, SEARCH, EDIT_BOOKMARK } from "./actions";
import { editBookmark } from "../bookmarks-redux-toolkit/bookmark-slice";

export function bookmarkApp(state: BookmarksAppState, action: BookmarkActionTypes): BookmarksAppState {
    if (state == null) {
        return initialState;
    }
    switch (action.type) {
        case SEARCH: {
            // TODO
            const searchText = action.searchValue;
            state.searchValue = searchText;
            filterTags(state, state.tags, state.searchValue);

            return { ...state }
        }
        case ADD_BOOKMARK: {
            let tag = state.tags.find(x => x.name == action.tagName);
            tag = { ...tag };
            tag.bookmarks = tag.bookmarks.concat(action.bookmarkModel.name);
            return {
                ...state,
                bookmarks: state.bookmarks.concat(action.bookmarkModel),    // añadir bookmark
                tags: state.tags.map(x => x.name == tag.name ? tag : x) // reeplazar tag
            };
        }



        case ADD_OR_EDIT_TAG: {
            let tags: TagModelState[];
            let tagToAddOrEdit = state.tags.find(x => x.name == action.addOrEditTagResult.oldName);
            if (tagToAddOrEdit) {  // edit
                tagToAddOrEdit = { ...tagToAddOrEdit };
                tags = state.tags.slice(0);
                tagToAddOrEdit.name = action.addOrEditTagResult.name;

                tags = tags.map(x => x.name == action.addOrEditTagResult.oldName ? tagToAddOrEdit : x);

                // en el padre reemplazar el subtag por el nuevo nombre
                let parentTag = state.tags.find(x => x.name == action.parentTagName);
                if (parentTag) {
                    parentTag = { ...parentTag };
                    parentTag.subTags = parentTag.subTags.map(x => x == action.addOrEditTagResult.oldName ? tagToAddOrEdit.name : x);
                    tags = tags.map(x => x.name == parentTag.name ? parentTag : x);
                }
            } else {
                tagToAddOrEdit = { ...action.addOrEditTagResult };
                tags = state.tags.concat(tagToAddOrEdit);
                let parentTag = state.tags.find(x => x.name == action.parentTagName);
                if (parentTag) {
                    parentTag = { ...parentTag };
                    if (!parentTag.subTags) {
                        parentTag.subTags = [];
                    }
                    parentTag.subTags = parentTag.subTags.concat(tagToAddOrEdit.name);
                    //tags = replaceTag(tags, parentTag);
                    tags = tags.map(x => x.name == parentTag.name ? parentTag : x);
                }
                else {
                    tagToAddOrEdit.isRoot = true;
                }
            }

            return {
                ...state,
                bookmarks: state.bookmarks.slice(0),
                tags: tags
            };
        }

        case EDIT_BOOKMARK: {
            let bookmarks = state.bookmarks.slice(0);
            const editedBookmark = { ...action.edit };
            // replace bookmark
            bookmarks = bookmarks.map(x => x.name == editedBookmark.oldName ? editedBookmark : x);

            if (editedBookmark.oldName != editedBookmark.name) {
                let tags = state.tags.slice(0);

                const tag = { ...action.tag };
                // replace bookmark
                tag.bookmarks = tag.bookmarks.map(x => x == editedBookmark.oldName ? editedBookmark.name : x);
                tags = replaceTag(state.tags, tag);
                return {
                    ...state,
                    bookmarks,
                    tags
                }
            }
            return {
                ...state,
                bookmarks,
            }
        }

        default:
            throw 'Action desconocida';

    }
}

function getTags(state: BookmarksAppState, tagNames: string[]): TagModelState[] {
    const allTags = state.tags;

    return allTags.filter(x => tagNames.some(tagName => tagName == x.name));
}

function getBookmarks(state: BookmarksAppState, bookmarkNames: string[]): BookmarkModel[] {
    const allBookmarks = state.bookmarks;

    return allBookmarks.filter(x => bookmarkNames.some(bookmarkName => bookmarkName == x.name));
}

// TODO: WARNING copiado del redux-toolkit y no copio objetos creo que se tiene que hacer
export function filterTags(state: BookmarksAppState, tags: TagModelState[], searchText: string) {
    const allTags = state.tags;

    tags.forEach(tag => {
        const bookmarks = getBookmarks(state, tag.bookmarks);

        bookmarks.forEach(bookmark => bookmark.hidden = !hasText(bookmark.name, searchText));
        const anyBookmarkVisible = bookmarks.some(b => !b.hidden);

        const tagNameHasText = hasText(tag.name, searchText);

        const anySubTagsVisible = tag.subTags && getTags(state, tag.subTags).some(t => !t.hidden);
        tag.hidden = !tagNameHasText && !anyBookmarkVisible && !anySubTagsVisible;
        if (tag.subTags) {
            filterTags(state, getTags(state, tag.subTags), searchText);
        }
    });
}


function hasText(text: string, searchText: string) {
    return text.toLowerCase().includes(searchText.toLowerCase());
}

function replaceTag(tags: TagModelState[], tag: TagModelState): TagModelState[] {
    return tags.map(x => x.name == tag.name ? tag : x);
}

export const initialState: BookmarksAppState = {
    tags: [{
        name: '.Net',
        bookmarks: ['download'],
        subTags: ['Asp.net'],
        isRoot: true
    },
    {
        name: 'Asp.net',
        bookmarks: ['asp.net', 'asp.net core']
    },
    {
        name: 'React',
        bookmarks: ['react docs'],
        isRoot: true
    }],
    bookmarks: [
        { name: 'download', url: 'https://dotnet.microsoft.com/download' },
        { name: 'asp.net', url: 'https://dotnet.microsoft.com/apps/aspnet' },
        { name: 'asp.net core', url: 'https://docs.microsoft.com/es-es/aspnet/core/?view=aspnetcore-2.2' },
        { name: 'react docs', url: 'https://reactjs.org/docs/getting-started.html' }
    ],
    searchValue: ''
};