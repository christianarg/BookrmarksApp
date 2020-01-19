import * as React from 'react';
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { TagsRoot } from '../bookmarks-redux/bookmarks-redux';
import { TagModelState } from './bookmarks-redux-toolkit';


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

    test("Render nested tag", () => {
        // ARRANGE

        // ACT

        // ASSERT
    });

});
