import React from 'react';
import Modal from 'react-modal';
import ListView from './ListView';
export default class Square extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            isCrossed: false,
            modalOpen: false,
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
        if (this.props.ready) {
            if (this.props.squareRef) {
                this.props.squareRef.child('isCrossed').set(!this.state.isCrossed);
            }
        }
        else {
            this.setState({ modalOpen: true })
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
                <Modal
                    isOpen={this.state.modalOpen}
                    onRequestClose={() => this.setState({ modalOpen: false }) }
                >
                    <ListView />
                </Modal>
            </div>
        }

    }
}