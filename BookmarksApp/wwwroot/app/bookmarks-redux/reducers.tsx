import { BookmarksAppState } from "./tagsRoot";
import { BookmarkActionTypes, ADD_BOOKMARK } from "./actions";

export function bookmarkApp(state: BookmarksAppState, action: BookmarkActionTypes): BookmarksAppState {
    if (state == null) {
        return initialState;
    }
    switch (action.type) {
        case ADD_BOOKMARK:
            const tag = state.tags.find(x => x.name == action.tagName);
            tag.bookmarks.concat(action.bookmarkModel.name);
            return {
                ...state,
                bookmarks: state.bookmarks.concat(action.bookmarkModel),    // añadir bookmark
                tags: state.tags.map(x => x.name == tag.name ? tag : x) // reeplazar tag
            }
        default:
            throw 'Action desconocida';

    }
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