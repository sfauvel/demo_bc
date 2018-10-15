
import React from 'react';

import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';


import Transaction from './Transaction.js';


configure({adapter: new Adapter()});

const tx = {
  id:"123456789",
  user: "Bob",
  x: 34,
  y: 67
};

test("Transaction content", () => {
	const product = shallow(<Transaction tx={tx} selected/>);
	console.log(product.debug());
  
	expect(product.debug()).toEqual(
			expect.stringContaining("..6789 Bob:34/67")
	);
})

test("Transaction classname not selected", () => {
	const product = shallow(<Transaction tx={tx}/>);
	console.log(product.debug());
  
	expect(product.debug()).toEqual(
			expect.not.stringContaining("selected")
	);
})

test("Transaction classname selected", () => {
	const product = shallow(<Transaction tx={tx} selected/>);
	console.log(product.debug());
  
	expect(product.debug()).toEqual(
			expect.stringContaining("transaction selected")
	);
})
 
test("Transaction call event on click", () => {
	let nbClick = 0;
	function click() { nbClick++; }
	const component = shallow(<Transaction tx={tx} selected  handler={click}/>);

	component.simulate("click")
	expect(nbClick).toBe(1);
})



function buildJsx(jsx) {
  const component = renderer.create(jsx);
  return component.getInstance();
}
