"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function Bookmarks(props) {
    var bookmarks = props.bookmarks.map(function (bookmark) { return !bookmark.hidden &&
        React.createElement("li", { key: bookmark.name, className: "bookmark" },
            React.createElement("a", { href: bookmark.url, target: "_blank" }, bookmark.name)); });
    return (React.createElement("ul", null, bookmarks));
}
function Tag(props) {
    var tag = props.tag;
    if (tag.hidden) {
        return null;
    }
    var tagItem = React.createElement("li", { className: "tag" },
        tag.name,
        React.createElement(Bookmarks, { bookmarks: tag.bookmarks }));
    return (React.createElement(React.Fragment, null,
        tagItem,
        tag.subTags && React.createElement(Tags, { tags: tag.subTags }),
        " "));
}
function Tags(props) {
    var tagItems = props.tags.map(function (tag) { return React.createElement(Tag, { key: tag.name, tag: tag }); });
    return (React.createElement("ul", null, tagItems));
}
function TagSearch(props) {
    return (React.createElement("div", null,
        React.createElement("input", { type: "text", placeholder: "Search tags...", value: props.searachText, onChange: function (evt) { return props.onSearchChange(evt.target.value); } })));
}
function hasText(text, searchText) {
    return text.toLowerCase().includes(searchText.toLowerCase());
}
function filterTags(tags, searchText) {
    tags.forEach(function (tag) {
        tag.bookmarks.forEach(function (bookmark) { return bookmark.hidden = !hasText(bookmark.name, searchText); });
        var anyBookmarkVisible = tag.bookmarks.some(function (b) { return !b.hidden; });
        var tagNameHasText = hasText(tag.name, searchText);
        var anySubTagsVisible = tag.subTags && tag.subTags.some(function (t) { return !t.hidden; });
        tag.hidden = !tagNameHasText && !anyBookmarkVisible && !anySubTagsVisible;
        if (tag.subTags) {
            filterTags(tag.subTags, searchText);
        }
    });
}
exports.filterTags = filterTags;
var TagsRoot = /** @class */ (function (_super) {
    __extends(TagsRoot, _super);
    function TagsRoot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { tags: null, searachText: '' };
        _this.handleSearch = function (searchValue) {
            var tags = _this.state.tags.slice();
            filterTags(tags, searchValue);
            _this.setState({ tags: tags, searachText: searchValue });
        };
        return _this;
    }
    TagsRoot.prototype.componentDidMount = function () {
        this.setState({ tags: exports.sampleBookrmarks.slice() });
    };
    TagsRoot.prototype.render = function () {
        if (this.state.tags) {
            return (React.createElement("div", null,
                React.createElement(TagSearch, { searachText: this.state.searachText, onSearchChange: this.handleSearch }),
                React.createElement(Tags, { tags: this.state.tags })));
        }
        return null;
    };
    return TagsRoot;
}(React.Component));
exports.TagsRoot = TagsRoot;
exports.sampleBookrmarks = [
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
];
//# sourceMappingURL=bookrmarks.js.map