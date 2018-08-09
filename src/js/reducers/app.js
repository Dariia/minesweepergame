import { GAME_ON, UPDATE_TIME, GAME_STATE, MINES_QTY, START_GAME, BOARD_DATA } from '../actions/app';

function appReducer(state = initialState, action) {
    switch (action.type) {
        case START_GAME:
            return Object.assign({}, state, action.state);
        case GAME_ON:
            return Object.assign({}, state, {
                gameOn: action.gameOn
            });
        case UPDATE_TIME:
            return Object.assign({}, state, {
                time: action.time
            });
        case GAME_STATE:
            return Object.assign({}, state, {
                gameState: action.gameStateInfo
            });
        case MINES_QTY:
            return Object.assign({}, state, {
                minesQty: action.minesQty
            });
        case BOARD_DATA:
            console.log('BOARD_DATA', action.boardData);

            return Object.assign({}, state, {
                boardData: action.boardData
            })
        default:
            return state;
    }
}

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
}

export default appReducer;