
import React from 'react';

import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';


import Blockchain from './Blockchain.js';


configure({adapter: new Adapter()});

const tx = {
  id:"123456789",
  user: "Bob",
  x: 34,
  y: 67
};

function createTx(id) {
	return {
		  id:id,
		  user: "Bob",
		  x: 34,
		  y: 67
		};
}

function createBlock(id, parentId) {
	return {
		  id:id,
		  parentId: parentId

		};
}

const block = {
  id:"876543",
  transactions: []
};

test("All transactions are not validate when no block", () => {
  const instance = buildJsx(<Blockchain/>);
  const dataBlocks = [];
  instance.setState({
	  transactions: [tx],
  	  blocks: dataBlocks,
  	  blocksMap: instance.buildBlocksMap(dataBlocks)
  	
  });
  let txs = instance.transactionsNotInABlock();
  
  expect(txs.length).toBe(1);
})

test("All transactions are validate when one block selected contains all transactions", () => {
  const instance = buildJsx(<Blockchain/>);
  const dataBlocks = [{id:"1",transactions: [tx]}];
  instance.setState({
	  transactions: [tx],
  	  blocks: dataBlocks,
  	  blocksMap: instance.buildBlocksMap(dataBlocks),
  	  selectedBlock:1
  });
  let txs = instance.transactionsNotInABlock();
  
  expect(txs.length).toBe(0);
})

test("Should return transaction not in a block", () => {
  const instance = buildJsx(<Blockchain/>);
  const dataBlocks = [{id:"1",transactions: [createTx(222)]}];
  instance.setState({
	  transactions: [createTx(111), createTx(222), createTx(333)],
	  blocks: dataBlocks,
  	  blocksMap: instance.buildBlocksMap(dataBlocks),
  	  selectedBlock:1
  });
  let txs = instance.transactionsNotInABlock();
  
  expect(txs.length).toBe(2);
})


test("Should find ancestor of the block", () => {
  const instance = buildJsx(<Blockchain/>);
  const dataBlocks = [createBlock(1, 0), createBlock(2, 1), createBlock(3, 2)];
  instance.setState({
	  blocks: dataBlocks,
	  blocksMap: instance.buildBlocksMap(dataBlocks),
	  selectedBlock: 2
  });

  expect(instance.isBlockInSelectedChain(createBlock(1, 0))).toBe(true);
  expect(instance.isBlockInSelectedChain(createBlock(2, 1))).toBe(true);
  expect(instance.isBlockInSelectedChain(createBlock(3, 2))).toBe(false);
})

test("Should find block in selected chain", () => {
  const instance = buildJsx(<Blockchain/>);
  const dataBlocks = [createBlock(1, 0), createBlock(2, 1), createBlock(3, 2)];
  instance.setState({
	  blocks: dataBlocks,
	  blocksMap: instance.buildBlocksMap(dataBlocks),
	  selectedBlock: 2
  });
  expect(instance.getBlockInSelectedChain().size).toBe(2);
  expect(instance.getBlockInSelectedChain().has(1)).toBe(true);
  expect(instance.getBlockInSelectedChain().has(2)).toBe(true);
  expect(instance.getBlockInSelectedChain().has(3)).toBe(false);
})

test("Should find head block when only one", () => {
  const instance = buildJsx(<Blockchain/>);
  const dataBlocks = [createBlock(1, 0)];
  instance.setState({
	  blocks: dataBlocks,
	  blocksMap: instance.buildBlocksMap(dataBlocks)
  });
  expect(instance.getHeadBlock()).toBe(1);
})

test("Should find head block when a chain", () => {
  const instance = buildJsx(<Blockchain/>);
  const dataBlocks = [createBlock(1, 0), createBlock(2, 1), createBlock(3, 2)];
  instance.setState({
	  blocks: dataBlocks,
	  blocksMap: instance.buildBlocksMap(dataBlocks)
  });
  expect(instance.getHeadBlock()).toBe(3);
})

test("Should find one head block when there is two", () => {
  const instance = buildJsx(<Blockchain/>);
  const dataBlocks = [createBlock(1, 0), createBlock(2, 1), createBlock(3, 2), createBlock(4, 2)];
  instance.setState({
	  blocks: dataBlocks,
	  blocksMap: instance.buildBlocksMap(dataBlocks)
  });
  const head = instance.getHeadBlock();
  expect(head===3 || head===4).toBe(true);
})


test("Should find head block with longest chain when more than one: case A", () => {
  const instance = buildJsx(<Blockchain/>);
  const dataBlocks = [createBlock(1, 0), createBlock(2, 1), 
	  createBlock(30, 2), 
	  createBlock(31, 30), 
	  createBlock(32, 31),
	  createBlock(40, 2),
	  createBlock(41, 40)];
  instance.setState({
	  blocks: dataBlocks,
	  blocksMap: instance.buildBlocksMap(dataBlocks)
  });
  expect(instance.getHeadBlock()).toBe(32);
})

test("Should find head block with longest chain when more than one: case B", () => {
  const instance = buildJsx(<Blockchain/>);
  const dataBlocks = [createBlock(1, 0), createBlock(2, 1), 
	  createBlock(30, 2), 
	  createBlock(31, 30),
	  createBlock(40, 2),
	  createBlock(41, 40),
	  createBlock(42, 41)];
  instance.setState({
	  blocks: dataBlocks,
	  blocksMap: instance.buildBlocksMap(dataBlocks)
  });
  expect(instance.getHeadBlock()).toBe(42);
})


function buildJsx(jsx) {
  const component = renderer.create(jsx);
  return component.getInstance();
}