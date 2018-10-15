
import React from 'react'

export default class NameForm extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {id: '1234', user: 'Jack', x: '123', y: '456'};

	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	  }
	  handleChange(event) {
	    this.setState({[event.target.name]: event.target.value});
	  }


	  handleSubmit(event) {
	    event.preventDefault();

	   fetch('/tx/add', {
	     method: 'POST',
	     headers: {
	    	    'Accept': 'application/json',
	    	    'Content-Type': 'application/json',
	    	  },
		  body: JSON.stringify(this.state)
	   });
	  }

	  render() {
	    return (
	      <form id="addTxForm" onSubmit={this.handleSubmit}>
	      	<div><div><label>Name</label></div><input size="15" name="user" type="text" value={this.state.user} onChange={this.handleChange} /></div>
	      	<div><div><label>X</label></div><input size="15" name="x" type="text" value={this.state.x} onChange={this.handleChange} /></div>
	      	<div><div><label>Y</label></div><input size="15" name="y" type="text" value={this.state.y} onChange={this.handleChange} /></div>
	      	<div><input type="submit" className="button" value="Submit" /></div>
	      </form>
	    );
	  }
	}
