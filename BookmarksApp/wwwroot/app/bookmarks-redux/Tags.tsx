import * as React from 'react';
import { BookmarkModel, TagModel, EditBookmark } from './bookmark-model';
import { ulStyle } from './common';
import { Tag } from './TagProps';
type TagsProps = {
    parentTag: TagModel;
    tags: TagModel[];
    onAddBookmark: (tag: TagModel, bookmark: BookmarkModel) => void;
    onEditBookmark: (tag: TagModel, bookmark: EditBookmark) => void;
    onAddTag: (newTag: TagModel, parentTag: TagModel) => void;
};
export function Tags(props: TagsProps) {
    const { tags, parentTag } = props;
    const tagItems = tags.map(tag => <Tag key={tag.name} parentTag={parentTag} tag={tag} onEditBookmark={props.onEditBookmark} onAddBookmark={props.onAddBookmark} onAddTag={props.onAddTag} />);
    return (<ul style={ulStyle}>{tagItems}</ul>);
}
