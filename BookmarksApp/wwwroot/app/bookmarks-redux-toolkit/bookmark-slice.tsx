import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookmarksAppState, TagModelState, BookmarkModel, EditBookmark } from '../bookmarks-redux/bookmarks-redux';
import { AddOrEditTagResult } from './bookmarks-redux-toolkit';


const initialState: BookmarksAppState = {
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
        ]

};

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
            const { oldName } = action.payload
            let bookmarks = state.bookmarks;
            // reemplazar // TODO NO VA
            const bookMarkIndex = bookmarks.findIndex(x => x.name == oldName);
            bookmarks[bookMarkIndex] = action.payload;
            return state;
        },
        search(state: BookmarksAppState, action: PayloadAction<Search>) {
            return state    // TODO:
        }
    }
});

export const {
    addBookmark,
    addOrEditTag,
    editBookmark,
    search
} = bookmarksSlice.actions;

export default bookmarksSlice.reducer;