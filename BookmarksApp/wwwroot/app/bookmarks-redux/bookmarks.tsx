import * as React from 'react';
import { BookmarkModel, EditBookmark } from './bookmark-model';
import { AddOrEditBookmark } from "./add-or-edit-bookmark-props";
type BookmarkProps = {
    bookmarks: BookmarkModel[];
    onEdit: (bookrmark: EditBookmark) => void;
};
export function Bookmarks(props: BookmarkProps) {
    const bookmarks = props.bookmarks.map(bookmark => !bookmark.hidden &&
        <li key={bookmark.name} className="bookmark">
            <a href={bookmark.url} target="_blank">{bookmark.name}</a>&nbsp;&nbsp;<AddOrEditBookmark bookmarkToEdit={bookmark} onAddOrEdit={edited => props.onEdit(edited)} />
        </li>);
    return (<ul style={{ listStyleType: 'square' }}>{bookmarks}</ul>);
}
