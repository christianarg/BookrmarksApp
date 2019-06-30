﻿import * as React from 'react';
import { url } from 'inspector';

export type TagModel = {
    name: string;
    subTags?: TagModel[];
    bookmarks: BookmarkModel[];
    hidden?: boolean;
}

export type BookmarkModel = {
    name: string;
    url: string;
    hidden?: boolean;
}

export type EditBookmark = BookmarkModel & { oldName: string };


const ulStyle: React.CSSProperties = { listStyleType: 'none', paddingInlineStart: 0 };

type BookmarkProps = {
    bookmarks: BookmarkModel[];
    onEdit: (bookrmark: EditBookmark) => void;
}

function Bookmarks(props: BookmarkProps) {
    const bookmarks = props.bookmarks.map(bookmark => !bookmark.hidden &&
        <li key={bookmark.name} className="bookmark">
        <a href={bookmark.url} target="_blank" >{bookmark.name}</a>&nbsp;&nbsp;<AddOrEditBookmark bookmarkToEdit={bookmark} onAddOrEdit={edited => props.onEdit(edited)} />
        </li>)
    return (<ul style={{ listStyleType: 'square' }}>{bookmarks}</ul>);
}

type AddOrEditBookmarkProps = { bookmarkToEdit?: BookmarkModel; onAddOrEdit: (newBookmark: EditBookmark) => void };
type AddOrEditBookmarkState = { isFormVisible: boolean, name: string, url: string };

class AddOrEditBookmark extends React.Component<AddOrEditBookmarkProps, AddOrEditBookmarkState>{

    constructor(props) {
        super(props);
        const bookmarkToEdit = this.props.bookmarkToEdit;
        if (bookmarkToEdit) {
            this.state = { isFormVisible: false, name: bookmarkToEdit.name, url: bookmarkToEdit.url };
        }
        else {
            this.state = { isFormVisible: false, name: null, url: null };
        }
    }

    hasValue() {
        const { name, url } = this.state;
        return (name && url);
    }

    handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        const { name, url } = this.state;
        const bookmarkToEdit = this.props.bookmarkToEdit;
        if (name && url) {
            this.props.onAddOrEdit({ name: name, url: url, oldName: bookmarkToEdit && bookmarkToEdit.name });
            this.setState({ isFormVisible: false });
        }
    }

    handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: evt.target.value });
    }

    handleUrlChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ url: evt.target.value });
    }

    toggleShow = () => {
        this.setState({ isFormVisible: !this.state.isFormVisible });
    }

    buttonStyle(): React.CSSProperties {
        if (!this.hasValue()) {
            return { cursor: 'not-allowed' };
        }
        return null;
    }

    render() {
        let bookmarkToEdit = this.props.bookmarkToEdit;
        const idEdit = bookmarkToEdit != null;

        const addOrEditToggleButtonText = bookmarkToEdit ? '(Edit Bookmark)' : '(Add Bookmark)'
        const addOrEdditAcceptButtonText = bookmarkToEdit ? 'Edit' : 'Add';
        const buttonStyle = { display: 'inline-block', textDecoration: 'underline', cursor: 'pointer' };

        if (this.state.isFormVisible) {
            return (
                <div>
                    <div style={buttonStyle} onClick={this.toggleShow}>Close</div>
                    <form onSubmit={this.handleSubmit}>
                        <div>Name: <input type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="Bookmark name..." /></div>
                        <div>Url:  <input type="text" value={this.state.url} onChange={this.handleUrlChange} placeholder="url..." /></div>
                        <button value="Add" style={this.buttonStyle()}>{addOrEdditAcceptButtonText}</button>
                    </form>
                </div>);
        }
        return <div style={buttonStyle} onClick={this.toggleShow}>{addOrEditToggleButtonText}</div>
    }
}


type AddTagProps = { onAdd: (newTag: TagModel) => void };
type AddTagState = { isFormVisible: boolean, name: string };

class AddTag extends React.Component<AddTagProps, AddTagState>{
    state: AddTagState = { isFormVisible: false, name: null };

    hasValue() {
        return this.state.name != null;
    }

    handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        const { name } = this.state;
        if (name) {
            this.props.onAdd({ name: name, bookmarks: [] });
            this.setState({ isFormVisible: false });
        }
    }

    handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: evt.target.value });
    }

    toggleShow = () => {
        this.setState({ isFormVisible: !this.state.isFormVisible });
    }

    buttonStyle(): React.CSSProperties {
        if (!this.hasValue()) {
            return { cursor: 'not-allowed' };
        }
        return null;
    }

    render() {
        const buttonStyle = { display: 'inline-block', textDecoration: 'underline', cursor: 'pointer' };
        if (this.state.isFormVisible) {
            return (
                <div>
                    <div style={buttonStyle} onClick={this.toggleShow}>Close</div>
                    <form onSubmit={this.handleSubmit}>
                        <div>Name: <input type="text" onChange={this.handleNameChange} placeholder="Tag name..." /></div>
                        <button value="Add" style={this.buttonStyle()}>Add</button>
                    </form>
                </div>);
        }
        return <div style={buttonStyle} onClick={this.toggleShow}>(Add Tag)</div>
    }
}

type TagProps = {
    tag: TagModel;
    onAddBookmark: (tag: TagModel, bookmark: BookmarkModel) => void;
    onEditBookmark: (tag: TagModel, bookmark: EditBookmark) => void;
    onAddTag: (newTag: TagModel, parentTag: TagModel) => void;
}

function Tag(props: TagProps) {
    const tag = props.tag;
    if (tag.hidden) {
        return null;
    }

    return (

        <li className="tag">
            <fieldset>
                <legend>Tag: {tag.name}</legend>
                <div>Bookmarks:</div>
                <Bookmarks onEdit={bookmark => props.onEditBookmark(tag, bookmark)} bookmarks={tag.bookmarks} />

                {tag.subTags &&
                    <>
                    <div>SubTags:</div>
                    <Tags tags={tag.subTags} onEditBookmark={props.onEditBookmark} onAddBookmark={props.onAddBookmark} onAddTag={props.onAddTag} />
                    </>}
                <AddOrEditBookmark onAddOrEdit={(newBookmark) => props.onAddBookmark({ ...tag }, newBookmark)} />
                <AddTag key={`add${tag.name}`} onAdd={(newTag) => props.onAddTag(newTag, tag)} />
            </fieldset>
        </li>);
}


type TagsProps = {
    tags: TagModel[];
    onAddBookmark: (tag: TagModel, bookmark: BookmarkModel) => void;
    onEditBookmark: (tag: TagModel, bookmark: EditBookmark) => void;
    onAddTag: (newTag: TagModel, parentTag: TagModel) => void;
}

function Tags(props: TagsProps) {
    const tags = props.tags;
    const tagItems = tags.map(tag => <Tag key={tag.name} tag={tag} onEditBookmark={props.onEditBookmark} onAddBookmark={props.onAddBookmark} onAddTag={props.onAddTag} />);
    return (
        <ul style={ulStyle}>{tagItems}</ul>
    );
}


type TagSearchProps = {
    searachText: string;
    onSearchChange: (value: string) => void;
}

function TagSearch(props: TagSearchProps) {
    const { searachText, onSearchChange } = props;
    return (<div><input type="text" placeholder="Search tags..." value={searachText} onChange={(evt) => onSearchChange(evt.target.value)} /></div>)
}


function hasText(text: string, searchText: string) {
    return text.toLowerCase().includes(searchText.toLowerCase());
}

export function filterTags(tags: TagModel[], searchText: string) {
    tags.forEach(tag => {
        tag.bookmarks.forEach(bookmark => bookmark.hidden = !hasText(bookmark.name, searchText));
        const anyBookmarkVisible = tag.bookmarks.some(b => !b.hidden);
        const tagNameHasText = hasText(tag.name, searchText);
        const anySubTagsVisible = tag.subTags && tag.subTags.some(t => !t.hidden);
        tag.hidden = !tagNameHasText && !anyBookmarkVisible && !anySubTagsVisible;
        if (tag.subTags) {
            filterTags(tag.subTags, searchText);
        }
    });
}

export function replaceTag(tags: TagModel[], newTag: TagModel): TagModel[] {
    const newTags = tags.map(tag => tag.name == newTag.name ? newTag : tag);

    newTags.forEach(tag => {
        if (tag.subTags) {
            tag.subTags = replaceTag(tag.subTags, newTag);
        }
    });
    return newTags;
}

type TagsRootState = {
    tags: TagModel[];
    searachText: string;
}

export class TagsRoot extends React.Component<{}, TagsRootState> {

    state: TagsRootState = { tags: null, searachText: '' }

    componentDidMount() {
        this.setState({ tags: sampleBookrmarks.slice() });
    }

    handleSearch = (searchValue: string) => {
        const tags = this.state.tags.slice();
        filterTags(tags, searchValue);
        this.setState({ tags: tags, searachText: searchValue });
    }

    handleAddBookmark = (tag: TagModel, bookmarkModel: BookmarkModel) => {
        let tags = this.state.tags.slice();
        tag.bookmarks.push(bookmarkModel);

        tags = replaceTag(tags, tag);
        this.setState({ tags: tags });
    }

    handleAddTag = (newTag: TagModel, parentTag: TagModel) => {
        let tags = this.state.tags.slice();
        if (parentTag) {
            if (parentTag.subTags == null)
                parentTag.subTags = [];

            parentTag.subTags.push(newTag);
            replaceTag(tags, { ...parentTag });
        }
        else {
            // sin parent
            tags.push(newTag);
        }
        this.setState({ tags: tags });
    }

    handleEditBookmark = (tag: TagModel, editedBookmark: EditBookmark) => {
        let tags = this.state.tags.slice();
        // replace bookmark
        tag.bookmarks = tag.bookmarks.map(x => x.name == editedBookmark.oldName ? editedBookmark : x);

        tags = replaceTag(tags, tag);
        this.setState({ tags: tags });
    }

    render() {
        if (this.state.tags) {
            return (
                <div>
                    <TagSearch searachText={this.state.searachText} onSearchChange={this.handleSearch} />
                    <Tags tags={this.state.tags} onEditBookmark={this.handleEditBookmark} onAddBookmark={this.handleAddBookmark} onAddTag={this.handleAddTag} />
                    <AddTag onAdd={(newTag) => this.handleAddTag(newTag, null)} />
                </div>);
        }
        return null;
    }
}

export const sampleBookrmarks: TagModel[] = [
    {
        name: '.Net',
        bookmarks: [
            { name: 'download', url: 'https://dotnet.microsoft.com/download' }
        ],
        subTags: [
            {
                name: 'Asp.net',
                bookmarks: [
                    { name: 'asp.net', url: 'https://dotnet.microsoft.com/apps/aspnet' },
                    { name: 'asp.net core', url: 'https://docs.microsoft.com/es-es/aspnet/core/?view=aspnetcore-2.2' },
                ],
            }
        ]
    },
    {
        name: 'React',
        bookmarks: [
            { name: 'react docs', url: 'https://reactjs.org/docs/getting-started.html' }
        ]
    }
]