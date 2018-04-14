import $ from 'jquery';
import React from 'React';
import ReactDOM from 'react-dom';

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
      inputs :{
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
			data: {question: this.state.inputs.question, choice1:this.state.inputs.choice1,
				choice2:this.state.inputs.choice2, choice3:this.state.inputs.choice3},
			success: function () {
				console.log("success")
			}
		})
	}

	onchange (property, e) {
		 const inputs = this.state.inputs;
    inputs[property] = e.target.value;
    this.setState({ inputs: inputs });
   
  }

	render (){
		 return (<div>
      	<h1>Your Pull</h1>
      	enter your question <input type= "text" value={this.state.inputs.question} onChange={this.onchange.bind(this, 'question')}/>
      	enter your first choice<input type= "text" value={this.state.inputs.choice1} onChange={this.onchange.bind(this, 'choice1')} />
      	enter your second choice<input type= "text" value={this.state.inputs.choice2} onChange={this.onchange.bind(this, 'choice2')} />
      	enter your third choice<input type= "text" value={this.state.inputs.choice3} onChange={this.onchange.bind(this, 'choice3')}/>
      	<button onClick= {this.onclick.bind(this)}>create</button>
    	</div>)

	}
}
ReactDOM.render(<App />,document.getElementById('app'))