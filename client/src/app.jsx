import $ from 'jquery';
import React from 'React';
import ReactDOM from 'react-dom';

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
      inputs :{
      	route: '',
      question: '',
      choice1: '',
      choice2: '',
      choice3: ''
  	}
    }
	}
	onclick(){
		$.ajax({
			type :"POST",
			url:"/",
			data: {route:"/"+this.state.inputs.route, question: this.state.inputs.question, choice1:this.state.inputs.choice1,
				choice2:this.state.inputs.choice2, choice3:this.state.inputs.choice3},
			success: function (data) {

				console.log("success")
				alert(data)
				
			}
		})
		this.setState(inputs :{	route: '', question: '',  choice1: '', choice2: '',choice3: ''})
	}

	onchange (property, e) {
		 const inputs = this.state.inputs;
    inputs[property] = e.target.value;
    this.setState({ inputs: inputs });
   
  }

	render (){
		 return (<div>
      	<h1>Generate A Poll</h1>
      	<h3>Enter your form route </h3> /<input  size="35"  type= "text" value={this.state.inputs.route} onChange={this.onchange.bind(this, 'route')}/><br/><br/>
      	<h3>Enter your question </h3><input  size="35"   type= "text" value={this.state.inputs.question} onChange={this.onchange.bind(this, 'question')}/><br/><br/>
      	<h3>Enter your first choice </h3><input  size="35"  type= "text" value={this.state.inputs.choice1} onChange={this.onchange.bind(this, 'choice1')} /><br/><br/>
      	<h3>Enter your second choice </h3><input  size="35" type= "text" value={this.state.inputs.choice2} onChange={this.onchange.bind(this, 'choice2')} /><br/><br/>
      	<h3>Enter your third choice </h3><input  size="35"  type= "text" value={this.state.inputs.choice3} onChange={this.onchange.bind(this, 'choice3')}/><br/><br/>
      	<button onClick= {this.onclick.bind(this)}>create</button>
    	</div>)

	}
}
ReactDOM.render(<App />,document.getElementById('app'))