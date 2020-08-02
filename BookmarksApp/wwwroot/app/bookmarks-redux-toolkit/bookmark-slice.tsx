﻿import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookmarksAppState, TagModelState, BookmarkModel, EditBookmark } from './bookmarks-redux-toolkit';
import { AddOrEditTagResult } from './bookmarks-redux-toolkit';


const initialState: BookmarksAppState = {
    bookmarks: [],
    tags: [],
    searchValue: ''
};

export const sampleState: BookmarksAppState = {
    tags:
        [
            {
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
            }
        ],
    bookmarks:
        [
            { name: 'download', url: 'https://dotnet.microsoft.com/download' },
            { name: 'asp.net', url: 'https://dotnet.microsoft.com/apps/aspnet' },
            { name: 'asp.net core', url: 'https://docs.microsoft.com/es-es/aspnet/core/?view=aspnetcore-2.2' },
            { name: 'react docs', url: 'https://reactjs.org/docs/getting-started.html' }
        ],
    searchValue: ''
};

/**Para tests o carga inicial */
export type SetAllState = {
    newState: BookmarksAppState;
}

export type AddBookmark = {
    tagName: string;
    bookmarkModel: BookmarkModel;
}

export type AddOrEditTagParams = {
    addOrEditTagResult: AddOrEditTagResult;
    parentTagName: string;
}

export type Search = {
    searchValue: string;
}

const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState: initialState,
    reducers: {
        recieveState(state, action: PayloadAction<SetAllState>) {
            state.bookmarks = action.payload.newState.bookmarks;
            state.tags = action.payload.newState.tags;
        },
        addBookmark(state, action: PayloadAction<AddBookmark>) {
            let { tags, bookmarks } = state;
            const { tagName, bookmarkModel } = action.payload;
            let tag = tags.find(x => x.name == tagName);
            tag.bookmarks.push(bookmarkModel.name);
            bookmarks.push(bookmarkModel);    // añadir bookmark
            //tags = tags.map(x => x.name == tag.name ? tag : x); // reeplazar tag (no hace falta por el immer)

            return state;
        },
        addOrEditTag(state, action: PayloadAction<AddOrEditTagParams>) {
            let tags = state.tags;
            const { addOrEditTagResult, parentTagName } = action.payload;
            let tagToAddOrEdit = state.tags.find(x => x.name == addOrEditTagResult.oldName);
            if (tagToAddOrEdit) {  // edit
                tagToAddOrEdit.name = addOrEditTagResult.name;
                tags = tags.map(x => x.name == addOrEditTagResult.oldName ? tagToAddOrEdit : x);

                // en el padre reemplazar el subtag por el nuevo nombre
                let parentTag = state.tags.find(x => x.name == parentTagName);
                if (parentTag) {
                    parentTag.subTags = parentTag.subTags.map(x => x == addOrEditTagResult.oldName ? tagToAddOrEdit.name : x);
                    tags = tags.map(x => x.name == parentTag.name ? parentTag : x);
                }
            } else {
                tagToAddOrEdit = addOrEditTagResult;
                tags.push(tagToAddOrEdit);
                let parentTag = tags.find(x => x.name == parentTagName);
                if (parentTag) {
                    if (!parentTag.subTags) {
                        parentTag.subTags = [];
                    }
                    parentTag.subTags.push(tagToAddOrEdit.name);
                    tags = tags.map(x => x.name == parentTag.name ? parentTag : x);
                }
                else {
                    tagToAddOrEdit.isRoot = true;
                }
            }
            return state;
        },
        editBookmark(state, action: PayloadAction<EditBookmark>) {
            const { oldName, name } = action.payload
            let { bookmarks, tags } = state;

            // reemplazar el bookmar en el estado global
            const bookMarkIndex = bookmarks.findIndex(x => x.name == oldName);
            bookmarks[bookMarkIndex] = action.payload;

            // si cambia el nombre hay que reemplazarlo en el bookmark del tag (si hacen falta id's sino esto se puede liar, o bien que el bookmark tenga el tagname)
            if (name != oldName) {
                const tagWithChangedBookmark = tags.find(x => x.bookmarks.some(bookmarkName => bookmarkName == oldName));
                const bookMarkIndexInTag = tagWithChangedBookmark.bookmarks.findIndex(x => x == oldName);
                tagWithChangedBookmark.bookmarks[bookMarkIndexInTag] = name;
            }
            return state;
        },
        search(state: BookmarksAppState, action: PayloadAction<Search>) {
            const searchText = action.payload.searchValue;
            state.searchValue = searchText;
            const tags = state.tags;
            const bookmarks = state.bookmarks;

            //bookmarks.forEach(bookmark => bookmark.hidden = !hasText(bookmark.name, searchText));
            tags.forEach(tag => tag.hidden = !hasText(tag.name, searchText));
            return state    // TODO:
        }
    }
});

function hasText(text: string, searchText: string) {
    return text.toLowerCase().includes(searchText.toLowerCase());
}

//export function filterTags(tags: TagModelState[], searchText: string) {
//    tags.forEach(tag => {
//        tag.bookmarks.forEach(bookmark => bookmark.hidden = !hasText(bookmark.name, searchText));
//        const anyBookmarkVisible = tag.bookmarks.some(b => !b.hidden);
//        const tagNameHasText = hasText(tag.name, searchText);
//        const anySubTagsVisible = tag.subTags && tag.subTags.some(t => !t.hidden);
//        tag.hidden = !tagNameHasText && !anyBookmarkVisible && !anySubTagsVisible;
//        if (tag.subTags) {
//            filterTags(tag.subTags, searchText);
//        }
//    });
//}

export const {
    addBookmark,
    addOrEditTag,
    editBookmark,
    search,
    recieveState
} = bookmarksSlice.actions;

export default bookmarksSlice.reducer;