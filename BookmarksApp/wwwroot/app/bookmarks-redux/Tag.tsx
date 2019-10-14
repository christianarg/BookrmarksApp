import * as React from 'react';
import { BookmarkModel, TagModelState, EditBookmark } from './bookmark-model';
import { Bookmarks } from './bookmarks';
import { AddOrEditBookmark } from './add-or-edit-bookmark-props';
import { AddOrEditTag } from './add-or-edit-tag';
import { ulStyle } from './common';
import { connect } from 'react-redux';
import { BookmarksAppState } from './tagsRoot';
import { Action } from 'redux';
import { addBookmark } from './actions';



type TagProps = {
    parentTag: TagModelState;
    tag: TagModelState;
    subTags?: TagModelState[];
    bookmarks: BookmarkModel[];
    addBookmark: (bookmarkModel: BookmarkModel, tagName: string) => void;

    onEditBookmark: (tag: TagModelState, bookmark: EditBookmark) => void;
    onAddTag: (newTag: TagModelState, parentTag: TagModelState) => void;
};

export function Tag(props: TagProps) {
    const { tag, bookmarks } = props;
    if (tag.hidden) {
        return null;
    }
    return (<li className="tag">
        <fieldset>
            <legend>Tag: {tag.name}</legend>
            <div>Bookmarks:</div>
            {<Bookmarks onEdit={bookmark => props.onEditBookmark(tag, bookmark)} bookmarks={props.bookmarks} />}

            {tag.subTags &&
                <>
                    <div>SubTags:</div>
                    <Tags tags={props.subTags} parentTag={tag} />
                </>}
            <AddOrEditBookmark onAddOrEdit={(newBookmark) => props.addBookmark(newBookmark, tag.name)} />
            <AddOrEditTag key={`add${tag.name}`} onAddOrEdit={(newTag) => props.onAddTag(newTag, tag)} />
            <AddOrEditTag key={`edit{tag.name}`} tagToEdit={tag} onAddOrEdit={(newTag) => props.onAddTag(newTag, props.parentTag)} />
        </fieldset>
    </li>);
}

const bookmarksById = (bookmarkIds: string[], allBookmarks: BookmarkModel[]) => {
    return allBookmarks.filter(bookmark => bookmarkIds.some(x => x == bookmark.name));
}

const tagByName = (tagName: string, tags: TagModelState[]) => {
    return tags.find(x => x.name == tagName);
}

const mapStateToProps = (state: BookmarksAppState, ownProps: ConnectedTagProps) => {
    const tag = tagByName(ownProps.tagName, state.tags);
    return ({
        tag: tag,
        bookmarks: bookmarksById(tag.bookmarks, state.bookmarks)
    })
};

const mapDispatchToProps = (dispatch: React.Dispatch<Action<any>>) => {
    return {
        addBookmark: (bookmarkModel: BookmarkModel, tagName: string) => dispatch(addBookmark(bookmarkModel, tagName))
    }
}
type ConnectedTagProps = {
    parentTagName: string;
    tagName: string;
}

export const ConnectedTag: React.ComponentClass<ConnectedTagProps> = connect(mapStateToProps, mapDispatchToProps)(Tag);


type TagsProps = {
    parentTag: TagModelState;
    tags: TagModelState[];
};

export function Tags(props: TagsProps) {
    const { tags, parentTag } = props;
    if (tags) {
        const parentTagName = parentTag && parentTag.name;
        const tagItems = tags.map(tag => <ConnectedTag key={tag.name} parentTagName={parentTagName} tagName={tag.name} />);
        return (<ul style={ulStyle}>{tagItems}</ul>);
    }
    return null;
}

