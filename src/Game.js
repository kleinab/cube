export const Orientation = {
  FRONT: 'front',
  RIGHT: 'right',
  BACK: 'back',
  LEFT: 'left',
  TOP: 'top',
  BOTTOM: 'bottom'
};

export const Direction = {
  RIGHT: 'right',
  LEFT: 'left',
  UP: 'up',
  DOWN: 'down'
}

class Game {
  constructor() {
    this.blocks = [];
    for (var i = 0; i < 8; i++) {
      this.blocks.push(new Block(0));
    }
    this.blocks[2].setVal(1);
    this.cube = new Cube(this.blocks);
  }
}
export { Game };

class Cube {
  constructor(blocks) {
    this.blocks = blocks;
    this.faces = {
      'front': new Face(this.getBlocks([0, 1, 2, 3])),
      'right': new Face(this.getBlocks([1, 4, 3, 6])),
      'back': new Face(this.getBlocks([4, 5, 6, 7])),
      'left': new Face(this.getBlocks([5, 0, 7, 2])),
      'top': new Face(this.getBlocks([5, 4, 0, 1])),
      'bottom': new Face(this.getBlocks([2, 3, 7, 6]))
    };
  }

  getBlocks(indices) {
    return indices.map((idx) => this.blocks[idx]);
  }
}

class Face {
  constructor(blocks) {
    this.blocks = blocks;
  }

  slide(direction) {
    switch(direction) {
      case Direction.RIGHT:
        this.collapse([1, 0]);
        this.collapse([3, 2]);
        this.blocks[2].setVal(1);
        break;
      case Direction.LEFT:
        this.collapse([0, 1]);
        this.collapse([2, 3]);
        this.blocks[3].setVal(1);
        break;
      case Direction.UP:
        this.collapse([0, 2]);
        this.collapse([1, 3]);
        this.blocks[2].setVal(1);
        break;
      case Direction.DOWN:
        this.collapse([2, 0]);
        this.collapse([3, 1]);
        this.blocks[0].setVal(1);
        break;
      default:
        throw new Error("invalid direction " + direction);
    }
  }

  collapse(blockIndices) {
    var vals = blockIndices.map((i) => this.blocks[i].val);
    vals = vals.filter((v) => v !== 0);
    for (var i = 0; i < vals.length - 1; i++) {
      if (vals[i] === vals[i + 1]) {
        vals[i] = vals[i] * 2;
        vals.splice(i + 1, 1);
      }
    }
    vals = vals.concat(Array(blockIndices.length - vals.length).fill(0));
    blockIndices.forEach((idx, i) => this.blocks[idx].setVal(vals[i]));
  }
}
export { Face };

class Block {
  constructor(val) {
    this.val = val;
  }

  setVal(val) {
    this.val = val;
  }
}
export { Block };
