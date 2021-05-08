import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Bookmarks from './bookmarks/app';
import * as BookmarksRedux from './bookmarks-redux/app-redux';
import * as BookmarksReduxToolkit from './bookmarks-redux-toolkit/app-redux-toolkit';
import * as BookmarksMobx from './bookmarks-mobx/app';
import * as RenderStuff from './renderStuff';
import * as PropDrilling from './prop-drilling';
import StateBatched from './statebatches';

const getAppNameFromQueryString = () => {
    const appName = window.location.hash.substr(1, window.location.hash.length - 1);
    return appName ?? "";
}

class App extends React.Component<{}, { appName: string }> {
    constructor(props) {
        super(props);

        this.state = { appName: getAppNameFromQueryString() }
    }

    componentDidMount() {
        window.onhashchange = () => {
            const appName = getAppNameFromQueryString();
            if (appName !== this.state.appName) {
                this.setApp(appName);
            }
        };
    }
    setApp(appName: string) {
        this.setState({ appName: appName });
    }

    renderApp() {
        const appName = this.state.appName;
        switch (appName) {
            case 'bookmarks':
                return <Bookmarks.App />
            case 'bookmarks-redux':
                return <BookmarksRedux.App />
            case 'bookmarks-redux-toolkit':
                return <BookmarksReduxToolkit.App />
            case 'bookmarks-redux-toolkit':
                return <BookmarksReduxToolkit.App />
            case 'bookmarks-mobx':
                return <BookmarksMobx.App />
            case 'renderStuff':
                return <RenderStuff.App />
            case 'statebatches':
                return <StateBatched />
            case 'prop-drilling':
                return <PropDrilling.App />
            default:
                return <div>
                    <ul>
                        <li onClick={() => this.setApp('bookmarks')}><a href='#bookmarks'>bookmarks</a></li>
                        <li onClick={() => this.setApp('bookmarks-redux')}><a href='#bookmarks-redux'>bookmarks-redux</a></li>
                        <li onClick={() => this.setApp('bookmarks-redux-toolkit')}><a href='#bookmarks-redux-toolkit'>bookmarks-redux-toolkit</a></li>
                        <li onClick={() => this.setApp('bookmarks-mobx')}><a href='#bookmarks-mobx'>bookmarks-mobx</a></li>
                        <li onClick={() => this.setApp('renderStuff')}><a href='#renderStuff'>renderStuff</a></li>
                        <li onClick={() => this.setApp('statebatches')}><a href='#statebatches'>statebatches</a></li>
                        <li onClick={() => this.setApp('prop-drilling')}><a href='#prop-drilling'>prop-drilling</a></li>
                    </ul>
                </div>
        }
    }

    render() {
        const appName = this.state.appName;
        return <div>
            {appName !== '' && <div style={{ marginBottom: '10px' }}><a href='#' onClick={() => this.setApp('')}>{"<- back to index"}</a></div>}
            {this.renderApp()}
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('root'));