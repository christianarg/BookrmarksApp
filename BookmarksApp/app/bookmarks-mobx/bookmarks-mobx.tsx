﻿import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import * as React from 'react';
import { BookmarkModel, EditBookmark, TagModel, AddOrEditTagResult } from './model-mobx';
import { StoreContext } from './app';
import { useContext } from 'react';

const ulStyle: React.CSSProperties = { listStyleType: 'none', paddingInlineStart: 0 };

// BookmarkComponent

type BookmarkProps = {
    bookmarks: BookmarkModel[];
}

const Bookmarks = observer((props: BookmarkProps) => {
    const bookmarks = props.bookmarks.map(bookmark => !bookmark.hidden &&
        <li key={bookmark.name} className="bookmark">
            <BookmarkComponent bookmark={bookmark} />
        </li>)
    return (<ul style={{ listStyleType: 'square' }}>{bookmarks}</ul>);
});

// AddOrEditBookmarkComponent

type BookmarkComponentProps = { bookmark?: BookmarkModel };

const BookmarkComponent = observer((props: BookmarkComponentProps) => {
    const store = useContext(StoreContext);

    const onEdit = (editBookmark: BookmarkModel) => {
        store.editBookmark(props.bookmark, editBookmark);
    }

    let bookmark = props.bookmark;
    return <><a href={bookmark.url} target="_blank" >{bookmark.name}</a>&nbsp;&nbsp;<AddOrEditBookmark name={bookmark.name} url={bookmark.url} isEdit={true} onAddOrEdit={onEdit} /></>
});

// AddOrEditBookmarkComponent

type AddOrEditBookmarkProps = { name?: string, url?: string; isEdit: boolean; onAddOrEdit: (newBookmark: EditBookmark) => void };
type AddOrEditBookmarkState = { isFormVisible: boolean, name: string, url: string };

class AddOrEditBookmark extends React.Component<AddOrEditBookmarkProps, AddOrEditBookmarkState>{

    constructor(props) {
        super(props);
        const bookmarkToEdit = this.props.isEdit;
        if (bookmarkToEdit) {
            this.state = { isFormVisible: false, name: props.name ?? '', url: props.url ?? '' };
        }
        else {
            this.state = { isFormVisible: false, name: '', url: '' };
        }
    }

    hasValue() {
        const { name, url } = this.state;
        return (name && url);
    }

    handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        const { name, url } = this.state;
        const bookmarkToEdit = this.props.isEdit;
        if (name && url) {
            this.props.onAddOrEdit({ name: name, url: url, oldName: bookmarkToEdit && this.props.name });
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

        const addOrEditToggleButtonText = this.props.isEdit ? '(Edit Bookmark)' : '(Add Bookmark)'
        const addOrEdditAcceptButtonText = this.props.isEdit ? 'Edit' : 'Add';
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

// AddOrEditTagComponent

type AddTagProps = {
    isRoot?: boolean;
    tagToEdit?: TagModel;
    onAddOrEdit: (newTag: AddOrEditTagResult) => void;
};

type AddTagState = { isFormVisible: boolean, name: string };

class AddOrEditTag extends React.Component<AddTagProps, AddTagState>{
    constructor(props) {
        super(props);

        const tagToEdit = this.props.tagToEdit;
        this.state = { isFormVisible: false, name: tagToEdit ? tagToEdit.name : '' };
    }

    hasValue() {
        return this.state.name != null;
    }

    handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        const { name } = this.state;
        const tagToEdit = this.props.tagToEdit;
        if (name) {
            if (tagToEdit) {
                const editTagResult: AddOrEditTagResult = { ...tagToEdit, oldName: tagToEdit.name };
                editTagResult.name = name;
                this.props.onAddOrEdit(editTagResult);

            } else {
                this.props.onAddOrEdit({ name: name, bookmarks: [] });
            }
            this.setState({ isFormVisible: false, name: '' });
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
        const { isRoot, tagToEdit } = this.props;
        const toggleAddButtonText = isRoot ? '(Add Tags)' : tagToEdit ? '(Edit Tag)' : '(Add SubTags)';
        const acceptText = tagToEdit ? 'Edit' : 'Add';
        if (this.state.isFormVisible) {
            return (
                <div>
                    <div style={buttonStyle} onClick={this.toggleShow}>Close</div>
                    <form onSubmit={this.handleSubmit}>
                        <div>Name: <input type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="Tag name..." /></div>
                        <button value="Add" style={this.buttonStyle()}>{acceptText}</button>
                    </form>
                </div>);
        }
        return <div style={buttonStyle} onClick={this.toggleShow}>{toggleAddButtonText}</div>
    }
}


// **TagComponent**

type TagProps = {
    parentTag: TagModel;
    tag: TagModel;
}

const Tag = observer((props: TagProps) => {
    const store = useContext(StoreContext);

    const tag = props.tag;
    if (tag.hidden) {
        return null;
    }

    const onAddBookmark = (bookmark: EditBookmark) => {
        store.addBookmark(tag, bookmark);
    }

    const addSubTag = (subTag: TagModel) => {
        store.addTag(tag, subTag);
    }

    const editTag = (editTag: TagModel) => {
        store.editTag(tag, editTag);
    }

    return (

        <li className="tag">
            <fieldset>
                <legend>Tag: {tag.name}</legend>
                <div>Bookmarks:</div>
                <Bookmarks bookmarks={tag.bookmarks} />

                {tag.subTags &&
                    <>
                        <div>SubTags:</div>
                        <Tags tags={tag.subTags} parentTag={tag} />
                    </>}
                <AddOrEditBookmark isEdit={false} onAddOrEdit={onAddBookmark} />
                <AddOrEditTag key={`add${tag.name}`} onAddOrEdit={toJS(addSubTag)} />
                <AddOrEditTag key={`edit{tag.name}`} tagToEdit={tag} onAddOrEdit={toJS(editTag)} />
            </fieldset>
        </li>);
});

// **TagsComponent**

type TagsProps = {
    parentTag: TagModel;
    tags: TagModel[];
}

const Tags =  observer((props: TagsProps) => {
    const { tags, parentTag } = props;
    const tagItems = tags.map(tag => <Tag key={tag.name} parentTag={parentTag} tag={tag} />);
    return (
        <ul style={ulStyle}>{tagItems}</ul>
    );
});

// **TagSearchComponent**

type TagSearchProps = {
    searachText: string;
    onSearchChange: (value: string) => void;
}

function TagSearch(props: TagSearchProps) {
    const { searachText, onSearchChange } = props;
    return (<div><input type="text" placeholder="Search tags..." value={searachText} onChange={(evt) => onSearchChange(evt.target.value)} /></div>)
}

// **TagsRootComponent**


export const TagsRoot = observer(() => {
    const store = useContext(StoreContext);

    const onSearch = (searchValue: string) => {
        store.search(searchValue);
    };

    return (<div>
        <TagSearch searachText={store.searchText} onSearchChange={onSearch} />
        <Tags tags={store.filteredTags} parentTag={null} />
        <AddOrEditTag isRoot={true} onAddOrEdit={(newTag) => store.addTag(null, newTag)} />
    </div>)
});