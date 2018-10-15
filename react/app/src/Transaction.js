
import React from 'react'


import {trunkId} from './Tools'

//export default class Transaction extends React.Component {
//  render() {
//    const tx = this.props.tx 
//    const className="transaction"+((this.props.selected)?" selected":"");
//    return <label onClick={this.props.handler} className={className}>{trunkId(tx.id)}: {tx.user}: {tx.x}/{tx.y}</label>
//  }
//}

export default class Transaction extends React.Component {
	  constructor(props) {
	    super(props);

	    this.state = {
	      className: "transaction"+((this.props.selected)?" selected":""),
	      content: trunkId(this.props.tx.id) + " " + (this.props.tx.user) + ":" + (this.props.tx.x) + "/" + (this.props.tx.y)
	    }
	  }

	  render() {
	    return <label onClick={this.props.handler} className={this.state.className}>{this.state.content}</label>
	  }
	}