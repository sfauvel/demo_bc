
import React from 'react'

import {trunkId} from './Tools'

export default class Transaction extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

	const isValid = (this.props.tx.x) > (this.props.tx.y);
	const className = "transaction"
		+((this.props.selected)?" selected":"")
		+(isValid?" valid":" invalid")
	const content = trunkId(this.props.tx.id) + " - " + (this.props.tx.user) + " " + (this.props.tx.x) + "/" + (this.props.tx.y) 
    
	return (<div>
		<label onClick={this.props.handler} className={className}>{content}<span className={isValid?"validTx":"invalidTx"}>!</span></label>
		
		</div>)
  }
}