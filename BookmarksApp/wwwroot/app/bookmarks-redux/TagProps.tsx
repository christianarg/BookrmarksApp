import * as React from 'react';
import { BookmarkModel, TagModelState, EditBookmark } from './bookmark-model';
import { Bookmarks } from './bookmarks';
import { AddOrEditBookmark } from './add-or-edit-bookmark-props';
import { AddOrEditTag } from './AddTagProps';
import { Tags } from "./Tags";
import { connect } from 'react-redux';
import { BookmarksAppState } from './tagsRoot';

type TagProps = {
    parentTag: TagModelState;
    tag: TagModelState;
    subTags?: TagModelState[];
    bookmarks: BookmarkModel[];
    onAddBookmark: (tag: TagModelState, bookmark: BookmarkModel) => void;
    onEditBookmark: (tag: TagModelState, bookmark: EditBookmark) => void;
    onAddTag: (newTag: TagModelState, parentTag: TagModelState) => void;
};

export function Tag(props: TagProps) {
    const tag = props.tag;
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
                    <Tags tags={props.subTags} parentTag={tag} onEditBookmark={props.onEditBookmark} onAddBookmark={props.onAddBookmark} onAddTag={props.onAddTag} />
                </>}
            <AddOrEditBookmark onAddOrEdit={(newBookmark) => props.onAddBookmark({ ...tag }, newBookmark)} />
            <AddOrEditTag key={`add${tag.name}`} onAddOrEdit={(newTag) => props.onAddTag(newTag, tag)} />
            <AddOrEditTag key={`edit{tag.name}`} tagToEdit={tag} onAddOrEdit={(newTag) => props.onAddTag(newTag, props.parentTag)} />
        </fieldset>
    </li>);
}

const bookmarksById = (bookmarkIds: string[], allBookmarks: BookmarkModel[]) => {
    return allBookmarks.filter(bookmark => bookmarkIds.some(x => x == bookmark.name));
}

const mapStateToProps = (state: BookmarksAppState, ownProps: TagProps) => ({
    bookmarks: bookmarksById(ownProps.tag.bookmarks, state.bookmarks)
});

connect(mapStateToProps, null)(Tag);