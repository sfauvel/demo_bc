
import React from 'react'
import Transaction from './Transaction'

import {trunkId} from './Tools'

export default class Block extends React.Component {
	
  render() {
    const block=this.props.block;
    const branch=this.props.branch-1;
    const className="block"+((this.props.selected)?" selected":"");
   // console.log(block.id + ":" +this.props.selected)
    //style="margin-left:{branch}em"
    const branchmargin = {
    		marginLeft:(branch*3)+"em"
    };
    return (
    	<div className={className} style={branchmargin} onClick={this.props.handler}>
	        <div>Block: {trunkId(block.id)} from {trunkId(block.parentId)}</div>
	        <div className="blockTransaction">
	        	{block.transactions.map(tx => (<div key={"tx_" + tx.id}><Transaction tx={tx}/></div>))}
	        </div>
	    </div>
    )
  }
}
