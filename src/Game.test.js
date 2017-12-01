import React from 'react';
import { Game, Face, Block } from './Game';

it('starts a game', () => {
  const game = new Game();
});

describe('collapses blocks in a face', () => {
  it ('collapses blocks', () => {
    const blocks = [
      new Block(1),
      new Block(1)];
    const face = new Face(blocks);
    face.collapse([0, 1]);
    expect(blocks[0].val).toEqual(2);
    expect(blocks[1].val).toEqual(0);
  });

  it ('collapses blocks in reverse order', () => {
    const blocks = [
      new Block(2),
      new Block(2)];
    const face = new Face(blocks);
    face.collapse([1, 0]);
    expect(blocks[0].val).toEqual(0);
    expect(blocks[1].val).toEqual(4);
  });

  it ('collapses blocks with leading 0s', () => {
    const blocks = [
      new Block(0),
      new Block(1)];
    const face = new Face(blocks);
    face.collapse([0, 1]);
    expect(blocks[0].val).toEqual(1);
    expect(blocks[1].val).toEqual(0);
  });

  it ('collapses blocks that are not equal', () => {
    const blocks = [
      new Block(2),
      new Block(1)];
    const face = new Face(blocks);
    face.collapse([0, 1]);
    expect(blocks[0].val).toEqual(2);
    expect(blocks[1].val).toEqual(1);
  });

  it ('collapses only blocks listed in params', () => {
    const blocks = [
      new Block(1),
      new Block(1),
      new Block(2),
      new Block(2)];
    const face = new Face(blocks);
    face.collapse([0, 1]);
    expect(blocks[0].val).toEqual(2);
    expect(blocks[1].val).toEqual(0);
    expect(blocks[2].val).toEqual(2);
    expect(blocks[3].val).toEqual(2);
  });

  it ('collapses multiple pairs of blocks', () => {
    const blocks = [
      new Block(1),
      new Block(1),
      new Block(1),
      new Block(1)];
    const face = new Face(blocks);
    face.collapse([0, 1, 2, 3]);
    expect(blocks[0].val).toEqual(2);
    expect(blocks[1].val).toEqual(2);
    expect(blocks[2].val).toEqual(0);
    expect(blocks[3].val).toEqual(0);
  });

  it ('does not collapse a block into a previously collapsed block', () => {
    const blocks = [
      new Block(0),
      new Block(1),
      new Block(1),
      new Block(2)];
    const face = new Face(blocks);
    face.collapse([0, 1, 2, 3]);
    expect(blocks[0].val).toEqual(2);
    expect(blocks[1].val).toEqual(2);
    expect(blocks[2].val).toEqual(0);
    expect(blocks[3].val).toEqual(0);
  });

  it ('does not collapse a previously collapsed block into another block', () => {
    const blocks = [
      new Block(0),
      new Block(2),
      new Block(1),
      new Block(1)];
    const face = new Face(blocks);
    face.collapse([0, 1, 2, 3]);
    expect(blocks[0].val).toEqual(2);
    expect(blocks[1].val).toEqual(2);
    expect(blocks[2].val).toEqual(0);
    expect(blocks[3].val).toEqual(0);
  });
});