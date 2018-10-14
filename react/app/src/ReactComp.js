import React from 'react'

export default class MyLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: "my label with webpack"};
  }
  render() {
    return (<div>{this.state.text}</div>)
  }
}
