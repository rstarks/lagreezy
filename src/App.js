import React, { Component } from 'react';
import PropTypes from "prop-types";
import ReactSwing from 'react-swing';
import './App.css';
import FontAwesome from 'react-fontawesome';

import moveData from "./data/moves.json";
import megaformerVector from './img/megaformer-isometric.svg';
import megaformerCarriage from './img/megaformer-carriage.svg';
import megaformerFront from './img/megaformer-front.svg';
import megaformerBack from './img/megaformer-back.svg';

/* Modal component */
class Modal extends Component {
  render() {
    if(!this.props.show) {
      return null;
    }
    return (
      <div className='modal'>
        <div className='logo'>Lagreezy</div>
        <div className='content'>{this.props.children}</div>
        <div >
          <button onClick={this.props.onClose}>Get Started</button>
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
}

/* MoveCard component generation code */
class MoveCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      move: this.props.move
    }
    this.listItems = this.listItems.bind(this);
    this.getLocation = this.getLocation.bind(this);
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

  getLocation(location) {
    let locationImage;
    if (location === "carriage") {
      locationImage = megaformerCarriage;
    } else if (location === "front") {
      locationImage = megaformerFront;
    } else if (location === 'back') {
      locationImage = megaformerBack;
    } else if (location === 'floor') {
      /*fix this later */
      locationImage = megaformerBack;
    }
    return(
      <img src={locationImage} alt="Megaformer" />
    )
  }

  render() {
    return (
        <div ref={this.props.move.id} key={this.props.move.id}>
            <div className='move-name'>{this.props.move.name}</div>
            
            {this.getSpringCount(this.props.move.red_springs, this.props.move.yellow_springs)}

            <div className='image-wrapper'>
              <div className='megaformer-image'>
              {/* locations: front, back, carriage, floor */}
              
              {this.props.move.location.map(location =>
                this.getLocation(location)
              )}
              <img src={megaformerVector} alt="Megaformer Vector" />
              
              
              </div>
            </div>

            <div className='move-block'><b>Block: </b>{this.props.move.block} - {this.props.move.level}</div>
            <div className='move-action'><b>Action: </b> {this.listItems(this.props.move.action)}</div>

            {/* Used for extra info not yet surfaced on the cards 0.654485 */}
            <div className='line-break'>{this.props.move.black_cables ? 'Black Cables' : '' }</div>
            <div className='line-break'>{this.props.move.red_cables ? 'Red Cables' : '' }</div>

            <div className='line-break'>Direction Facing: {this.props.move.direction}</div>
            
            <div className='line-break'>Duration: {this.props.move.duration}:00</div>

            <div className='line-break'>Primary Muscles: {this.listItems(this.props.move.primary_muscles)}</div>

            <div className='line-break'>Secondary Muscles: {this.listItems(this.props.move.secondary_muscles)}</div>
            
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
    this.config = {
      throwOutDistance: () => Math.max(window.innerWidth, window.innerHeight),
      throwOutConfidence: () => 1,
      allowedDirections: [
        ReactSwing.DIRECTION.LEFT,
        ReactSwing.DIRECTION.RIGHT,
      ]
    };
    // Update the state with jsonData
    this.state = {
      show: true,
      moveData,
      stack: null
    };
    this.shuffle = this.shuffle.bind(this);
    this.shuffle(this.state.moveData.moves);

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
      card.throwOut(50, 50, dir);
    }
  }

  shuffle(arr) {
    var i,
        j,
        temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;    
  };

  showModal = () => {
    this.setState(prev=>({
      show: !prev.show
    }));
  };

  render() {
    return (
      <div className="App">
          <div className='logo' id="header">
            <button onClick={e => { this.showModal(); }}>Lagreezy</button>
          </div>
          <div id="viewport">
            <ReactSwing
              className="stack"
              tagName="div"
              setStack={stack => this.setState({ 
                stack
              })}
              ref={this.stackEl}
              throwout={e => console.log('throwout', e)} 
              config={{
                allowedDirections:[ReactSwing.DIRECTION.LEFT, ReactSwing.DIRECTION.RIGHT],
                throwOutDistance: () => Math.max(window.innerWidth/4, window.innerHeight),
                throwOutConfidence: (xOffset, yOffset, element) => {
                  const xConfidence = Math.min(Math.abs(xOffset) / element.offsetWidth, 1);
                  const yConfidence = Math.min(Math.abs(yOffset) / element.offsetHeight, 1);
              
                  return Math.max(xConfidence, yConfidence);
                }
              }}
              
            >
              {this.state.moveData.moves.map(move => (
                /* Move Card, the wrapper div is used for stack drop area */
                <div 
                  className='card'
                >
                    <MoveCard move={move} />
                </div>
              ))}
            </ReactSwing>
          </div>
          <div id="footer"> 
            
            {/* Profile panel button onClick={this.throwCard.bind(this, ReactSwing.DIRECTION.LEFT)} */}
            <div className="control">
              <button type="button">
              <FontAwesome
                name='user'
              />
              </button>
            </div>
            
            {/* Card panel button, default  onClick={this.throwCard.bind(this, ReactSwing.DIRECTION.RIGHT)} */}
            <div className="control">
              <button type="button">
                <FontAwesome
                  name='layer-group'
                />
              </button>
            </div>

            {/* Graph panel button onClick={this.throwCard.bind(this, ReactSwing.DIRECTION.RIGHT)} */}
            <div className="control">
              <button type="button" >
                <FontAwesome
                  name='bar-chart'
                />
              </button>
            </div>
          </div>
          <Modal onClose={this.showModal} show={this.state.show}>
            Welcome to Lagreezy! <br />
            <div style={{textAlign:'left'}}>
              <p>This is a prototype of an app designed for Lagree trainers and enthusiasts.</p>
              <p>Currently you can swipe <i>(left or right)</i> through cards with each of the moves featured on the official website. More features and moves will be added soon!</p>
            </div>
          </Modal>
      </div>
    );
  }
}

export default App;