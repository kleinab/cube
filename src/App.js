import React, { Component } from 'react';
import './App.css';
import { Orientation, Direction, Game } from './Game.js';

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
      activeFace: Orientation.FRONT,
      xRotation: 0,
      yRotation: 0
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
      xRotation: this.state.xRotation + 90,
      yRotation: this.state.yRotation + 90
    });
  }

  slide = (direction) => {
    this.state.faces[this.state.activeFace].slide(direction);
    this.setState({
      faces: this.props.cube.faces
    });
  }

  render() {
    const cubeStyle = {
      transform: "rotateX(" + this.state.xRotation + "deg) rotateY(" + this.state.yRotation + "deg)"
    }

    const faces = [];
    for (var key in Orientation) {
      var value = Orientation[key]
      faces.push(
        <Face orientation={value} face={this.state.faces[value]} />
      );
    }

    return (
      <div className="scene">
        <div className="cube" style={cubeStyle} onClick={this.rotateCube}>
          {faces}
        </div>
      </div>
    );
  }
}

class Face extends Component {
  render() {
    const blocks = this.props.face.blocks.map((block) => <Block val={block.val} />);

    return(
      <div className={"face " + this.props.orientation}>
        {blocks}
      </div>
    );
  }
}

class Block extends Component {
  render() {
    return(
      <div className="block" data-value={this.props.val}>
        <div className="content">{this.props.val}</div>
      </div>
    );
  }
}
