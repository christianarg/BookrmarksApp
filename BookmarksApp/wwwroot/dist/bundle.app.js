/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./wwwroot/app/app.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./wwwroot/app/app.tsx":
/*!*****************************!*\
  !*** ./wwwroot/app/app.tsx ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(/*! react */ "react");
var ReactDOM = __webpack_require__(/*! react-dom */ "react-dom");
var bookrmarks_1 = __webpack_require__(/*! ./bookmarks/bookrmarks */ "./wwwroot/app/bookmarks/bookrmarks.tsx");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (React.createElement(bookrmarks_1.TagsRoot, null));
    };
    return App;
}(React.Component));
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));


/***/ }),

/***/ "./wwwroot/app/bookmarks/bookrmarks.tsx":
/*!**********************************************!*\
  !*** ./wwwroot/app/bookmarks/bookrmarks.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(/*! react */ "react");
function Bookmarks(props) {
    var bookmarks = props.bookmarks.map(function (bookmark) { return !bookmark.hidden &&
        React.createElement("li", { key: bookmark.name },
            React.createElement("a", { href: bookmark.url, target: "_blank" }, bookmark.name)); });
    return (React.createElement("ul", null, bookmarks));
}
function Tag(props) {
    var tag = props.tag;
    if (tag.hidden) {
        return null;
    }
    var tagItem = React.createElement("li", null,
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
        tag.hidden = !tagNameHasText && !anyBookmarkVisible;
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


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=bundle.app.js.map