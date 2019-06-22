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

type TagsRootState = {
    tags: TagModel[];
}

export class TagsRoot extends React.Component<{}, TagsRootState> {

    state: TagsRootState = { tags: null }

    componentDidMount() {
        this.setState({ tags: sampleBookrmarks.slice() });
    }

    render() {
        if (this.state.tags) {
            return (<Tags tags={this.state.tags} />);
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