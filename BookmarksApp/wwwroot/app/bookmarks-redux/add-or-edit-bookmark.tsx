import * as React from 'react';
import { BookmarkModel, EditBookmark } from './bookmark-model';

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
    constructor(props) {
        super(props);
        const bookmarkToEdit = this.props.bookmarkToEdit;
        if (bookmarkToEdit) {
            this.state = { isFormVisible: false, name: bookmarkToEdit.name, url: bookmarkToEdit.url };
        }
        else {
            this.state = { isFormVisible: false, name: "", url: "" };
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
