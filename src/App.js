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
import megaformerFloor from './img/megaformer-floor.svg';

import megaformerFacingForward from './img/megaformer-facing-forward.svg';
import megaformerFacingReverse from './img/megaformer-facing-reverse.svg';
import megaformerFacingSide from './img/megaformer-facing-side.svg';

import megaformerCablesBlack from './img/megaformer-cables-black.svg';
import megaformerCablesRed from './img/megaformer-cables-red.svg';


/* ListModal component */
class ListModal extends Component {
  render() {
    /*if (!this.props.show) {
      return null;
    }*/
    return (
      <div className={this.props.showList ? 'list-modal' : 'list-modal list-modal-off'}>
        <div>{this.props.children}</div>
        <div >
          <button onClick={this.props.onClose}>Close Panel</button>
        </div>
      </div>
    );
  }
}
ListModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  showList: PropTypes.bool.isRequired
}

/* Modal component */
class Modal extends Component {
  render() {
    /*if (!this.props.show) {
      return null;
    }*/
    return (
      <div className={this.props.show ? 'modal' : 'modal off'}>
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
      springCost.push(<div key={i} className='red springs'> </div>)
    }
    for (let j = 0; j < yellow; j++) {
      springCost.push(<div key={j} className='yellow springs'> </div>)
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
      locationImage = megaformerFloor;
    }
    return(
      <img src={locationImage} alt="Megaformer" />
    )
  }

  getDirection(direction) {
    let directionImage;
    if (direction === "forward") {
      directionImage = megaformerFacingForward;
    } else if (direction === "reverse") {
      directionImage = megaformerFacingReverse;
    } else if (direction === "side") {
      directionImage = megaformerFacingSide;
    }
    return(
      <img src={directionImage} alt="Direction Facing" />
    )
  }

  formatMuscleGroupName(muscle) {
    muscle = muscle.split('_').join(' ');

    muscle = muscle
    .toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

    return muscle;
  }

  getMoveName(move_id) {
    return this.props.moves.filter(move => move.id === move_id).length > 0 ? 
      this.props.moves.filter(move => move.id === move_id)[0].name.toString() : '';
  }

  render() {
    return (
        <div ref={this.props.move.id} key={this.props.move.id}>

            <div className='move-name'>{this.props.move.name}</div>
            
            {this.getSpringCount(this.props.move.red_springs, this.props.move.yellow_springs)}

            <div className='image-wrapper'>
              
              <div className="hover-label hover-label-right">
                <FontAwesome
                  name='check-circle'
                />
              </div>
              <div className="hover-label hover-label-left">
                <FontAwesome
                  name='times-circle'
                />
              </div>

              <div className='megaformer-image'>

                {/* locations: front, back, carriage, floor */}              
                {this.props.move.location.map(location =>
                  this.getLocation(location)
                )}

                {/* Get the direction arrows (forward, reverse, side) */}
                {this.getDirection(this.props.move.direction)}
                
                {/* Devon, get the cables */}
                {this.props.move.black_cables ? 
                  <img src={megaformerCablesBlack} alt="Black Cables" /> : ''
                }
                {this.props.move.red_cables ? 
                  <img src={megaformerCablesRed} alt="Red Cables" /> : '' 
                }

                <img src={megaformerVector} alt="Megaformer Vector" />
              </div>

              <div className='move-time'>
                <FontAwesome name='clock' />&nbsp;{this.props.move.duration}:00
              </div>

              {/*<div className='move-block-level-action'>
                <span className='level'>{this.props.move.level}</span>
                <br />
                <span className='action'>{this.listItems(this.props.move.action)}</span>
                <br />
                <span className='block'>{this.props.move.block}</span>
              </div>*/}

            </div>

            {/* Used for extra info not yet surfaced on the cards 0.654485 */}

            {/*<div className='line-break'>Direction Facing: {this.props.move.direction}</div>*/}
            
            {this.props.move.primary_muscles.length > 0 ?
              <div className='line-break'>Primary Muscles:  {
                this.formatMuscleGroupName(this.listItems(this.props.move.primary_muscles))}
              </div> : ''
            }
            
            {this.props.move.secondary_muscles.length > 0 ?
              <div className='line-break'>Secondary Muscles: { 
                this.formatMuscleGroupName(this.listItems(this.props.move.secondary_muscles)) }
              </div> : ''
            }

            {this.props.move.related.length > 0 ? 
              <div className='related'>Related Moves: {
                this.props.move.related.map((move, id) => {
                  return id !== this.props.move.related.length - 1 ?
                    this.getMoveName(move) + ', ' : this.getMoveName(move);
                }) 
              }
              </div> : ''
            }
            
            <div className='yes-no-button-group'>
              <button className='no' onClick={this.props.onNoClick}>
                <FontAwesome
                  name='times-circle'
                />
              </button>
              <button className='yes' onClick={this.props.onYesClick}>
                <FontAwesome
                  name='check-circle'
                />
              </button>
            </div>
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
      showList: false,
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

      console.log('manual card thrown = ', card);

      // throwOut method call
      card.throwOut(50, 50, dir);
    }
  }

  // Shuffles the array of cards/moves
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

  showListModal = () => {
    this.setState(prev=>({
      showList: !prev.showList
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
              /*throwout={e => console.log('throwout', e.target.id)}*/
              throwin={e => e.target.classList.remove('drag') }
              dragstart={e => e.target.classList.add('drag') }
              dragend={e => e.target.querySelectorAll('.hover-label').forEach((elem) => { 
                elem.style.opacity = 0;
                elem.style.visibility = 'hidden';
                elem.classList.remove('drag');
              })}
              config={{
                allowedDirections:[ReactSwing.DIRECTION.LEFT, ReactSwing.DIRECTION.RIGHT],
                throwOutDistance: () => Math.max(window.innerWidth/4, window.innerHeight),
                throwOutConfidence: (xOffset, yOffset, element) => {
                  // Yes/No label appearance code
                  let direction = (parseInt(xOffset) / parseInt(element.offsetWidth)) * 1.7;
                  if (direction > 0) {
                    // Visibility
                    element.querySelector('.hover-label-right').style.visibility = 'visible';
                    element.querySelector('.hover-label-left').style.visibility = 'hidden';
                    // Opacity
                    element.querySelector('.hover-label-right').style.opacity = Math.min(direction.toFixed(2), 1);
                  } else if (direction < -0) {
                    // Visibility
                    element.querySelector('.hover-label-left').style.visibility = 'visible';
                    element.querySelector('.hover-label-right').style.visibility = 'hidden';
                    // Opacity
                    element.querySelector('.hover-label-left').style.opacity = Math.min(-direction.toFixed(2), 1);
                  }

                  // Decide if throw was successful
                  const xConfidence = Math.min(Math.abs(xOffset) / element.offsetWidth, 1);
                  const yConfidence = Math.min(Math.abs(yOffset) / element.offsetHeight, 1);
              
                  return Math.max(xConfidence, yConfidence);
                }
              }}
              
            >
              {this.state.moveData.moves.map(move => (
                /* Move Card, the wrapper div is used for stack drop area */
                <div 
                  key={move.id}
                  id={move.id}
                  className='card'
                >
                    <MoveCard onNoClick={this.throwCard.bind(this, ReactSwing.DIRECTION.LEFT)} 
                              onYesClick={this.throwCard.bind(this, ReactSwing.DIRECTION.RIGHT)} move={move} moves={this.state.moveData.moves} />
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
              <button type="button" onClick={e => { this.showListModal(); }}>
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
              <p><b>3/2/2020 Updates:</b> Added cable images, move duration, and related moves to each card.</p>
            </div>
          </Modal>

          <ListModal onClose={this.showListModal} showList={this.state.showList}>
            Move list view panel (selected moves will go here)<br />
            <div style={{textAlign:'left'}}>
              <p>LIST</p>
            </div>
          </ListModal>
      </div>
    );
  }
}

export default App;