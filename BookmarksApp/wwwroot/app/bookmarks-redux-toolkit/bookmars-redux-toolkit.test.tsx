import * as React from 'react';
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { TagsRoot, ConnectedTagsRoot } from '../bookmarks-redux/bookmarks-redux';
import { TagModelState } from './bookmarks-redux-toolkit';
import { Provider } from 'react-redux';
import reducer, { addBookmark } from './bookmark-slice'
import { configureStore } from '@reduxjs/toolkit';



describe("TagsRoot tests", () => {

    test("Render root tag  empty tags", () => {
        // ARRANGE
        const tags: TagModelState[] = []
        // ACT
        const tagsRoot = shallow(<TagsRoot tags={tags} addOrEditTag={null} search={null} />);

        // ASSERT
        expect(shallowToJson(tagsRoot)).toMatchSnapshot();
    });

    test("Render root tag with tags", () => {
        // ARRANGE
        const tags: TagModelState[] = [{
            name: 'tag',
            bookmarks: ['bookmark1','bookmark2']
        }]
        // ACT
        const tagsRoot = shallow(<TagsRoot tags={tags} addOrEditTag={null} search={null} />);

        // ASSERT
        expect(shallowToJson(tagsRoot)).toMatchSnapshot();
    });
    

    test("Add root tag", () => {
        // ARRANGE
        // TODO: me dapalo
        //const tagRoot = render(<TagsRoot />);
        //tagRoot.find("input")
        // ACT

        // ASSERT
    });

    test("Remove root tag", () => {
        // ARRANGE

        // ACT

        // ASSERT
    });

    test("Edit root tag", () => {
        // ARRANGE

        // ACT

        // ASSERT
    });

    

});


describe("ConnectedTagsRoot tests", () => {

    test("Render ConnectedRoot tag  empty tags", () => {
        // ARRANGE
        const tags: TagModelState[] = []
        const store = configureStore({ reducer: reducer });
        // ACT
        const tagsRoot = shallow(<Provider store={store}><ConnectedTagsRoot /></Provider>);

        // ASSERT
        expect(shallowToJson(tagsRoot)).toMatchSnapshot();
    });

    //test("Render ConnectedRoot  with tags", () => {
    //    // ARRANGE
    //    const tags: TagModelState[] = [{
    //        name: 'tag',
    //        bookmarks: ['bookmark1', 'bookmark2']
    //    }]
    //    // ACT
    //    const tagsRoot = shallow(<ConnectedTagsRoot/>);

    //    // ASSERT
    //    expect(shallowToJson(tagsRoot)).toMatchSnapshot();
    //});
});


describe("test actions", () => {
    test('add bookmark', () => {
        // ARRANGE
        const store = configureStore({ reducer: reducer });
        // ACT
        //addBookmark({});
        // ASSERT
    });
});
