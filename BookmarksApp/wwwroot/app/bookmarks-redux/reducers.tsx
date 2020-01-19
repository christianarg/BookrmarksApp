import { BookmarksAppState, TagModelState } from "./bookmarks-redux";
import { BookmarkActionTypes, ADD_BOOKMARK, ADD_OR_EDIT_TAG, SEARCH } from "./actions";

export function bookmarkApp(state: BookmarksAppState, action: BookmarkActionTypes): BookmarksAppState {
    if (state == null) {
        return initialState;
    }
    switch (action.type) {
        case SEARCH:

            return { ...state }
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
                tags = state.tags.slice(0);
                tagToAddOrEdit.name = action.addOrEditTagResult.name;

                tags = tags.map(x => x.name == action.addOrEditTagResult.oldName ? tagToAddOrEdit : x);

                // en el padre reemplazar el subtag por el nuevo nombre
                let parentTag = state.tags.find(x => x.name == action.parentTagName);
                if (parentTag) {
                    parentTag = { ...parentTag };
                    parentTag.subTags = parentTag.subTags.map(x => x == action.addOrEditTagResult.oldName ? tagToAddOrEdit.name : x);
                    tags = tags.map(x => x.name == parentTag.name ? parentTag: x);
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