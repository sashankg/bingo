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
        let wordRef = Firebase.database().ref('games/test_game/squares');
        wordRef.on('child_added', snapshot => {
            let word = {
                "text" : snapshot.val().text,
                 "isCrossed" : snapshot.val().isCrossed};
            this.setState({words : [word].concat(this.state.words)})
        })
    }

    addMessage(e)
    {

        e.preventDefault();
        var wordObject = {"text" : this.inputEl.value, "isCrossed" : false}
        Firebase.database().ref('games/test_game/squares').push(wordObject);
        this.inputEl.value = {};
    }

    onMessageClick()
    {
        console.log("I clicked")
    }
    
    render() {
        return (
            <div>
                <ul>
                    { this.state.words.map( d => <li key = {d.text} onClick= {this.onMessageClick}> {d.text}  </li> ) }
                </ul>
                <form onSubmit={this.addMessage.bind(this)}>
                    <input type = "text"  value = "Add new" ref = 
                        { el => this.inputEl = el} />
                    <input type = "submit" value = "Submit"/>
                </form>
                
            </div>
        );
    }
}