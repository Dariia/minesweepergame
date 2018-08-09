import React from 'react';
import { connect } from "react-redux";

const GameStateInfo = ( props ) => {
   return <div className="game-info">{ props.gameState }</div>;
};

const mapStateToProps = ( state ) => {
    return {
        gameState: state.gameState,
    };
};

const GameState = connect( mapStateToProps, {} )( GameStateInfo );

export default GameState;