﻿import { BookmarksAppState } from "./tagsRoot";
import { BookmarkActionTypes, ADD_BOOKMARK, ADD_OR_EDIT_TAG } from "./actions";
import { TagModelState } from "./bookmark-model";

export function bookmarkApp(state: BookmarksAppState, action: BookmarkActionTypes): BookmarksAppState {
    if (state == null) {
        return initialState;
    }
    switch (action.type) {
        case ADD_BOOKMARK:

            let tag = state.tags.find(x => x.name == action.tagName);
            tag = { ...tag };
            tag.bookmarks = tag.bookmarks.concat(action.bookmarkModel.name);
            return {
                ...state,
                bookmarks: state.bookmarks.concat(action.bookmarkModel),    // añadir bookmark
                tags: state.tags.map(x => x.name == tag.name ? tag : x) // reeplazar tag
            };

        case ADD_OR_EDIT_TAG:

            let tags: TagModelState[];
            let tagToAddOrEdit = state.tags.find(x => x.name == action.addOrEditTagResult.oldName);
            if (tagToAddOrEdit) {  // edit
                tagToAddOrEdit = { ...tagToAddOrEdit };
                tagToAddOrEdit.name = action.addOrEditTagResult.name;
                tagToAddOrEdit = state.tags.map(x => x.name == action.addOrEditTagResult.oldName ? tagToAddOrEdit : x) as any;
            } else {
                tagToAddOrEdit = { ...action.addOrEditTagResult };
                tags = state.tags.concat(tagToAddOrEdit);
                let parentTag = state.tags.find(x => x.name == action.parentTagName);
                parentTag = { ...parentTag };
                if (!parentTag.subTags) {
                    parentTag.subTags = [];
                }
                parentTag.subTags = parentTag.subTags.concat(tagToAddOrEdit.name);
                tags = replaceTag(tags, parentTag);
            }
            return {
                ...state,
                bookmarks: state.bookmarks,
                tags: tags
            };

        default:
            throw 'Action desconocida';

    }
}

function replaceTag(tags: TagModelState[], tag: TagModelState): TagModelState[] {
    return tags.map(x => x.name == tag.name ? tag : x);
}

export const initialState: BookmarksAppState = {
    tags: [{
        name: '.Net',
        bookmarks: ['download'],
        subTags: ['Asp.net']
    },
    {
        name: 'Asp.net',
        bookmarks: ['asp.net', 'asp.net core']
    },
    {
        name: 'React',
        bookmarks: ['react docs']
    }],
    bookmarks: [
        { name: 'download', url: 'https://dotnet.microsoft.com/download' },
        { name: 'asp.net', url: 'https://dotnet.microsoft.com/apps/aspnet' },
        { name: 'asp.net core', url: 'https://docs.microsoft.com/es-es/aspnet/core/?view=aspnetcore-2.2' },
        { name: 'react docs', url: 'https://reactjs.org/docs/getting-started.html' }
    ]

};