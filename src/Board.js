import React from 'react';
import Square from './Square';
export default class Board extends React.Component {
    constructor(props) {
        super(props)
        this.five = [0, 1, 2, 3, 4]
        const board = Array(25).fill(null);
        board[0] = this.props.gameRef.child('squares').child(0)
        board[1] = this.props.gameRef.child('squares').child(1)
        this.state = {
            ready: false,
            board,
        }
    }

    componentWillMount() {
        this.props.gameRef.child('ready').on('value', (snapshot) => {
            this.setState({
                ready: snapshot.val()
            });
        });
    }

    render() {
        console.log(this.state.board)
        return <div className="board">
            {this.five.map(i => {
                return <div key={"row" + i} className="row">
                    {this.five.map(j => {
                        return <Square
                            key={"square" + (i * 5 + j)}
                            squareRef={this.state.board[i * 5 + j]}
                            isBingo={i * 5 + j === 12}
                            ready={ this.state.ready }
                        />
                    })}
                </div>
            })}
        </div>
    }
}