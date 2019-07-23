import React from 'react';
import firebase from 'firebase';
import Board from './Board';
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.gameRef = firebase.database().ref('games').child('test_game')
    }

    render() {
        return <Board gameRef={this.gameRef} />
    }
}
