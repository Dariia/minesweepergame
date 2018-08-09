import React from 'react'
import Enzyme , { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import Board from "../src/js/components/Board";
import Cell from "../src/js/components/Cell";
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {connect, dispatch} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
    const mockStore = configureStore();
    const boardData = [
        [
            {x: 0, y: 0, isMine: false, near: 0, isRevealed: false, isEmpty: true, isFlagged:false},
            {x: 0, y: 1, isMine: false, near: 0, isRevealed: false, isEmpty: true, isFlagged:false},
            {x: 0, y: 2, isMine: false, near: 0, isRevealed: false, isEmpty: true, isFlagged:false},
            {x: 0, y: 3, isMine: false, near: 0, isRevealed: false, isEmpty: true, isFlagged:false},
            {x: 0, y: 4, isMine: true, near: 0, isRevealed: false, isEmpty: false, isFlagged:false},
        ],
        [
            {x: 1, y: 0, isMine: true, near: 0, isRevealed: false, isEmpty: false, isFlagged:false},
            {x: 1, y: 1, isMine: false, near: 1, isRevealed: false, isEmpty: true, isFlagged:false},
            {x: 1, y: 2, isMine: false, near: 0, isRevealed: false, isEmpty: true, isFlagged:false},
            {x: 1, y: 3, isMine: false, near: 0, isRevealed: false, isEmpty: true, isFlagged:false},
            {x: 1, y: 4, isMine: false, near: 1, isRevealed: false, isEmpty: true, isFlagged:false}
        ],
        [
            {x: 2, y: 0, isMine: true, near: 0, isRevealed: false, isEmpty: false, isFlagged:false},
            {x: 2, y: 1, isMine: false, near: 2, isRevealed: false, isEmpty: true, isFlagged:false},
            {x: 2, y: 2, isMine: false, near: 0, isRevealed: false, isEmpty: true, isFlagged:false},
            {x: 2, y: 3, isMine: true, near: 0, isRevealed: false, isEmpty: false, isFlagged:false},
            {x: 2, y: 4, isMine: false, near: 1, isRevealed: false, isEmpty: true, isFlagged:false}
        ],
        [
            {x: 3, y: 0, isMine: false, near: 1, isRevealed: false, isEmpty: true, isFlagged:false},
            {x: 3, y: 1, isMine: false, near: 1, isRevealed: false, isEmpty: true, isFlagged:false},
            {x: 3, y: 2, isMine: false, near: 0, isRevealed: false, isEmpty: true, isFlagged:false},
            {x: 3, y: 3, isMine: true, near: 0, isRevealed: false, isEmpty: false, isFlagged:false},
            {x: 3, y: 4, isMine: false, near: 2, isRevealed: false, isEmpty: true, isFlagged:false}
        ],

        [
            {x: 4, y: 0, isMine: false, near: 0, isRevealed: false, isEmpty: true, isFlagged:false},
            {x: 4, y: 1, isMine: false, near: 0, isRevealed: false, isEmpty: true, isFlagged:false},
            {x: 4, y: 2, isMine: false, near: 0, isRevealed: false, isEmpty: true, isFlagged:false},
            {x: 4, y: 3, isMine: false, near: 1, isRevealed: false, isEmpty: true, isFlagged:false},
            {x: 4, y: 4, isMine: false, near: 1, isRevealed: false, isEmpty: true, isFlagged:false}
        ]
    ];

    const store = {
        height: 5,
        width: 5,
        mines: 5,
        minesQty: 10,
        time: 60,
        gameOn: true,
        boardData: boardData,
        gameState: 'Game Started'
    }

    const wrapper = mount(<Provider store={mockStore(store)} ><Board/></Provider>);
    return { wrapper }
}

describe('Board', () => {
    const { wrapper } =  setup();

    it('should render self and subcomponents', () => {
        expect(wrapper.find('.board').exists()).toBe(true);
    });

    it('should render correct cells qty', () => {
        expect(wrapper.find('.board .cell').length).toEqual(25);
    });

    it('all cells should be hidden and not flagged', () => {
        expect(wrapper.find('.board .hidden-cell').length).toEqual(wrapper.find('.board .cell').length);
        expect(wrapper.find('[data-isflagged=false]').length).toEqual(wrapper.find('.board .cell').length);
    });

    it('should contain correct mines qty', () => {
        expect(wrapper.find('[data-mines=true]').length).toEqual(5);
    });

    it('specific cell should contain value of mines qty near', () => {
        let cellProps =  wrapper.find('.cell').at(11).props();
        expect(cellProps['data-near']).toEqual(2);
    });

});