import * as React from 'react';
import { useContext } from 'react';

// Context
// En este caso se utiliza solo para evitar prop-drilling de callbacks
type TagsContextType = {
    handleAddBookmark: (tag: TagModel, bookmarkModel: BookmarkModel) => void;
    handleSearch: (searchValue: string) => void;
    handleAddOrEditTag: (addOrEditTagResult: AddOrEditTagResult, parentTag: TagModel) => void;
    handleEditBookmark: (tag: TagModel, editedBookmark: EditBookmark) => void;
};

export const TagsContext = React.createContext<TagsContextType>(null);

// Models
export type TagModel = {
    name: string;
    subTags?: TagModel[];
    bookmarks: BookmarkModel[];
    hidden?: boolean;
}

type AddOrEditTagResult = TagModel & { oldName?: string; }

export type BookmarkModel = {
    name: string;
    url: string;
    hidden?: boolean;
}

export type EditBookmark = BookmarkModel & { oldName: string };


const ulStyle: React.CSSProperties = { listStyleType: 'none', paddingInlineStart: 0 };

// BookmarkComponent

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

// AddOrEditBookmarkComponent

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

            } else {
                this.props.onAddOrEdit({ name: name, bookmarks: [] });
            }
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

function Tag(props: TagProps) {
    const tag = props.tag;
    if (tag.hidden) {
        return null;
    }

    const tagsContext = useContext(TagsContext);

    
    return (

        <li className="tag">
            <fieldset>
                <legend>Tag: {tag.name}</legend>
                <div>Bookmarks:</div>
                <Bookmarks onEdit={bookmark => tagsContext.handleEditBookmark(tag, bookmark)} bookmarks={tag.bookmarks} />

                {tag.subTags &&
                    <>
                        <div>SubTags:</div>
                        <Tags tags={tag.subTags} parentTag={tag} />
                    </>}
                <AddOrEditBookmark onAddOrEdit={(newBookmark) => tagsContext.handleAddBookmark({ ...tag }, newBookmark)} />
                <AddOrEditTag key={`add${tag.name}`} onAddOrEdit={(newTag) => tagsContext.handleAddOrEditTag(newTag, tag)} />
                <AddOrEditTag key={`edit{tag.name}`} tagToEdit={tag} onAddOrEdit={(newTag) => tagsContext.handleAddOrEditTag(newTag, props.parentTag)} />
            </fieldset>
        </li>);
}

// **TagsComponent**

type TagsProps = {
    parentTag: TagModel;
    tags: TagModel[];
}

function Tags(props: TagsProps) {
    const { tags, parentTag } = props;
    const tagItems = tags.map(tag => <Tag key={tag.name} parentTag={parentTag} tag={tag} />);
    return (
        <ul style={ulStyle}>{tagItems}</ul>
    );
}

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
    tagsContext: TagsContextType;
    constructor(props) {
        super(props);
        this.state = { tags: null, searachText: '' }
        this.tagsContext = {
            handleSearch: this.handleSearch,
            handleAddBookmark: this.handleAddBookmark,
            handleAddOrEditTag: this.handleAddOrEditTag,
            handleEditBookmark: this.handleEditBookmark,
        }
    }

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

    handleAddOrEditTag = (addOrEditTagResult: AddOrEditTagResult, parentTag: TagModel) => {
        let tags = this.state.tags.slice();
        if (parentTag) {
            if (parentTag.subTags == null)
                parentTag.subTags = [];

            if (addOrEditTagResult.oldName) {
                // replace
                parentTag.subTags = parentTag.subTags.map(x => x.name == addOrEditTagResult.oldName ? addOrEditTagResult : x);
            }
            else {
                // new
                parentTag.subTags.push(addOrEditTagResult);
            }
            replaceTag(tags, { ...parentTag });
        }
        else {
            // sin parent

            if (addOrEditTagResult.oldName) {
                // replace
                tags = tags.map(x => x.name == addOrEditTagResult.oldName ? addOrEditTagResult : x);
            }
            else {
                // new
                tags.push(addOrEditTagResult);
            }
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
                    <TagsContext.Provider value={this.tagsContext}>
                        <TagSearch searachText={this.state.searachText} onSearchChange={this.handleSearch} />
                        <Tags tags={this.state.tags} parentTag={null} />
                        <AddOrEditTag isRoot={true} onAddOrEdit={(newTag) => this.handleAddOrEditTag(newTag, null)} />
                    </TagsContext.Provider>
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