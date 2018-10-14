
import React from 'react'

import renderer from 'react-test-renderer'
import MyLabel from './ReactComp.js'
//import Enzyme, { mount } from 'enzyme';
//import Adapter from 'enzyme-adapter-react-16';

//Enzyme.configure({ adapter: new Adapter() });


test("My react-app", () => {
  const component = renderer.create(
    <MyLabel />
 );

  const instance = component.getInstance();

  expect(instance.state.text).toBe("my label with webpack");

})
