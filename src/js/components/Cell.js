import React from 'react';

class Cell extends React.Component {
    getValue() {
        if ( !this.props.value.isRevealed ) {
            return this.props.value.isFlagged ? "🚩" : null;
        }
        if ( this.props.value.isMine ) {
            return "💣";
        }
        if ( this.props.value.near === 0 ) {
            return null;
        }

        return this.props.value.near;
    }

    setDataProps() {
        let dataProps = {
            'data-mines': this.props.value.isMine,
            'data-near': this.props.value.near,
            'data-isflagged': this.props.value.isFlagged,
        }

        return dataProps;
    }

    render() {
        let dataProps = this.setDataProps();
        let className = "cell" + ( this.props.value.isRevealed ? "" : " hidden-cell" ) + ( this.props.value.isMine ? " is-mine" : "" ) + ( this.props.value.isFlagged ? " is-flag" : "" );

        return <div ref="cell" onClick={ this.props.onClick } className={ className } onContextMenu={ this.props.cMenu } { ...dataProps } >{ this.getValue() }</div>;
    }
}

export default Cell;