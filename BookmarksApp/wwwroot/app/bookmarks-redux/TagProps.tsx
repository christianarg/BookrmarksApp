import * as React from 'react';
import { BookmarkModel, TagModel, EditBookmark } from './bookmark-model';
import { Bookmarks } from './bookmarks';
import { AddOrEditBookmark } from './add-or-edit-bookmark-props';
import { AddOrEditTag } from './AddTagProps';
import { Tags } from "./Tags";

type TagProps = {
    parentTag: TagModel;
    tag: TagModel;
    onAddBookmark: (tag: TagModel, bookmark: BookmarkModel) => void;
    onEditBookmark: (tag: TagModel, bookmark: EditBookmark) => void;
    onAddTag: (newTag: TagModel, parentTag: TagModel) => void;
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
            <Bookmarks onEdit={bookmark => props.onEditBookmark(tag, bookmark)} bookmarks={tag.bookmarks} />

            {tag.subTags &&
                <>
                    <div>SubTags:</div>
                    <Tags tags={tag.subTags} parentTag={tag} onEditBookmark={props.onEditBookmark} onAddBookmark={props.onAddBookmark} onAddTag={props.onAddTag} />
                </>}
            <AddOrEditBookmark onAddOrEdit={(newBookmark) => props.onAddBookmark({ ...tag }, newBookmark)} />
            <AddOrEditTag key={`add${tag.name}`} onAddOrEdit={(newTag) => props.onAddTag(newTag, tag)} />
            <AddOrEditTag key={`edit{tag.name}`} tagToEdit={tag} onAddOrEdit={(newTag) => props.onAddTag(newTag, props.parentTag)} />
        </fieldset>
    </li>);
}
