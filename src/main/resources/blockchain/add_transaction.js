//https://reactjs.org/docs/forms.html
class NameForm extends React.Component {
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
      <form onSubmit={this.handleSubmit}>
      	<label> Name: <input name="user" type="text" value={this.state.user} onChange={this.handleChange} /></label>
        <label> X: <input name="x" type="text" value={this.state.x} onChange={this.handleChange} /></label>
        <label> Y: <input name="y" type="text" value={this.state.y} onChange={this.handleChange} /></label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
)
