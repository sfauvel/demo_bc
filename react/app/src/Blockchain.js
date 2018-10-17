

import React from 'react'
import Block from './Block'
import Transaction from './Transaction'
import {hashCode} from './Tools'

const MODULO_PROOF_OF_WORK=5;

export default class Blockchain extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        isLoaded: false,
        proofOfWork: 0,
        blocks: [],
        transactions: [],
        selectedBlock: undefined
      };
      

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleChange(event) {
//	    this.setState({[event.target.name]: event.target.value});
  }
  
  handleProofOfWorkChange(event) {
	  this.setState({
		 proofOfWork: event.target.value
	  })
  }

  
  componentDidMount() {
    this.loadBlockchain();
  }

  loadBlockchain() {

    fetch('/bc/view')
      .then(res => res.json())
      .then((data) => {
    	  const blocksMap = this.buildBlocksMap(data.blocks)
          this.setState({
             isLoaded: true,
             blocks: data.blocks.reverse(),
             blocksMap: blocksMap,
             transactions: data.transactions,
             checkedElements: new Set(),
             selectedBlock: this.getHeadBlock(data.blocks, blocksMap)
           });
      });
    
  }
  
  buildBlocksMap(blocks) {
	    const blocksMap = {}
		  blocks.forEach(function (bck) {
			  blocksMap[bck.id] = bck; 
		  });	
	    return blocksMap;
	}
  
  	buildResponse() {
  		var paramsToSend = {
 			   proofOfWork: this.state.proofOfWork,
 			   parentId: this.state.selectedBlock,
 			   transactions: []
 	   }
 	   
 	   var checkedElements = this.state.checkedElements;

 	   this.state.transactions.forEach(function(element) {
 		 if (checkedElements.has(element.id)) {
 			 console.log("Push:" + element.id)
 			 paramsToSend.transactions.push(element)
 		 }
 	   })
 	   
 	   return paramsToSend;
  	
  	}
	
  handleSubmit(event) {
	   event.preventDefault();

	   var json = this.buildResponse()
	   console.log(json);
	   if (!json.parentId) {
		   alert("Select a parent block !");
		   return;
	   }
	   
	   
	   const jsonString = JSON.stringify(json);
	   const value = parseInt(hashCode(jsonString)) % MODULO_PROOF_OF_WORK;
	   if (value != 0) {
		   alert("Try again !");
		   return;
	   }

	   fetch('/bc/validate', {
	     method: 'POST',
	     headers: {
	    	    'Accept': 'application/json',
	    	    'Content-Type': 'application/json',
	    	  },
		  body: jsonString
	   });
	   this.loadBlockchain();
	  }
  
  handleCheckedChange(event) {

	  var txId = event.target.name;
	  if (event.target.checked) {
		  this.state.checkedElements.add(txId);
	  } else {
		  this.state.checkedElements.delete(txId);  
	  }
//	  console.log(this.state.checkedElements)
  }
  
  isValidate(txId) {
	  let ce = this.state.checkedElements;
//	  console.log("Check tx: " + txId + " in " + this.state.checkedElements);
//	  this.state.checkedElements.forEach(function(elt) {
//		  console.log("  - " + elt + ":" + ce.has(txId));
//	  })
	  return this.state.checkedElements.has(txId);
  }

  handlerTransactionSelection(id, e) {
//    console.log("click:" + id);

    
    var newSelectedElements = this.state.checkedElements;
    if (this.state.checkedElements.has(id)) {
    	newSelectedElements.delete(id);
    } else {	
    	newSelectedElements.add(id);
    }
    this.setState({ 
	  checkedElements: newSelectedElements
	})
  }	 
  
  handlerBlockSelection(id, e) {
    console.log("click:" + id);
    
    this.setState({
    	selectedBlock: id
    });
    
  }	  
 
  handleFocus(event) {
	  event.target.select();
  }
  
  blockBranch(block) {
//	  console.log("Branch ? " + block.id)
//	  var branch=1;
//	  
//	  var blockBranch = []
//	  this.state.blocks.forEach(function(element) {
//		  var b = blockBranch.get(element.parentId)
//				  
//		  blockBranch[element.id]=b;
//	  })
//	  
//	  this.state.blocks.every(function(element) {
//		  console.log("is idem:" + element.id + "==" + block.id)
//  		 if (element.id==block.id) {
//  			 console.log("return " + branch)
//  			 return false;
// 		 }
//  		 if (element.parentId==block.parentId) {
//
//  			 console.log("inc " + branch)
//  			 branch++;
//  		 }
//  		 return true;
//  	  		
// 	   })
//	 
//	  console.log("Branch = " + branch)
//	  return branch;
	  return 1;
  }
  
  transactionsNotInABlock() {
	  const blocksMap = this.state.blocksMap;
	  let selectedBlocks=this.getBlockInSelectedChain()
	  let ids = new Set();

	  selectedBlocks.forEach(function(blockId) {
		  let block = blocksMap[blockId];
		  console.log(block)
		  block.transactions.forEach(function(tx) {
			  ids.add(tx.id);
		  })
	  })
//	  this.state.blocks.forEach(function(block) {
//		  block.transactions.forEach(function(tx) {
//			  ids.add(tx.id);
//		  })
//	  })
	  let validatedTransactions = [];
	  this.state.transactions.forEach(function(tx) {
		  if (!ids.has(tx.id)) {
			  validatedTransactions.push(tx);
		  }
	  })
	  
	  return validatedTransactions;
  }
  
  getHeadBlock(blocks = this.state.blocks, blocksMap = this.state.blocksMap) {

	  let parentsId = new Set();
	  blocks.forEach(function(block) {
		  parentsId.add(block.parentId)
	  })
	  let heads = [];
	  
	  let getBlockInChain = this.getBlockInChain;
	  blocks.forEach(function(block) {
		  if (!parentsId.has(block.id)) {
			  heads.push([block.id, getBlockInChain(block.id, blocksMap).size])
		  }
	  });
	  
	  let max = 0;
	  let head;
	  heads.forEach(function(b) {
		  if (b[1] > max) {
			  max = b[1];
			  head = b[0]
		  }
	  })
	  return head;
  }
  
  getBlockInSelectedChain() {
//	  let blocksMap = this.state.blocksMap;
//	  let selectedBlock = this.state.selectedBlock;
//	  let currentBlock = blocksMap["" + selectedBlock];
//
//	  let blocksInMap = new Set();
//	  
//	  while (currentBlock && currentBlock.id != 0) {
//		  blocksInMap.add(currentBlock.id);
//		 
//		  currentBlock = blocksMap[currentBlock.parentId];
//	  }
//	  return blocksInMap;
//	  
	  return this.getBlockInChain(this.state.selectedBlock, this.state.blocksMap) 
  }

  getBlockInChain(blockFrom, blocksMap) {
	  let currentBlock = blocksMap["" + blockFrom];

	  let blocksInMap = new Set();
	  
	  while (currentBlock && currentBlock.id != 0) {
		  blocksInMap.add(currentBlock.id);
		 
		  currentBlock = blocksMap[currentBlock.parentId];
	  }
	  return blocksInMap;
  }

  
  isBlockInSelectedChain(block) {
	  return this.getBlockInSelectedChain().has(block.id);
  }
  
  render() {
	  const { isLoaded, blocks, transactions } = this.state;
	
	  if (!isLoaded) {
	    return <div>Loading...</div>;
	  } else {
	    return (
	    <div className="content">
		      <form onSubmit={this.handleSubmit}>
		      <div>
			      <div id="labelProof">Proof of work</div>
			      <input id="proofOfWork"
			    	  	type="text" 
			    	  	value={this.state.proofOfWork} 
			      		onChange={this.handleProofOfWorkChange.bind(this)}
			      		onFocus={this.handleFocus}/>
			      <input type="submit" className="button" value="Submit" />
		      </div>
		    	  <div>
		      	{this.transactionsNotInABlock().map(tx => (
		      			<div key={"txcheck_" + tx.id}>
			      			<Transaction tx={tx}
			      				selected={this.isValidate(tx.id)} 
			      				handler={(e) => this.handlerTransactionSelection(tx.id, e)}/>
		      			</div>))}
		      </div>
		      <div>
		        {blocks.map(block => (
		        		<div key={"bck_" + block.id}  >
			        		<Block block={block}
			        			branch={this.blockBranch(block)}
			        			selected={this.state.selectedBlock===block.id}
			        			inChain={this.isBlockInSelectedChain(block)}
			        			handler={(e) => this.handlerBlockSelection(block.id, e)}/>
		        		</div>
		        		))}
		      </div>
		     
		     
	      </form>
		      </div>);
	  }
	}
}
