import * as React from 'react';
import { BookmarkModel, AddOrEditTagResult, EditBookmark, TagModelState } from "./bookmark-model";
//import { replaceTag, filterTags } from './common';
import { TagSearch } from './tag-search';
import { Tags } from './Tag';
import { AddOrEditTag } from './add-or-edit-tag';
import { connect, MapDispatchToPropsParam } from "react-redux";
import { Action } from 'redux';
import { addBookmark, addOrEditTag, search } from './actions';

export type TagsRootDispatchProps = {
    addOrEditTag: (addOrEditTagResult: AddOrEditTagResult) => void;
    search: (searchValue: string) => void;
}

export type TagsRootStateProps = {
    tags: TagModelState[];
    searachText?: string;
}

export type TagsRootProps = TagsRootStateProps & TagsRootDispatchProps;

export function TagsRoot(props: TagsRootProps) {
    const { tags, search, searachText, addOrEditTag } = props;

    if (tags) {
        return (<div>
            <TagSearch searachText={searachText} onSearchChange={search} />
            <Tags tags={tags} parentTag={null} />
            <AddOrEditTag isRoot={true} onAddOrEdit={(newTag) => addOrEditTag(newTag)} />
        </div>);
    }
    return null;
}

const mapStateToProps = (state: BookmarksAppState): TagsRootStateProps => {
    return {
        tags: state.tags.filter(x => x.isRoot),
        searachText: ''
    };
}

const mapDispatchToProps = (dispatch: React.Dispatch<Action<any>>): TagsRootDispatchProps => {
    return {
        addOrEditTag: (addOrEditTagResult: AddOrEditTagResult) => dispatch(addOrEditTag(addOrEditTagResult, null)),
        search: (searchValue: string) => dispatch(search(searchValue))
    }
}

export const ConnectedTagsRoot = connect(mapStateToProps, mapDispatchToProps)(TagsRoot)

export type BookmarksAppState = {
    bookmarks: BookmarkModel[];
    tags: TagModelState[];
}
