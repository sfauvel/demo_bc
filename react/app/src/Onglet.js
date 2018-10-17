
import React from 'react'
import Blockchain from './Blockchain'
import NameForm from './NameForm'
import About from './About'

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
    	  } else if ("B" === this.state.onglet) {
    		content = <NameForm />;
    	  } else  {
    		content = <About />;
    	  }
    	return (
			<div>
				<div className="bar" >
	       	  		<a className={"baritem" + (this.state.onglet==='A'?" selected":"")} onClick={(e) => this.handleClick(e, "A")}>Blockchain</a>
	       	  		<a className={"baritem" + (this.state.onglet==='B'?" selected":"")} onClick={(e) => this.handleClick(e, "B")}>Transaction</a>
	       	  		<a className={"baritem about" + (this.state.onglet==='C'?" selected":"")} onClick={(e) => this.handleClick(e, "C")}>?</a>
	        	</div>
	        	{content}
    	</div>)
    }
}
