import * as React from 'react';
import { shallow } from 'enzyme';
import { TagsRoot } from '../bookmarks';
import { shallowToJson } from 'enzyme-to-json';

test("Render root tag when no tags", () => {
    // ARRANGE
    // ACT
    const tagsRoot = shallow(<TagsRoot />);

    // ASSERT
    expect(shallowToJson(tagsRoot)).toMatchSnapshot();
});

test("Render root tag when has tags", () => {
    // ARRANGE
    const tagsRoot = shallow(<TagsRoot />);
    // ACT

    // ASSERT
});



test("Add root tag", () => {
    // ARRANGE

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


test("Add nested tag", () => {
    // ARRANGE

    // ACT

    // ASSERT
});

test("Remove nested tag", () => {
    // ARRANGE

    // ACT

    // ASSERT
});

test("Edit nested tag", () => {
    // ARRANGE

    // ACT

    // ASSERT
});

test("Render bookmark", () => {
    // ARRANGE

    // ACT

    // ASSERT
});


test("Add bookmark", () => {
    // ARRANGE

    // ACT

    // ASSERT
});

test("Remove bookmark", () => {
    // ARRANGE

    // ACT

    // ASSERT
});

test("Edit bookmark", () => {
    // ARRANGE

    // ACT

    // ASSERT
});

