import * as React from 'react';
import { TagModelState, AddOrEditTagResult } from './bookmark-model';

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
