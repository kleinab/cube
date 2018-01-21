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
    for (var z = 0; z < 4; z++) {
      for (var y = 0; y < 4; y++) {
        for (var x = 0; x < 4; x++) {
          this.blocks.push(new Block(0, x, y, z));
        }
      }
    }
    this.cube = new Cube(this.blocks);
    this.cube.faces[Orientation.FRONT].slide(Direction.UP);
  }
}
export { Game };

class Cube {
  constructor(blocks) {
    this.blocks = blocks;
    this.faces = {
      'front': new Face(this.getZPlane(3).sort((a, b) => this.toEq(a.x, -a.y) - this.toEq(b.x, -b.y))),
      'right': new Face(this.getXPlane(3).sort((a, b) => this.toEq(-a.z, -a.y) - this.toEq(-b.z, -b.y))),
      'back': new Face(this.getZPlane(0).sort((a, b) => this.toEq(-a.x, -a.y) - this.toEq(-b.x, -b.y))),
      'left': new Face(this.getXPlane(0).sort((a, b) => this.toEq(a.z, -a.y) - this.toEq(b.z, -b.y))),
      'top': new Face(this.getYPlane(3).sort((a, b) => this.toEq(a.x, a.z) - this.toEq(b.x, b.z))),
      'bottom': new Face(this.getYPlane(0).sort((a, b) => this.toEq(-a.x, -a.z) - this.toEq(-b.x, -b.z)))
    };
  }

  getXPlane(x) {
    return this.blocks.filter((block) => block.x === x);
  }
  getYPlane(y) {
    return this.blocks.filter((block) => block.y === y);
  }
  getZPlane(z) {
    return this.blocks.filter((block) => block.z === z);
  }

  toEq(x, y) {
    return 4 * y + x;
  }
}

class Face {
  constructor(blocks) {
    this.blocks = blocks;
  }

  slide(direction) {
    switch(direction) {
      case Direction.RIGHT:
        this.collapse([3, 2, 1, 0]);
        this.collapse([7, 6, 5, 4]);
        this.collapse([11, 10, 9, 8]);
        this.collapse([15, 14, 13, 12]);
        this.blocks[12].setVal(1);
        break;
      case Direction.LEFT:
        this.collapse([0, 1, 2, 3]);
        this.collapse([4, 5, 6, 7]);
        this.collapse([8, 9, 10, 11]);
        this.collapse([12, 13, 14, 15]);
        this.blocks[15].setVal(1);
        break;
      case Direction.UP:
        this.collapse([0, 4, 8, 12]);
        this.collapse([1, 5, 9, 13]);
        this.collapse([2, 6, 10, 14]);
        this.collapse([3, 7, 11, 15]);
        this.blocks[12].setVal(1);
        break;
      case Direction.DOWN:
        this.collapse([12, 8, 4, 0]);
        this.collapse([13, 9, 5, 1]);
        this.collapse([14, 10, 6, 2]);
        this.collapse([15, 11, 7, 3]);
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
  constructor(val, x, y, z) {
    this.val = val;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  setVal(val) {
    this.val = val;
  }
}
export { Block };
