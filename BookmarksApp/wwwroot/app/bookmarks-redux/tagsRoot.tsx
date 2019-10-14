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
    addBookmark: (bookmarkModel: BookmarkModel, tagName: string) => void;
}

export class TagsRoot extends React.Component<TagsRootProps> {

    handleSearch = (searchValue: string) => {
        //const tags = this.props.tags.slice();
        //filterTags(tags, searchValue);
        //this.setState({ tags: tags, searachText: searchValue });
    };

    handleAddBookmark = (tag: TagModelState, bookmarkModel: BookmarkModel) => {
        //let tags = this.props.tags.slice();
        //tag.bookmarks.push(bookmarkModel);
        //tags = replaceTag(tags, tag);
        //this.setState({ tags: tags });
    };

    handleAddOrEditTag = (addOrEditTagResult: AddOrEditTagResult, parentTag: TagModelState) => {
        //let tags = this.props.tags.slice();
        //if (parentTag) {
        //    if (parentTag.subTags == null)
        //        parentTag.subTags = [];
        //    if (addOrEditTagResult.oldName) {
        //        // replace
        //        parentTag.subTags = parentTag.subTags.map(x => x.name == addOrEditTagResult.oldName ? addOrEditTagResult : x);
        //    }
        //    else {
        //        // new
        //        parentTag.subTags.push(addOrEditTagResult);
        //    }
        //    replaceTag(tags, { ...parentTag });
        //}
        //else {
        //    // sin parent
        //    if (addOrEditTagResult.oldName) {
        //        // replace
        //        tags = tags.map(x => x.name == addOrEditTagResult.oldName ? addOrEditTagResult : x);
        //    }
        //    else {
        //        // new
        //        tags.push(addOrEditTagResult);
        //    }
        //}
        //this.setState({ tags: tags });
    };
    handleEditBookmark = (tag: TagModelState, editedBookmark: EditBookmark) => {
        //let tags = this.props.tags.slice();
        //// replace bookmark
        //tag.bookmarks = tag.bookmarks.map(x => x.name == editedBookmark.oldName ? editedBookmark : x);
        //tags = replaceTag(tags, tag);
        //this.setState({ tags: tags });
    };
    render() {
        if (this.props.tags) {
            return (<div>
                <TagSearch searachText={this.props.searachText} onSearchChange={this.handleSearch} />
                <Tags tags={this.props.tags} parentTag={null} onEditBookmark={this.handleEditBookmark} onAddBookmark={this.handleAddBookmark} onAddTag={this.handleAddOrEditTag} />
                <AddOrEditTag isRoot={true} onAddOrEdit={(newTag) => this.handleAddOrEditTag(newTag, null)} />
            </div>);
        }
        return null;
    }
}


const mapStateToProps = (state: BookmarksAppState) => {
    return {
        tags: state.tags,
        searachText: ''
    };
}

export const ConnectedTagsRoot = connect(mapStateToProps)(TagsRoot)

export type BookmarksAppState = {
    bookmarks: BookmarkModel[];
    tags: TagModelState[];
}
