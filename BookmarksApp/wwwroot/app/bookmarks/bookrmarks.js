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
var Bookmarks = /** @class */ (function (_super) {
    __extends(Bookmarks, _super);
    function Bookmarks() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bookmarks.prototype.render = function () {
        var tags = exports.sampleBookrmarks.map(function (tag) { return React.createElement("li", { key: tag.name }, tag.name); });
        return (React.createElement("ul", null, tags));
    };
    return Bookmarks;
}(React.Component));
exports.Bookmarks = Bookmarks;
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