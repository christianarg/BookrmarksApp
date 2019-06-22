import * as React from 'react';

type TagModel = {
    name: string;
    subTags?: TagModel[];
    bookmarks: BookmarkModel[];
}

type BookmarkModel = {
    name: string;
    url: string;
}


type BookmarProps = {
    bookmarks: BookmarkModel[];
}

function Bookmarks(props: BookmarProps) {
    const bookmarks = props.bookmarks.map(bookmark =>
        <li key={bookmark.name}>
            <a href={bookmark.url} target="_blank" >{bookmark.name}</a>
        </li>)
    return (<ul>{bookmarks}</ul>);
}

type TagProps = {
    tag: TagModel;
}

function Tag(props: TagProps) {
    const tag = props.tag;
    const tagItem = <li>{tag.name}<Bookmarks bookmarks={tag.bookmarks} /></li>;
    if (tag.subTags) {
        const subTags = tag.subTags.map(subTag => <Tags key={subTag.name} />)
        return (<>{tagItem}<div></div></>)
    }
    return tagItem;
}

type TagsState = {
    tags: TagModel[];
}

export class Tags extends React.Component<{}, TagsState> {

    componentDidMount() {
        this.setState({ tags: sampleBookrmarks.slice() });
    }

    render() {
        const tags = sampleBookrmarks.map(tag => <Tag key={tag.name} tag={tag} />);
        return (
            <ul>{tags}</ul>
        );
    }
}

export const sampleBookrmarks: TagModel[] = [
    {
        name: '.Net',
        bookmarks: [
            { name: '.net', url: 'https://dotnet.microsoft.com/download' }
        ]
    },
    {
        name: 'Asp.net',
        bookmarks: [
            { name: 'asp.net', url: 'https://dotnet.microsoft.com/apps/aspnet' },
            { name: 'asp.net core', url: 'https://docs.microsoft.com/es-es/aspnet/core/?view=aspnetcore-2.2' },
        ],
    }
]