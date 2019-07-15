import { initialState, BookmarksAppState } from "./index";
import { BookmarkActionTypes, ADD_BOOKMARK } from "./actions";

export function bookmarkApp(state: BookmarksAppState, action: BookmarkActionTypes): BookmarksAppState {
    if (state == null) {
        return initialState;
    }
    switch (action.type) {
        case ADD_BOOKMARK:
            return { ...state, bookmarks: { ...state.bookmarks, { action. }
    }
            break;
        default:
            throw 'Action desconocida';
    }
}

