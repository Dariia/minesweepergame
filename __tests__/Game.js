import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import Game from "../src/js/components/Game";
import GameState from "../src/js/components/GameState";
import GameDriver from "../drivers/GameDriver";
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {connect, dispatch} from 'react-redux';
import {toggleGameOn} from '../src/js/actions/app'

describe( "Game suite", () => {
    const initialState = {
        completed: true,
        gameOn: false,
        gameState: 'Start new game',
        height: 0,
        width: 0,
        mines: 0,
        minesQty: 0,
        time: '000',
        boardData: []
    };
    const mockStore = configureStore();
    let store,container;

    beforeEach(() => {
        store = mockStore( initialState )
        container = shallow( <Game store={ store } /> );
    })

    it('render the GAME component', () => {
        expect( container.length ).toEqual( 1 );
    });
});

describe( 'Mount + wrapping in <Game>', () => {
    const initialState = {
        completed: true,
        gameOn: false,
        gameState: 'Start new game',
        height: 0,
        width: 0,
        mines: 0,
        minesQty: 0,
        time: '000',
        boardData: [],
    };

    const newState = {
        height: 5,
        width: 5,
        mines: 10,
        minesQty: 10,
        time: 60,
        gameOn: true,
        boardData: [],
        gameState: 'Game Started',
    };

    const mockStore = configureStore();
    let store, wrapper;

    beforeEach( () => {
        store = mockStore( initialState );
        wrapper = mount( <Provider store={ store }><Game /></Provider> );
    } );

    it( 'should display start button with smile', () => {
        const startBtn = wrapper.find( "button" ).text();
        expect( startBtn ).toEqual( '🙂' );
    } );

    it('check start game state component', () => {
        const gameStateElem = wrapper.find( ".game-info" ).text();
        expect( gameStateElem ).toEqual( 'Start new game' );
    } );

    it( 'check start game action on dispatching', () => {
        let action;

        store.dispatch(toggleGameOn(newState));
        action = store.getActions()
        expect(action[0].type).toBe("START_GAME");
    } );

    it( 'game state label changes', () => {
        let state = { gameState: 'Game Started' },
            store = mockStore( state ),
            gameState = mount( <Provider store={ store }><GameState /></Provider> );

        expect( gameState.find( '.game-info' ).text() ).toEqual( 'Game Started' );

    } );

    it( 'game mines number info changes on start', () => {
        expect(wrapper.find( '.game-numbers' ).text() ).toEqual( '0' );

        let newsStore = mockStore( newState ),
            newWrapper = mount( <Provider store={ newsStore }><Game /></Provider> );

        expect( newWrapper.find( '.game-numbers' ).text() ).toEqual( '10' );
    } );
});
