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
    var bookmarks = props.bookmarks.map(function (bookmark) {
        return React.createElement("li", { key: bookmark.name },
            React.createElement("a", { href: bookmark.url, target: "_blank" }, bookmark.name));
    });
    return (React.createElement("ul", null, bookmarks));
}
function Tag(props) {
    var tag = props.tag;
    var tagItem = React.createElement("li", null,
        tag.name,
        React.createElement(Bookmarks, { bookmarks: tag.bookmarks }));
    if (tag.subTags) {
        var subTags = tag.subTags.map(function (subTag) { return React.createElement(Tags, { key: subTag.name }); });
        return (React.createElement(React.Fragment, null,
            tagItem,
            React.createElement("div", null)));
    }
    return tagItem;
}
var Tags = /** @class */ (function (_super) {
    __extends(Tags, _super);
    function Tags() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tags.prototype.componentDidMount = function () {
        this.setState({ tags: exports.sampleBookrmarks.slice() });
    };
    Tags.prototype.render = function () {
        var tags = exports.sampleBookrmarks.map(function (tag) { return React.createElement(Tag, { key: tag.name, tag: tag }); });
        return (React.createElement("ul", null, tags));
    };
    return Tags;
}(React.Component));
exports.Tags = Tags;
exports.sampleBookrmarks = [
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
];
//# sourceMappingURL=bookrmarks.js.map