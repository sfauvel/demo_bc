
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
  const instance = buildJsx(<Transaction tx={tx}/>);
  expect(instance.state.content).toBe("..6789 Bob:34/67");
})

test("Transaction className", () => {
  const instance = buildJsx(<Transaction tx={tx}/>);

  expect(instance.state.className).toBe("transaction");
})

test("Transaction className selected", () => {
  const instance = buildJsx(<Transaction tx={tx} selected/>);
  expect(instance.state.className).toBe("transaction selected");
})


test("Transaction with enzyme", () => {
	const product = shallow(<Transaction tx={tx} selected/>);
	console.log(product.debug());
  
	expect(product.debug()).toEqual(
			expect.stringContaining("..6789 Bob:34/67")
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
