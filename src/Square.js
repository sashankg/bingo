import React from 'react';
import firebase from 'firebase';

export default class Square extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            isCrossed: false,
        }
    }

    componentWillMount() {
        if (this.props.squareRef != null) {
            this.props.squareRef.child('text').once('value', (snapshot) => {
                this.setState({
                    text: snapshot.val()
                });
            })
            this.props.squareRef.child('isCrossed').on('value', (snapshot) => {
                this.setState({
                    isCrossed: snapshot.val()
                });
            })
        }
    }

    onClick() {
        if (this.props.squareRef) {
            this.props.squareRef.child('isCrossed').set(!this.state.isCrossed);
        } 
    }

    render() {
        if (this.props.isBingo) {
            return <div className="square crossed">
                BINGO
            </div>
        }
        else {
            return <div
                className={"square " + (this.state.isCrossed ? "crossed" : "uncrossed")}
                onClick={ this.onClick.bind(this) }
            >
                {this.state.text}
            </div>
        }

    }
}