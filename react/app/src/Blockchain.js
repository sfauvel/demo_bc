

import React from 'react'
import Block from './Block'
import Transaction from './Transaction'

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
          this.setState({
             isLoaded: true,
             blocks: data.blocks.reverse(),
             transactions: data.transactions,
             checkedElements: new Set(),
             selectedBlock: undefined
           });
      });
  }

  
  	buildResponse() {
  		var paramsToSend = {
 			   proofOfWork: this.state.proofOfWork,
 			   blocks: [],
 			   transactions: []
 	   }
 	   
 	   var checkedElements = this.state.checkedElements;

 	   this.state.transactions.forEach(function(element) {
 		 if (checkedElements.has(element.id)) {
 			 console.log("Push:" + element.id)
 			 paramsToSend.transactions.push(element)
 		 }
 	   })
 	   
 	   var selectedBlock = this.state.selectedBlock;
 	   this.state.blocks.forEach(function(element) {
  		 if (selectedBlock===element.id) {
 			 paramsToSend.blocks.push(element)
 		 }
 	   })
 	   
 	   return JSON.stringify(paramsToSend);
  	
  	}
	
  handleSubmit(event) {
	   event.preventDefault();

	   var json = this.buildResponse()
	   console.log(json);
	   var value = parseInt(this.hashCode(json)) % 2
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
		  body: json
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
	  console.log("Check tx: " + txId + " in " + this.state.checkedElements);
	  return this.state.checkedElements.has(txId);
  }

  handlerTransactionSelection(id, e) {
    console.log("click:" + id);

    
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
  
  
  hashCode(text) {
	  var hash = 0, i, chr;
	  if (text.length === 0) return hash;
	  for (i = 0; i < text.length; i++) {
	    chr   = text.charCodeAt(i);
	    hash  = ((hash << 5) - hash) + chr;
	    hash |= 0; // Convert to 32bit integer
	  }
	  return hash;
	}
  
  transactionsNotInABlock() {
	  let ids = new Set();
	  this.state.blocks.forEach(function(block) {
		  block.transactions.forEach(function(tx) {
			  ids.add(tx.id);
		  })
	  })
	  let validatedTransactions = [];
	  this.state.transactions.forEach(function(tx) {
		  if (!ids.has(tx.id)) {
			  validatedTransactions.push(tx);
		  }
	  })
	  
	  return validatedTransactions;
  }
  
  render() {
	  const { isLoaded, blocks, transactions } = this.state;
	
	  if (!isLoaded) {
	    return <div>Loading...</div>;
	  } else {
	    return (
	    <div>
    	  <h1>Blockchain</h1>
    	  <div></div>
		      <form onSubmit={this.handleSubmit}>
		      <div>
			      <label width="100%" >Proof of work</label>
			      <input id="proofOfWork"
			    	  	type="text"
			    	  	size="3"
			    	  	value={this.state.proofOfWork} 
			      		onChange={this.handleProofOfWorkChange.bind(this)}/>
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
			        			handler={(e) => this.handlerBlockSelection(block.id, e)}/>
		        		</div>
		        		))}
		      </div>
		     
		     
	      </form>
		      </div>);
	  }
	}
}
