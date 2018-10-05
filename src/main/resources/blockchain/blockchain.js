
const baseColor = {
		/*#00e78d*/
		r: 0,
		g: 231,
		b: 141,
		rgb: function() {
			return 'rgb(' + this.r +',' + this.g + ',' + this.b + ')'
		},
		shadow: function() {
			return 'rgb(' + this.shiftColor(this.r) +',' + this.shiftColor(this.g) + ',' + this.shiftColor(this.b) + ')'
		},
		shiftColor: function (v) {
			return Math.max(0, v-150)
		}
}

const blockStyle = {
	  display: 'inline-block',
	  width: '300px',
	  background: baseColor.rgb(),
	  borderRadius: '10px',
	  boxShadow: '5px 5px 5px ' + baseColor.shadow(),
	  margin: '3px',
	  marginBottom: '1em',
	  padding: '5px'
}

class Transaction extends React.Component {
  render() {
    const tx = this.props.tx
    return <label className="transaction">{tx.id}: {tx.user}: {tx.x}/{tx.y}</label>
  }
}

class Block extends React.Component {
  render() {
    const block=this.props.block;
    return (
    	<div className="block" style={blockStyle}>
	        <div>Block: {block.id}</div>
	        <div className="blockTransaction">
	        	{block.transactions.map(tx => (<div key={"tx_" + tx.id}><Transaction tx={tx}/></div>))}
	        </div>
	    </div>
    )
  }
}

class Blockchain extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        isLoaded: false,
        proofOfWork: 0,
        datablocks: [],
        transactions: []
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
             datablocks: data.blocks,
             transactions: data.lastTransactions,
             checkedElements: new Set()
           });
      });
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
  
  	buildResponse() {
  		var paramsToSend = {
 			   proofOfWork: this.state.proofOfWork,
 			   transactions: []
 	   }
 	   
 	   
 	   var txs = this.state.checkedElements;
 	   
 	   this.state.transactions.forEach(function(tx) {
 		 if (txs.has("" + tx.id)) {
 			 console.log("Push:" + tx.id)
 			 paramsToSend.transactions.push(tx)
 		 }
 	   })
 	   
 	   return JSON.stringify(paramsToSend);
  	
  	}
	
  handleSubmit(event) {
	   event.preventDefault();

	   var json = this.buildResponse()

	   var value = parseInt(this.hashCode(json)) % 10
//	   if (value != 0) {
//		   alert("Try again !");
//		   return;
//	   }

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
	  console.log(this.state.checkedElements)
  }
  
  isValidate(txId) {
	  console.log("Check tx: " + txId + " in " + this.state.checkedElements);
	  return this.state.checkedElements.has(txId);
  }
  
	  
  render() {
	  const { isLoaded, datablocks, transactions } = this.state;
	
	  if (!isLoaded) {
	    return <div>Loading...</div>;
	  } else {
	    return (
	    		<div>
    	  <h1>Display Blockchain</h1>
		      <form onSubmit={this.handleSubmit}>
		      <div>
		        {datablocks.map(block => (
		        		<div key={"bck_" + block.id}  >
			        		<input type="checkbox" 
			        			defaultChecked={() => this.isValidate(block.id)} 
			        			onChange={this.handleCheckedChange.bind(this)} />
			        		<Block block={block}/>
		        		</div>
		        		))}
		      </div>
		      <div>
		      	{transactions.map(tx => (
		      			<div key={"txcheck_" + tx.id}>
			      			<input type="checkbox" 
			      				name={tx.id} 
			      				defaultChecked={() => this.isValidate(tx.id)} 
			      				onChange={this.handleCheckedChange.bind(this)} />
			      			<Transaction tx={tx}/>
		      			</div>))}
		      </div>
		      <input id="proofOfWork" 
		    	  	value={this.state.proofOfWork} 
		      		onChange={this.handleProofOfWorkChange.bind(this)}/>
		      <input type="submit" value="Submit" />
	      </form>
		      </div>);
	  }
	}
}


ReactDOM.render(
  <Blockchain />,
  document.getElementById('root')
)
