import * as React from 'react';
import { connect, MapDispatchToPropsParam } from "react-redux";
import { Action } from 'redux';
import { addBookmark, addOrEditTag, editBookmark, search, AddBookmark, AddOrEditTagParams } from './bookmark-slice'

// **Models**
export type BookmarksAppState = {
    bookmarks: BookmarkModel[];
    tags: TagModelState[];
}

export type BookmarkModel = {
    name: string;
    url: string;
    hidden?: boolean;
};

export type TagModelState = {
    name: string;
    isRoot?: boolean;
    subTags?: string[];
    bookmarks: string[];
    hidden?: boolean;
}

export type AddOrEditTagResult = TagModelState & { oldName?: string; }

export type EditBookmark = BookmarkModel & { oldName: string };

// **BookmarkComponent**

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

// **AddOrEditBookmarkComponent**

type AddOrEditBookmarkProps = {
    bookmarkToEdit?: BookmarkModel;
    onAddOrEdit: (newBookmark: EditBookmark) => void;
};

type AddOrEditBookmarkState = {
    isFormVisible: boolean;
    name: string;
    url: string;
};

export class AddOrEditBookmark extends React.Component<AddOrEditBookmarkProps, AddOrEditBookmarkState> {

    state: AddOrEditBookmarkState = { isFormVisible: false, name: "", url: "" };

    componentDidMount() {
        this.updateFormWithBookmark();
    }

    componentDidUpdate(prevProps: AddOrEditBookmarkProps) {
        if (prevProps.bookmarkToEdit != this.props.bookmarkToEdit) {
            this.updateFormWithBookmark();
        }
    }

    updateFormWithBookmark() {
        const bookmarkToEdit = this.props.bookmarkToEdit;
        if (bookmarkToEdit) {
            this.setState({ name: bookmarkToEdit.name, url: bookmarkToEdit.url });
        }
        else {
            this.setState({ name: "", url: "" });
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
            this.setState({ isFormVisible: false, url: "", name: "" });
        }
    };

    handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: evt.target.value });
    };
    handleUrlChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ url: evt.target.value });
    };
    toggleShow = () => {
        this.setState({ isFormVisible: !this.state.isFormVisible });
    };

    buttonStyle(): React.CSSProperties {
        if (!this.hasValue()) {
            return { cursor: 'not-allowed' };
        }
        return null;
    }

    render() {
        let bookmarkToEdit = this.props.bookmarkToEdit;
        const idEdit = bookmarkToEdit != null;
        const addOrEditToggleButtonText = bookmarkToEdit ? '(Edit Bookmark)' : '(Add Bookmark)';
        const addOrEdditAcceptButtonText = bookmarkToEdit ? 'Edit' : 'Add';
        const buttonStyle = { display: 'inline-block', textDecoration: 'underline', cursor: 'pointer' };
        if (this.state.isFormVisible) {
            return (<div>
                <div style={buttonStyle} onClick={this.toggleShow}>Close</div>
                <form onSubmit={this.handleSubmit}>
                    <div>Name: <input type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="Bookmark name..." /></div>
                    <div>Url:  <input type="text" value={this.state.url} onChange={this.handleUrlChange} placeholder="url..." /></div>
                    <button value="Add" style={this.buttonStyle()}>{addOrEdditAcceptButtonText}</button>
                </form>
            </div>);
        }
        return <div style={buttonStyle} onClick={this.toggleShow}>{addOrEditToggleButtonText}</div>;
    }
}

// **AddOrEditTagComponent**
type AddTagProps = {
    isRoot?: boolean;
    tagToEdit?: TagModelState;
    onAddOrEdit: (newTag: AddOrEditTagResult) => void;
};
type AddTagState = {
    isFormVisible: boolean;
    name: string;
};

export class AddOrEditTag extends React.Component<AddTagProps, AddTagState> {
    constructor(props) {
        super(props);
        const tagToEdit = this.props.tagToEdit || '';
        this.state = { isFormVisible: false, name: tagToEdit && tagToEdit.name };
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
            }
            else {
                this.props.onAddOrEdit({ name: name, bookmarks: [] });
            }
            this.setState({ isFormVisible: false, name: '' });
        }
    };
    handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: evt.target.value });
    };
    toggleShow = () => {
        this.setState({ isFormVisible: !this.state.isFormVisible });
    };
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
            return (<div>
                <div style={buttonStyle} onClick={this.toggleShow}>Close</div>
                <form onSubmit={this.handleSubmit}>
                    <div>Name: <input type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="Tag name..." /></div>
                    <button value="Add" style={this.buttonStyle()}>{acceptText}</button>
                </form>
            </div>);
        }
        return <div style={buttonStyle} onClick={this.toggleShow}>{toggleAddButtonText}</div>;
    }
}

// **TagComponent**

type TagDispatchProps = {
    addBookmark: (bookmarkModel: BookmarkModel, tagName: string) => void;
    addOrEditTag: (addOrEditTagResult: AddOrEditTagResult, parentTagName: string) => void;
    onEditBookmark: (tag: TagModelState, bookmark: EditBookmark) => void;
}

type TagStateToProps = {
    parentTag: TagModelState;
    tag: TagModelState;
    subTags?: TagModelState[];
    bookmarks: BookmarkModel[];
}

type TagProps = TagStateToProps & TagDispatchProps;

export function Tag(props: TagProps) {
    const { tag, bookmarks, parentTag } = props;
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
            <AddOrEditTag key={`add${tag.name}`} onAddOrEdit={(newTag) => props.addOrEditTag(newTag, parentTag.name)} />
            <AddOrEditTag key={`edit{tag.name}`} tagToEdit={tag} onAddOrEdit={(newTag) => props.addOrEditTag(newTag, parentTag && parentTag.name)} />
        </fieldset>
    </li>);
}

const bookmarksById = (bookmarkIds: string[], allBookmarks: BookmarkModel[]) => {
    return allBookmarks.filter(bookmark => bookmarkIds.some(x => x == bookmark.name));
}

const tagByName = (tagName: string, tags: TagModelState[]) => {
    return tags.find(x => x.name == tagName);
}

const tagMapStateToProps = (state: BookmarksAppState, ownProps: ConnectedTagProps): TagStateToProps => {
    const tag = tagByName(ownProps.tagName, state.tags);
    return ({
        tag: tag,
        subTags: tag.subTags && state.tags.filter(x => tag.subTags.some(tagName => tagName == x.name)),
        bookmarks: bookmarksById(tag.bookmarks, state.bookmarks),
        parentTag: tagByName(ownProps.parentTagName, state.tags)
    })
};
const tagMapDispatchToProps = (dispatch: React.Dispatch<Action<any>>): TagDispatchProps => {
    return {
        addBookmark: (bookmarkModel: BookmarkModel, tagName: string) => dispatch(addBookmark({ bookmarkModel: bookmarkModel, tagName: tagName })),
        addOrEditTag: (addOrEditTagResult: AddOrEditTagResult, parentTagName: string) => dispatch(addOrEditTag({ addOrEditTagResult: addOrEditTagResult, parentTagName: parentTagName })),
        onEditBookmark: (tag: TagModelState, bookmark: EditBookmark) => dispatch(editBookmark(bookmark))
    }
}

type ConnectedTagProps = {
    parentTagName: string;
    tagName: string;
}

export const ConnectedTag: React.ComponentClass<ConnectedTagProps> = connect(tagMapStateToProps, tagMapDispatchToProps)(Tag);

// **TagsComponent**

type TagsProps = {
    parentTag: TagModelState;
    tags: TagModelState[];
};

export function Tags(props: TagsProps) {
    const { tags, parentTag } = props;
    if (tags) {
        const parentTagName = parentTag && parentTag.name;
        const tagItems = tags.map(tag => <ConnectedTag key={tag.name} parentTagName={parentTagName} tagName={tag.name} />);
        return (<ul style={{ listStyleType: 'none', paddingInlineStart: 0 }}>{tagItems}</ul>);
    }
    return null;
}

// **TagSearchComponent**

type TagSearchProps = {
    searachText: string;
    onSearchChange: (value: string) => void;
};

export function TagSearch(props: TagSearchProps) {
    const { searachText, onSearchChange } = props;
    return (<div><input type="text" placeholder="Search tags..." value={searachText} onChange={(evt) => onSearchChange(evt.target.value)} /></div>);
}

// **TagsRootComponent**

export type TagsRootDispatchProps = {
    addOrEditTag: (addOrEditTagResult: AddOrEditTagResult) => void;
    search: (searchValue: string) => void;
}

export type TagsRootStateProps = {
    tags: TagModelState[];
    searachText?: string;
}

export type TagsRootProps = TagsRootStateProps & TagsRootDispatchProps;

export function TagsRoot(props: TagsRootProps) {
    const { tags, search, searachText, addOrEditTag } = props;

    if (tags) {
        return (<div>
            <TagSearch searachText={searachText} onSearchChange={search} />
            <Tags tags={tags} parentTag={null} />
            <AddOrEditTag isRoot={true} onAddOrEdit={(newTag) => addOrEditTag(newTag)} />
        </div>);
    }
    return null;
}

const tagsRootMapStateToProps = (state: BookmarksAppState): TagsRootStateProps => {
    return {
        tags: state.tags.filter(x => x.isRoot),
        searachText: ''
    };
}

const tagsRootMapDispatchToProps = (dispatch: React.Dispatch<Action<any>>): TagsRootDispatchProps => {
    return {
        addOrEditTag: (addOrEditTagResult: AddOrEditTagResult) => dispatch(addOrEditTag({ addOrEditTagResult: addOrEditTagResult, parentTagName: null })),
        search: (searchValue: string) => dispatch(search({ searchValue: searchValue }))
    }
}

export const ConnectedTagsRoot = connect(tagsRootMapStateToProps, tagsRootMapDispatchToProps)(TagsRoot);