/*
 * action types
 */

export const GAME_ON = 'GAME_ON';
export const UPDATE_TIME = 'UPDATE_TIME';
export const GAME_STATE = 'GAME_STATE';
export const MINES_QTY = 'MINES_QTY';
export const START_GAME = 'START_GAME';
export const BOARD_DATA = 'BOARD_DATA';

/*
 * action creators
 */
export function toggleGameOn( state ) {
    return {
        type: START_GAME,
        state,
    };
}

export function gameOnOff( gameOn ) {
    return {
        type: GAME_ON,
        gameOn: gameOn,
    };
}

export function updateTime( time ) {
    return {
        type: UPDATE_TIME,
        time: time,
    };
}

export function gameState( stateTxt ) {
    return {
        type: GAME_STATE,
        gameStateInfo: stateTxt,
    };
}

export function setMinesCount( qty ) {
    return {
        type: MINES_QTY,
        minesQty: qty,
    };
}

export function setBoardData( data ) {
    return {
        type: BOARD_DATA,
        boardData: data,
    };
}
