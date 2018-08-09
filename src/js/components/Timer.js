import React from 'react';
import { connect, dispatch } from 'react-redux';
import { gameOnOff, updateTime, gameState } from '../actions/app';

class GameTimer extends React.Component {
    constructor( props ) {
        super();
        this.state = {
            time: props.state.time,
        };
        this.updTime = this.updTime.bind( this );
        this.clearTimer = this.clearTimer.bind( this );
        this.setTimer = this.setTimer.bind( this );
    }

    componentDidMount() {
        this.setTimer();
    }

    componentDidUpdate() {
        console.log(this.props.state);
        console.log(!!this.timer);
        this.props.state.gameOn ? this.setTimer() : this.clearTimer();
    }

    setTimer() {
        if ( typeof this.props.state.time == 'number' ) {
            !this.timer && ( this.timer = setInterval( this.updTime, 1000 ) );
        }
    }

    updTime() {
        this.setState( {
            time: this.props.state.time,
        } );

        if ( this.props.state.time == 0 ) {
            this.props.handleGameStart( false );
            this.props.setGameState( 'Time is out' );
            this.clearTimer();
            return;
        }

        let newTime = this.props.state.time - 1;
        this.props.handleUpdateTime( newTime );
    }

    clearTimer() {
        this.timer && clearInterval( this.timer );
        this.timer = false;
    }

    render() {
        return <span className="game-timer">{this.state.time}</span>;
    }
}

const mapStateToProps = ( state ) => {
    return { state };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        handleGameStart: ( params ) => {
            dispatch( gameOnOff( params ) );
        },
        handleUpdateTime: ( params ) => {
            dispatch( updateTime( params ) );
        },
        setGameState: ( params ) => {
            dispatch( gameState( params ) );
        },
    };
}

const Timer = connect(
    mapStateToProps,
    mapDispatchToProps,
)( GameTimer );

export default Timer;
