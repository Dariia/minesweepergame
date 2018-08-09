import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import Cell from "../src/js/components/Cell";
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {connect, dispatch} from 'react-redux';

describe( 'Cell suite', () => {
    let container, props;

    props = { x: 0, y: 0, isMine: false, near: 0, isRevealed: false, isEmpty: true, isFlagged: false };

    beforeEach(()=>{
        container = mount(<Cell value={props} />);
    })

    it('render the Cell component', () => {
        expect(container.length).toEqual(1);
    });
});

describe('Shallow <Cell>',() => {
    let props_mine, props_flagged, props_near, wrapper;

    props_mine = { x: 0, y: 0, isMine: true, near: 0, isRevealed: true, isEmpty: false, isFlagged: false };
    props_flagged = { x: 0, y: 0, isMine: true, near: 0, isRevealed: false, isEmpty: false, isFlagged: true };
    props_near = { x: 0, y: 0, isMine: false, near: 7, isRevealed: true, isEmpty: true, isFlagged: false };

    it('should display div with cell class', () => {
        wrapper = shallow(<Cell value={props_mine}/>);
        const cellElem = wrapper.find('div');

        expect( cellElem.hasClass('cell') ).toBe(true);
    });

    it('check opened mine cell', () => {
        wrapper = shallow(<Cell value={props_mine}/>);
        const cellElemTxt = wrapper.find('.cell').text();

        expect( cellElemTxt ).toEqual( '💣' );
    });

    it('check flagged cell', () => {
        wrapper = shallow(<Cell value={props_flagged}/>);
        const cellElem = wrapper.find('.cell');

        expect( cellElem.text() ).toEqual( '🚩' );
        expect( cellElem.hasClass('hidden-cell') ).toBe(true);
    });

    it('check opened cell showing mines near qty', () => {
        wrapper = shallow(<Cell value={props_near}/>);
        const cellElem = wrapper.find('.cell');

        expect( cellElem.text() ).toEqual( '7' );
        expect( cellElem.hasClass('hidden-cell') ).toBe(false);
    });
});
