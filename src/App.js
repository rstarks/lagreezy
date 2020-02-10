import React, { Component } from 'react';
import ReactSwing from 'react-swing';
import './App.css';
import moveData from "./data/moves.json";

/* TODO: Fix this shit */
class MoveCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      move: this.props.move
    }
    this.listItems = this.listItems.bind(this);
  }

  // Refactor later into something more interesting
  listItems(list) {
    return (list.length > 0) ? list.join(', ') : '';
  }

  render() {
    return (
        <div className='card' ref={this.props.move.id} key={this.props.move.id}>
            {/* Name */}
            <div style={{fontWeight:'bold'}}>{this.props.move.name}</div>

            <div>Block: {this.props.move.block}</div>

            <div>Yellow Springs: {this.props.move.yellow_springs}</div>
            <div>Red Springs: {this.props.move.red_springs}</div>

            <div>{this.props.move.black_cables ? 'Black Cables' : '' }</div>
            <div>{this.props.move.red_cables ? 'Red Cables' : '' }</div>

            <div className='line-break'>Location: {this.listItems(this.props.move.location)}</div>

            <div>Direction Facing: {this.props.move.direction}</div>

            <div>Duration: {this.props.move.duration}:00</div>

            <div className='line-break'>Primary Muscles: {this.listItems(this.props.move.primary_muscles)}</div>

            <div className='line-break'>Secondary Muscles: {this.listItems(this.props.move.secondary_muscles)}</div>

            <div>{this.props.move.level}</div>

            <div className='line-break'>Action: {this.listItems(this.props.move.action)}</div>
            <div className='line-break'>Related Moves: {this.listItems(this.props.move.related)}</div>
          </div>
    )
  }
}

class App extends Component {
  stackEl = React.createRef();

  constructor(props, context) {
    super(props, context);
    // Update the state with jsonData
    this.state = {
      moveData,
      stack: null
    };
    this.listItems = this.listItems.bind(this);
  }

  // Refactor later into something more interesting
  listItems(list) {
    return (list.length > 0) ? list.join(', ') : '';
  }

  // Card throw method
  throwCard() {
    // ReactSwing Card Directions
    console.log('ReactSwing.DIRECTION', ReactSwing.DIRECTION);
    console.log('this.state.stack', this.state.stack);
    console.log('this.state.stack.getConfig', this.state.stack.getConfig());
    console.log('this.stackEl', this.stackEl);

    // ReactSwing Component Childrens
    const targetEl = this.stackEl.current.childElements[1];
    console.log('targetEl', targetEl);

    if (targetEl && targetEl.current) {
      // stack.getCard
      const card = this.state.stack.getCard(targetEl.current);

      console.log('card', card);

      // throwOut method call
      card.throwOut(100, 200, ReactSwing.DIRECTION.RIGHT);
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <div id="viewport">
            {this.state.moveData.moves.map(move => (
            <MoveCard move={move} /> ))}

            <ReactSwing
              className="stack"
              tagName="div"
              setStack={stack => this.setState({ stack })}
              ref={this.stackEl}
              throwout={e => console.log('throwout', e)}
            >
                {this.state.moveData.moves.map(move => (
                  /* Move Card */
                  <div className='card' ref={move.id} key={move.id}>

                    <div style={{fontWeight:'bold'}}>{move.name}</div>

                    <div>Block: {move.block}</div>

                    <div>Yellow Springs: {move.yellow_springs}</div>
                    <div>Red Springs: {move.red_springs}</div>

                    <div>{move.black_cables ? 'Black Cables' : '' }</div>
                    <div>{move.red_cables ? 'Red Cables' : '' }</div>

                    <div className='line-break'>Location: {this.listItems(move.location)}</div>

                    <div>Direction Facing: {move.direction}</div>

                    <div>Duration: {move.duration}:00</div>

                    <div className='line-break'>Primary Muscles: {this.listItems(move.primary_muscles)}</div>

                    <div className='line-break'>Secondary Muscles: {this.listItems(move.secondary_muscles)}</div>

                    <div>{move.level}</div>

                    <div className='line-break'>Action: {this.listItems(move.action)}</div>
                    <div className='line-break'>Related Moves: {this.listItems(move.related)}</div>
                  </div>
                ))}
              {/*
                  children elements is will be Card
              
              <div className="card clubs" ref="card1" throwout={e => console.log('card throwout', e)}>
                ♣
              </div>
              <div className="card diamonds" ref="card2">
                ♦
              </div>
              <div className="card hearts" ref="card3">
                ♥
              </div>
              <div className="card spades" ref="card4">
                ♠
              </div>*/}
            </ReactSwing>
          </div>
          <div className="control">
            <button type="button" onClick={this.throwCard.bind(this)}>
              throw Card
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;