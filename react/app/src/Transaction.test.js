
import React from 'react'

import renderer from 'react-test-renderer'
import Transaction from './Transaction.js'

const tx = {
  id:"123456789",
  user: "Bob",
  x: 34,
  y: 67
}

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

/*
test("Transaction className selected", () => {
  const component = renderer.create(<Transaction tx={tx} handler={click}/>)
  const instance = buildJsx(<Transaction tx={tx} />);
  instance.simulate("click")
  expect(instance.state.className).toBe("transaction");
})

function click() {
  console.log("CLICK");
}
*/
function buildJsx(jsx) {
  const component = renderer.create(jsx);
  return component.getInstance();
}
