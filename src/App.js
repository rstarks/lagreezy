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

  getSpringCount(red, yellow) {
    let springCost = [];
    for (let i = 0; i < red; i++) {
      springCost.push(<div className='red springs'> </div>)
    }
    for (let j = 0; j < yellow; j++) {
      springCost.push(<div className='yellow springs'> </div>)
    }
    return (
      <div className='spring-box'>
        {springCost}
      </div>
    )
  }

  render() {
    return (
        <div className='card' ref={this.props.move.id} key={this.props.move.id}>
            <div className='move-name'>{this.props.move.name}</div>
            
            {this.getSpringCount(this.props.move.red_springs, this.props.move.yellow_springs)}

            <div className='megaformer-image'> </div>

            <div>Block: {this.props.move.block}</div>

            <div>{this.props.move.black_cables ? 'Black Cables' : '' }</div>
            <div>{this.props.move.red_cables ? 'Red Cables' : '' }</div>

            <div className='line-break'>Location: {this.listItems(this.props.move.location)}</div>

            <div>Direction Facing: {this.props.move.direction}</div>

            <div>Duration: {this.props.move.duration}:00</div>

            <div className='line-break'>Primary Muscles: {this.listItems(this.props.move.primary_muscles)}</div>

            <div className='line-break'>Secondary Muscles: {this.listItems(this.props.move.secondary_muscles)}</div>

            <div>{this.props.move.level}</div>

            <div className='line-break'>Action: {this.listItems(this.props.move.action)}</div>
            {/*<div className='line-break'>Related Moves: {this.listItems(move.related)}</div>*/}
          
          </div>
    )
  }
}

class App extends Component {
  stackEl = React.createRef();
  counter = 1;
  constructor(props, context) {
    super(props, context);
    // Update the state with jsonData
    this.state = {
      moveData,
      stack: null
    };
  }

  // Card throw method
  throwCard(dir) {
    // ReactSwing Card Directions
    console.log('ReactSwing.DIRECTION', ReactSwing.DIRECTION);
    console.log('this.state.stack', this.state.stack);
    console.log('this.state.stack.getConfig', this.state.stack.getConfig());
    console.log('this.stackEl', this.stackEl);

    // ReactSwing Component Childrens

    const targetEl = this.stackEl.current.childElements[this.stackEl.current.childElements.length - this.counter];
    this.counter++;
    console.log('targetEl', targetEl);

    if (targetEl && targetEl.current) {
      // stack.getCard
      const card = this.state.stack.getCard(targetEl.current);

      console.log('card', card);

      // throwOut method call
      card.throwOut(100, 100, dir);
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <div id="viewport">
            <ReactSwing
              className="stack"
              tagName="div"
              setStack={stack => this.setState({ stack })}
              ref={this.stackEl}
              throwout={e => console.log('throwout', e)}
            >
              {this.state.moveData.moves.map(move => (
                /* Move Card */
                <div>
                  <MoveCard move={move} />
                </div>
              ))}
            </ReactSwing>
          </div>
          <div className="control">
            <button type="button" onClick={this.throwCard.bind(this, ReactSwing.DIRECTION.LEFT)}>
              no
            </button>
            <button type="button" onClick={this.throwCard.bind(this, ReactSwing.DIRECTION.RIGHT)}>
              yes
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;