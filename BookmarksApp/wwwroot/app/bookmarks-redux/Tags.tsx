import * as React from 'react';
import { BookmarkModel, TagModelState, EditBookmark } from './bookmark-model';
import { ulStyle } from './common';
import { Tag } from './TagProps';

type TagsProps = {
    parentTag: TagModelState;
    tags: TagModelState[];
    onAddBookmark: (tag: TagModelState, bookmark: BookmarkModel) => void;
    onEditBookmark: (tag: TagModelState, bookmark: EditBookmark) => void;
    onAddTag: (newTag: TagModelState, parentTag: TagModelState) => void;
};

export function Tags(props: TagsProps) {
    const { tags, parentTag } = props;
    const tagItems = tags.map(tag => <Tag key={tag.name} parentTag={parentTag} tag={tag} onEditBookmark={props.onEditBookmark} onAddBookmark={props.onAddBookmark} onAddTag={props.onAddTag} />);
    return (<ul style={ulStyle}>{tagItems}</ul>);
}
