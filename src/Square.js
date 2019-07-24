import React from 'react';

export default class Square extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            isCrossed: false,
        }
    }

    componentWillMount() {
        if (this.props.squareKey !== null) {
            const squareRef = this.props.gameRef.child('squares').child(this.props.squareKey);
            squareRef.child('text').once('value', (snapshot) => {
                this.setState({
                    text: snapshot.val()
                });
            })
            squareRef.child('isCrossed').on('value', (snapshot) => {
                this.setState({
                    isCrossed: snapshot.val()
                });
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.squareKey !== this.props.squareKey) {
            const squareRef = this.props.gameRef.child('squares').child(this.props.squareKey);
            squareRef.child('text').once('value', (snapshot) => {
                this.setState({
                    text: snapshot.val()
                });
            })
            squareRef.child('isCrossed').on('value', (snapshot) => {
                this.setState({
                    isCrossed: snapshot.val()
                });
            })
        }
    }

    onClick() {
        if (this.props.ready) {
            if (this.props.squareKey) {
                const squareRef = this.props.gameRef.child('squares').child(this.props.squareKey);
                squareRef.child('isCrossed').set(!this.state.isCrossed);
            }
        }
        else {
            this.props.openModal();
        }

    }

    render() {
        console.log(this.state)
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