function formatName(user) {

  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)} ! </h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}



function tick() {
  const element = (
    <div>
      {getGreeting(user)}
      <h2>
        It is{' '}
        {new Date().toLocaleTimeString()}.
      </h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

//setInterval(tick, 1000);


class Transaction extends React.Component {
  render() {
    const tx = this.props.tx
    return <div>Tx: {tx.id}: {tx.x}/{tx.y}</div>
  }
}

class Block extends React.Component {
  render() {
    const block=this.props.block;
    return (<div class="block">
        <div>Block {block.id}</div>
        <div>{block.transactions.map(tx => (<Transaction tx={tx}/>))}</div>
        </div>)
  }
}

class Blockchain extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        isLoaded: false,
        datablocks: [],
        lastTransactions: []
      };
    }

  componentDidMount() {
    this.LoadBlockchain();
  }

  LoadBlockchain() {

    fetch('http://localhost:9000/bc/view')
      .then(res => res.json())
      .then((data) => {
          this.setState({
             isLoaded: true,
             datablocks: data.blocks,
             lastTransactions: data.lastTransactions
           });
      });
  }
render() {
  const { isLoaded, datablocks, lastTransactions } = this.state;
  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (<div>
      <div><NameForm /></div>
      <div>Display Blockchain</div>
      <div>
        {datablocks.map(block => (<Block block={block}/>))}
      </div>
      <ul>
        {lastTransactions.map(tx => (<li><Transaction tx={tx}/></li>))}
      </ul>
      </div>);
  }
}
}

const users = ["Bob", "John"]

const blockA = {name:"A", tx:["Bob", "John"]}
const blockB = {name:"B", tx:["Martin", "Fred"]}
const blocks = [blockA, blockB]


ReactDOM.render(
  <Blockchain />,
  document.getElementById('root')
)
