import * as React from 'react';
import { BookmarkModel, AddOrEditTagResult, EditBookmark, TagModelState } from "./bookmark-model";
//import { replaceTag, filterTags } from './common';
import { TagSearch } from './TagSearchProps';
import { Tags } from './Tag';
import { AddOrEditTag } from './add-or-edit-tag';
import { connect, MapDispatchToPropsParam } from "react-redux";
import { Action } from 'redux';
import { addBookmark } from './actions';

export type TagsRootProps = {
    tags: TagModelState[];
    searachText?: string;
}

export class TagsRoot extends React.Component<TagsRootProps> {

    handleSearch = (searchValue: string) => {

    };

    handleAddOrEditTag = (addOrEditTagResult: AddOrEditTagResult, parentTag: TagModelState) => {
    
    };
    
    render() {
        if (this.props.tags) {
            return (<div>
                <TagSearch searachText={this.props.searachText} onSearchChange={this.handleSearch} />
                <Tags tags={this.props.tags} parentTag={null} />
                <AddOrEditTag isRoot={true} onAddOrEdit={(newTag) => this.handleAddOrEditTag(newTag, null)} />
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

//const mapDispatchToProps = (dispatch: React.Dispatch<Action<any>>) => {
//    return {
//        addBookmark: (bookmarkModel: BookmarkModel, tagName: string) => dispatch(addBookmark(bookmarkModel, tagName))
//    }
//}

export const ConnectedTagsRoot = connect(mapStateToProps)(TagsRoot)

export type BookmarksAppState = {
    bookmarks: BookmarkModel[];
    tags: TagModelState[];
}
