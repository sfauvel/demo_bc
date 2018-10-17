
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
  instance.setState({
	  transactions: [tx]
  });
  let txs = instance.transactionsNotInABlock();
  
  expect(txs.length).toBe(1);
})

test("All transactions are validate when one block contains all transactions", () => {
  const instance = buildJsx(<Blockchain/>);
  instance.setState({
	  transactions: [tx],
	  blocks: [{id:"1",transactions: [tx]}],
  });
  let txs = instance.transactionsNotInABlock();
  
  expect(txs.length).toBe(0);
})

test("Should return transaction not in a block", () => {
  const instance = buildJsx(<Blockchain/>);
  instance.setState({
	  transactions: [createTx(111), createTx(222), createTx(333)],
	  blocks: [{id:"1",transactions: [createTx(222)]}],
  });
  let txs = instance.transactionsNotInABlock();
  
  expect(txs.length).toBe(2);
})


test("Should find ancestor of the block", () => {
  const instance = buildJsx(<Blockchain/>);
  instance.setState({
	  blocks: [createBlock(1, 0), createBlock(2, 1), createBlock(3, 2)],
	  selectedBlock: 2
  });

  expect(instance.isBlockInSelectedChain(createBlock(1, 0))).toBe(true);
  expect(instance.isBlockInSelectedChain(createBlock(2, 1))).toBe(true);
  expect(instance.isBlockInSelectedChain(createBlock(3, 2))).toBe(false);
})

function buildJsx(jsx) {
  const component = renderer.create(jsx);
  return component.getInstance();
}