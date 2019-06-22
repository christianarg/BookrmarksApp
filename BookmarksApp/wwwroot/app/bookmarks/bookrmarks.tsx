import * as React from 'react';

type Tag = {
    name: string;
    subTags?: Tag[];
    bookmarks: Bookmark[];
}

type Bookmark = {
    name: string;
    url: string;
}

export class Bookmarks extends React.Component {
    render() {
        const tags = sampleBookrmarks.map(tag => <li key={tag.name}>{tag.name}</li>)
        return (
            <ul>{tags}</ul>
        );
    }
}

export const sampleBookrmarks: Tag[] = [
    {
        name: '.Net',
        bookmarks: [
            { name: '.net', url:'https://dotnet.microsoft.com/download' }
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