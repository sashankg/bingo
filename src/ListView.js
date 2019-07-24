import React from 'react';
import Firebase from 'firebase';

export default class ListView extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = { words : [] };
    }

    componentWillMount()
    {
        console.log('')
        this.wordRef = Firebase.database().ref('games/test_game/squares');
        this.wordRef.on('child_added', snapshot => {
            let word = {
                "text" : snapshot.val().text,
                "isCrossed": snapshot.val().isCrossed,
                key: snapshot.key,
            };
            this.setState({words : [word].concat(this.state.words)})
        })
    }

    addSquare(e)
    {
        e.preventDefault();
        var wordObject = {"text" : this.inputEl.value, "isCrossed" : false}
        const ref = Firebase.database().ref('games/test_game/squares').push(wordObject);
        this.onSelect(ref.key);
        this.inputEl.value = "";
    }

    onSelect(key) {
        this.props.onSelect(key);
        this.props.close();
        this.wordRef.off();
    }

    render() {
        return (
            <div>
                <ul>
                    { this.state.words.map(d => <li key = {d.key} onClick={() => this.onSelect(d.key)}> {d.text} </li>) }
                </ul>
                <form onSubmit={this.addSquare.bind(this)}>
                    <input type = "text"  value = "Add new" ref = 
                        { el => this.inputEl = el} />
                    <input type = "submit" value = "Submit"/>
                </form>
                
            </div>
        );
    }
}