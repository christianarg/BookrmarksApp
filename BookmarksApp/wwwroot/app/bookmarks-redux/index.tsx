import * as React from 'react';
import { BookmarkModel, TagModel, AddOrEditTagResult, EditBookmark } from "./bookmark-model";
import { replaceTag, filterTags } from './common';
import { TagSearch } from './TagSearchProps';
import { Tags } from './Tags';
import { AddOrEditTag } from './AddTagProps';

export type TagsRootState = {
    tags: TagModel[];
    searachText: string;
}

export class TagsRoot extends React.Component<{}, TagsRootState> {
    state: TagsRootState = { tags: null, searachText: '' };
    componentDidMount() {
        this.setState({ tags: sampleBookrmarks.slice() });
    }
    handleSearch = (searchValue: string) => {
        const tags = this.state.tags.slice();
        filterTags(tags, searchValue);
        this.setState({ tags: tags, searachText: searchValue });
    };
    handleAddBookmark = (tag: TagModel, bookmarkModel: BookmarkModel) => {
        let tags = this.state.tags.slice();
        tag.bookmarks.push(bookmarkModel);
        tags = replaceTag(tags, tag);
        this.setState({ tags: tags });
    };
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
    };
    handleEditBookmark = (tag: TagModel, editedBookmark: EditBookmark) => {
        let tags = this.state.tags.slice();
        // replace bookmark
        tag.bookmarks = tag.bookmarks.map(x => x.name == editedBookmark.oldName ? editedBookmark : x);
        tags = replaceTag(tags, tag);
        this.setState({ tags: tags });
    };
    render() {
        if (this.state.tags) {
            return (<div>
                <TagSearch searachText={this.state.searachText} onSearchChange={this.handleSearch} />
                <Tags tags={this.state.tags} parentTag={null} onEditBookmark={this.handleEditBookmark} onAddBookmark={this.handleAddBookmark} onAddTag={this.handleAddOrEditTag} />
                <AddOrEditTag isRoot={true} onAddOrEdit={(newTag) => this.handleAddOrEditTag(newTag, null)} />
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