
import React from 'react'
import Blockchain from './Blockchain'
import NameForm from './NameForm'

export default class Onglet extends React.Component {
	constructor(props) {
      super(props);

      this.state = {
        onglet: "A"
      }
	}
      
	handleClick(event, onglet) {
	    this.setState({onglet: onglet});
	  }

	
    render() {
    	let content
    	if ("A" === this.state.onglet) {
    	    content = <Blockchain />;
    	  } else {
    		content = <NameForm />;
    	  }
    	return (
    	<div>
   	  		<input type="button" className="button" value="Blockchain" onClick={(e) => this.handleClick(e, "A")}/>
   	  		<input type="button" className="button" value="Add transaction" onClick={(e) => this.handleClick(e, "B")} />
   	  		{content}
    	</div>)
    }
}
