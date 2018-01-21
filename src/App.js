import React, { Component } from 'react';
import './App.css';
import { Orientation, Direction, Game } from './Game.js';

var orientations = [
  {name: Orientation.FRONT, xRotation: 0, yRotation: 0, zRotation: 0},
  {name: Orientation.RIGHT, xRotation: 0, yRotation: -90, zRotation: 0},
  {name: Orientation.BACK, xRotation: 0, yRotation: -180, zRotation: 0},
  {name: Orientation.LEFT, xRotation: 0, yRotation: -270, zRotation: 0},
  {name: Orientation.TOP, xRotation: -90, yRotation: 0, zRotation: 0},
  {name: Orientation.BOTTOM, xRotation: 90, yRotation: 0, zRotation: 90},
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: new Game()
    }
  }

  render() {
    return (
      <div className="app">
        <Cube cube={this.state.game.cube} />
      </div>
    );
  }
}
export default App;

class Cube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faces: this.props.cube.faces,
      activeFace: 0
    }
  }

  componentDidMount() {
    document.addEventListener("keyup", (e) => {
      console.log(e);
      switch(e.key) {
        case 'ArrowRight':
          this.slide(Direction.RIGHT);
          break;
        case 'ArrowLeft':
          this.slide(Direction.LEFT);
          break;
        case 'ArrowUp':
          this.slide(Direction.UP);
          break;
        case 'ArrowDown':
          this.slide(Direction.DOWN);
          break;
        default:
          return;
      }
    });
  }

  rotateCube = () => {
    this.setState({
      activeFace: (this.state.activeFace + 1) % orientations.length
    });
  }

  slide = (direction) => {
    this.state.faces[orientations[this.state.activeFace].name].slide(direction);
    this.setState({
      faces: this.props.cube.faces
    });
  }

  render() {
    const cubeStyle = {
      transform: "rotateX(" + orientations[this.state.activeFace].xRotation + "deg) rotateY(" + orientations[this.state.activeFace].yRotation + "deg)"
    }

    const faces = [];
    for (var key in Orientation) {
      var value = Orientation[key]
      faces.push(
        <Face orientation={value}
              face={this.state.faces[value]}
              rotation={orientations[this.state.activeFace].zRotation} />
      );
    }

    return (
      <div className="scene">
        <div className="cube"
             style={cubeStyle}
             onClick={this.rotateCube}>
          {faces}
        </div>
      </div>
    );
  }
}

class Face extends Component {
  render() {
    const blocks = this.props.face.blocks.map(
      (block) => <Block val={block.val} rotation={this.props.rotation} />);

    return(
      <div className={"face " + this.props.orientation}>
        {blocks}
      </div>
    );
  }
}

class Block extends Component {
  render() {
    const blockStyle = {
      transform: "rotate(" + this.props.rotation + "deg)"
    }

    return(
      <div className="block"
           style={blockStyle}
           data-value={this.props.val}>
        <div className="content">{this.props.val}</div>
      </div>
    );
  }
}
