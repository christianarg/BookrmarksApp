import * as React from 'react';

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


type BookmarProps = {
    bookmarks: BookmarkModel[];
}

function Bookmarks(props: BookmarProps) {
    const bookmarks = props.bookmarks.map(bookmark => !bookmark.hidden &&
        <li key={bookmark.name} className="bookmark">
            <a href={bookmark.url} target="_blank" >{bookmark.name}</a>
        </li>)
    return (<ul>{bookmarks}</ul>);
}




type TagProps = {
    tag: TagModel;
}

function Tag(props: TagProps) {
    const tag = props.tag;
    if (tag.hidden) {
        return null;
    }
    const tagItem = <li className="tag">{tag.name}<Bookmarks bookmarks={tag.bookmarks} /></li>;

    return (<>{tagItem}{tag.subTags && <Tags tags={tag.subTags} />} </>);
}


type TagsProps = {
    tags: TagModel[];
}

function Tags(props: TagsProps) {
    const tagItems = props.tags.map(tag => <Tag key={tag.name} tag={tag} />);
    return (
        <ul>{tagItems}</ul>
    );
}


type TagSearchProps = {
    searachText: string;
    onSearchChange: (value: string) => void;
}

function TagSearch(props: TagSearchProps) {
    return (<div><input type="text" placeholder="Search tags..." value={props.searachText} onChange={(evt) => props.onSearchChange(evt.target.value)} /></div>)
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

    render() {
        if (this.state.tags) {
            return (
                <div>
                    <TagSearch searachText={this.state.searachText} onSearchChange={this.handleSearch} />
                    <Tags tags={this.state.tags} />
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
        name: 'react',
        bookmarks: [
            { name: 'react docs', url: 'https://reactjs.org/docs/getting-started.html' }
        ]
    }
]