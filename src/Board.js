import React from 'react';
import Square from './Square';
import Modal from 'react-modal';
import ListView from './ListView';

export default class Board extends React.Component {
    constructor(props) {
        super(props)
        this.five = [0, 1, 2, 3, 4]
        const board = Array(25).fill(null);
        board[0] = 0
        board[1] = 1
        this.state = {
            ready: false,
            board,
            modalOpen: false,
            selectedSquare: null,
        }
    }

    componentWillMount() {
        this.props.gameRef.child('ready').on('value', (snapshot) => {
            this.setState({
                ready: snapshot.val()
            });
        });
    }

    setSquare(index) {
        return function (key) {
            console.log(key, index);
            const newBoard = this.state.board.map((square, i) => {
                if (i === index) {
                    return key
                }
                else {
                    return square
                }
            });
            this.setState({ board: newBoard });
        }
    }

    render() {
        return <div className="board">
            {this.five.map(i => {
                return <div key={"row" + i} className="row">
                    {this.five.map(j => {
                        const index = i * 5 + j;
                        return <Square
                            key={"square" + index}
                            squareKey={this.state.board[index]}
                            gameRef={this.props.gameRef}
                            isBingo={index === 12}
                            ready={this.state.ready}
                            openModal={() => { this.setState({ modalOpen: true, selectedSquare: index })}}
                        />
                    })}
                </div>
            })}
            <Modal
                isOpen={this.state.modalOpen}
                onRequestClose={() => this.setState({ modalOpen: false })}
                shouldCloseOnOverlayClick={true}
            >
                <ListView
                    onSelect={this.setSquare(this.state.selectedSquare).bind(this)}
                    close={() => this.setState({ modalOpen: false })}
                />
            </Modal>
        </div>
    }
}