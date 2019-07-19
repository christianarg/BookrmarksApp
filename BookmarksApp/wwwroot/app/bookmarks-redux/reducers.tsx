import { initialState, BookmarksAppState } from "./tagsRoot";
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

