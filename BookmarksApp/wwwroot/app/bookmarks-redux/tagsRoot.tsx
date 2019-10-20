import * as React from 'react';
import { BookmarkModel, AddOrEditTagResult, EditBookmark, TagModelState } from "./bookmark-model";
//import { replaceTag, filterTags } from './common';
import { TagSearch } from './tag-search';
import { Tags } from './Tag';
import { AddOrEditTag } from './add-or-edit-tag';
import { connect, MapDispatchToPropsParam } from "react-redux";
import { Action } from 'redux';
import { addBookmark, addOrEditTag } from './actions';

export type TagsRootProps = {
    tags: TagModelState[];
    searachText?: string;
    addOrEditTag: (addOrEditTagResult: AddOrEditTagResult) => void;
}

export class TagsRoot extends React.Component<TagsRootProps> {

    handleSearch = (searchValue: string) => {

    };
    render() {
        if (this.props.tags) {
            return (<div>
                <TagSearch searachText={this.props.searachText} onSearchChange={this.handleSearch} />
                <Tags tags={this.props.tags} parentTag={null} />
                <AddOrEditTag isRoot={true} onAddOrEdit={(newTag) => this.props.addOrEditTag(newTag)} />
            </div>);
        }
        return null;
    }
}


const mapStateToProps = (state: BookmarksAppState) => {
    return {
        tags: state.tags.filter(x => x.isRoot),
        searachText: ''
    };
}

const mapDispatchToProps = (dispatch: React.Dispatch<Action<any>>) => {
    return {
        addOrEditTag: (addOrEditTagResult: AddOrEditTagResult) => dispatch(addOrEditTag(addOrEditTagResult, null))
    }
}

export const ConnectedTagsRoot = connect(mapStateToProps, mapDispatchToProps)(TagsRoot)

export type BookmarksAppState = {
    bookmarks: BookmarkModel[];
    tags: TagModelState[];
}
