import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookmarksAppState, TagModelState, BookmarkModel } from '../bookmarks-redux/bookmarks-redux';



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
    ]

};

export type AddBookmark = {
    tagName: string;
    bookmarkModel: BookmarkModel;
}

function addBookmark(state: BookmarksAppState, action) {
    let { tags, bookmarks } = state;
    let tag = tags.find(x => x.name == action.tagName);
    tag.bookmarks.push(action.bookmarkModel);
    bookmarks.push(action.bookmarkModel);    // añadir bookmark
    tags = tags.map(x => x.name == tag.name ? tag : x); // reeplazar tag
    
    return state;
}

function addOrEditTag(state) {
    return state;
}


createSlice<BookmarksAppState, {}>({
    name: 'bookmarks',
    initialState: initialState,
    reducers: {
        ADD_BOOKMARK: addBookmark,
        ADD_OR_EDIT_TAG: addOrEditTag
    }
});

function replaceTag(tags: TagModelState[], tag: TagModelState): TagModelState[] {
    return tags.map(x => x.name == tag.name ? tag : x);
}
