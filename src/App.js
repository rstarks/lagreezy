import React, { Component } from 'react';
import './App.css';
import moveData from "./data/moves.json";

class App extends Component {
  constructor() {
    super();
    // Update the state with jsonData
    this.state = {
      moveData
    };
    this.listItems = this.listItems.bind(this);
  }

  // Refactor later into something more interesting
  listItems(list) {

    return (list.length > 0) ? list.join(', ') : '';
  }

  checkBoolean(value) {

  }

  render() {
    return (
      <div className="App">
        {this.state.moveData.moves.map(move => (
          /* Move Card */
          <div className='move-card' key={move.id}>
            {/* Name */}
            <div style={{fontWeight:'bold'}}>{move.name}</div>

            <div>Block: {move.block}</div>

            <div>Yellow Springs: {move.yellow_springs}</div>
            <div>Red Springs: {move.red_springs}</div>

            <div>{move.black_cables ? 'Black Cables' : '' }</div>
            <div>{move.red_cables ? 'Red Cables' : '' }</div>

            <div className='line-break'>Location: {this.listItems(move.location)}</div>

            <div>Direction Facing:{move.direction}</div>

            <div>Duration: {move.duration}:00</div>

            <div className='line-break'>Primary Muscles: {this.listItems(move.primary_muscles)}</div>

            <div className='line-break'>Secondary Muscles: {this.listItems(move.secondary_muscles)}</div>

            <div>{move.level}</div>

            <div className='line-break'>Action: {this.listItems(move.action)}</div>
            <div className='line-break'>Related Moves: {this.listItems(move.related)}</div>


          </div>
        ))}
      </div>
    );
  }
}

export default App;