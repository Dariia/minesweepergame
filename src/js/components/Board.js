import React from 'react';
import Cell from './Cell';
import { connect } from "react-redux";
import { gameState, gameOnOff, setMinesCount, setBoardData } from "../actions/app";

class Dashboard extends React.Component {
    constructor() {
        super();
    }

    getFilteredArray( prop, data, not = false ) {
        let arr = [];

        data.map( datarow => {
            datarow.map( ( dataitem ) => {
                ( not ? !dataitem[ prop ] : dataitem[ prop ] ) && arr.push( dataitem );
            } );
        } );

        return arr;
    }

    getHidden( data ) {
        let arr = [];

        data.map( datarow => {
            datarow.map( ( dataitem ) => {
                !dataitem.isRevealed && arr.push( dataitem );
            } );
        } );

        return arr;
    }

    revealBoard() {
        let updatedData = this.props.state.boardData;

        updatedData.map( ( datarow ) => {
            datarow.map( ( dataitem ) => {
                dataitem.isRevealed = true;
            } );
        } );

        this.props.handleSetBoardData( updatedData );
    }

    revealEmpty( x, y, data ) {
        let area = this.props.traverseBoard( x, y, data );

        area.map( value => {
            if ( !value.isRevealed && ( value.isEmpty || !value.isMine ) ) {
                data[ value.x ][ value.y ].isRevealed = true;
                value.isEmpty && this.revealEmpty( value.x, value.y, data );
            }
        } );

        return data;
    }

    handleCellClick( x, y ) {
        if ( this.props.state.boardData[ x ][ y ].isRevealed ) return null;

        if ( this.props.state.boardData[ x ][ y ].isMine ) {
            this.revealBoard();
            this.props.setGameState( 'You loose' );
            this.props.handleGameStart(false);
        }

        let updatedData = this.props.state.boardData;
        updatedData[ x ][ y ].isFlagged = false;
        updatedData[ x ][ y ].isRevealed = true;

        updatedData[ x ][ y ].isEmpty && ( updatedData = this.revealEmpty( x, y, updatedData ) );

        if (this.getFilteredArray( 'isRevealed', updatedData).length === this.props.state.mines ) {
            this.revealBoard();
            this.props.setGameState( 'You win' );
        }

        this.props.handleSetBoardData( updatedData );
        this.props.handleMinesCount( this.props.state.mines - this.getFilteredArray( 'isFlagged', updatedData ).length );
    }

    _handleContextMenu( e, x, y ) {
        e.preventDefault();
        let updatedData = this.props.state.boardData,
            mines = this.props.state.minesQty,
            isWin = false;

        if (updatedData[ x ][ y ].isRevealed) return;

        updatedData[ x ][ y ].isFlagged = !updatedData[ x ][ y ].isFlagged;
        updatedData[ x ][ y ].isFlagged ? mines++ : ( mines > 0 && mines-- );

        if ( mines === 0 ) {
            const minesArr = this.getFilteredArray( 'isMine', updatedData );
            const flagsArr = this.getFilteredArray( 'isFlagged', updatedData );
            isWin = ( JSON.stringify( minesArr ) === JSON.stringify( flagsArr ) );

            if ( isWin ) {
                this.revealBoard();
                this.props.setGameState( 'You win' );
            }
        }

        this.props.handleSetBoardData( updatedData );
        this.props.handleMinesCount( mines );
    }

    renderBoard() {
        return this.props.state.boardData.map( ( datarow ) => {
            return datarow.map( ( dataitem ) => {
                return (
                    <div key={ dataitem.x * datarow.length + dataitem.y }>
                        <Cell
                            onClick={ () => this.handleCellClick( dataitem.x, dataitem.y ) }
                            cMenu={ ( e ) => this._handleContextMenu( e, dataitem.x, dataitem.y ) }
                            value={ dataitem } />
                        {( datarow[ datarow.length - 1 ] === dataitem ) ? <div className="clear" /> : ""}
                    </div>
                );
            } );
        } );
    }

    render() {
        return <div className="board">{this.renderBoard()}</div>;
    }
}

const mapStateToProps = ( state, ownProps ) => {
    return {
        state,
        traverseBoard: ownProps.traverseBoard,
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        setGameState: ( params ) => dispatch( gameState( params ) ),
        handleGameStart: ( params ) => dispatch( gameOnOff( params ) ),
        handleMinesCount: ( params ) => dispatch( setMinesCount( params ) ),
        handleSetBoardData: ( params ) => dispatch( setBoardData( params ) ),
    };
}

const Board = connect(
    mapStateToProps,
    mapDispatchToProps,
)( Dashboard );

export default Board;
