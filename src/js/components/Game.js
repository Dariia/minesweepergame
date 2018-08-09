import React from 'react';
import { connect, dispatch } from 'react-redux';
import { toggleGameOn } from '../actions/app'
import Board from "./Board";
import Timer from "./Timer";
import GameState from "./GameState";

class Game extends React.Component {
    constructor() {
        super();
        this.gameStart = this.gameStart.bind( this );
        this.traverseBoard = this.traverseBoard.bind( this );
    }

    gameStart() {
        let gameHeight = 5,
            gameWidth = 5,
            time = 999000,
            minesQty = 5,
            boardData = this.initBoardData( gameHeight, gameWidth, minesQty );

        this.props.handleGameStart( {
            height: gameHeight,
            width: gameWidth,
            mines: minesQty,
            minesQty: minesQty,
            time: time,
            gameOn: true,
            boardData: boardData,
            gameState: 'Game Started'
        } );
    }

    initBoardData( height, width, mines ) {
        let data = [];

        for ( let i = 0; i < height; i++ ) {
            data.push( [] );
            for ( let j = 0; j < width; j++ ) {
                data[ i ][ j ] = {
                    x: i,
                    y: j,
                    isMine: false,
                    near: 0,
                    isRevealed: false,
                    isEmpty: false,
                    isFlagged: false,
                };
            }
        }

        data = this.plantMines( data, height, width, mines );
        data = this.getNears( data, height, width );

        return data;
    }

    getRandomNumber( dimension ) {
        return Math.floor( (Math.random() * 1000) + 1 ) % dimension;
    }

    plantMines( data, height, width, mines ) {
        let randomx, randomy, minesPlanted = 0;

        while ( minesPlanted < mines ) {
            randomx = this.getRandomNumber( width );
            randomy = this.getRandomNumber( height );
            if ( !( data[ randomx ][ randomy ].isMine ) ) {
                data[ randomx ][ randomy ].isMine = true;
                minesPlanted++;
            }
        }

        return ( data );
    }

    getNears( data, height, width ) {
        let updatedData = data,
            index = 0;

        for ( let i = 0; i < height; i++ ) {
            for ( let j = 0; j < width; j++ ) {
                if ( data[ i ][ j ].isMine !== true ) {
                    let mine = 0;
                    const area = this.traverseBoard( data[i][j].x, data[i][j].y, data );
                    area.map( value => {
                        if ( value.isMine ) {
                            mine++;
                        }
                    });
                    if ( mine === 0 ) {
                        updatedData[ i ][ j ].isEmpty = true;
                    }
                    updatedData[ i ][ j ].near = mine;
                }
            }
        }

        return updatedData;
    };

    traverseBoard( x, y, data ) {
        const el = [];

        (x > 0) && el.push(data[x - 1][y]);
        (x < this.props.height - 1) && el.push(data[x + 1][y]);
        (y > 0) && el.push(data[x][y - 1]);
        (y < this.props.width - 1) && el.push(data[x][y + 1]);
        (x > 0 && y > 0) && el.push(data[x - 1][y - 1]);
        (x > 0 && y < this.props.width - 1) && el.push(data[x - 1][y + 1]);
        (x < this.props.height - 1 && y < this.props.width - 1) && el.push(data[x + 1][y + 1]);
        (x < this.props.height - 1 && y > 0) && el.push(data[x + 1][y - 1]);

        return el;
    }

    render() {
        return (
            <div className="wrapper">
                <div className="game">
                    <div className="game-header">
                        <Timer />
                        <button onClick={ this.gameStart }>🙂</button>
                        <span className="game-numbers">{ this.props.minesQty }</span>
                    </div>
                    <GameState />
                    <Board traverseBoard={ this.traverseBoard } />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    return {
        height: state.height,
        width: state.width,
        mines: state.mines,
        time: state.time,
        gameOn: state.gameOn,
        completed: state.completed,
        minesQty: state.minesQty,
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        handleGameStart: ( params ) => {
            dispatch(toggleGameOn( params ) );
        },
    };
}

const GameBoard = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Game);

export default GameBoard;
