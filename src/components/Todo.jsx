import React, {Component} from 'react';
import CompleteTasks from './CompleteTasks';
import '../styles/Todo.scss';

export default class Todo extends Component {
	constructor(props){
		super(props);

		this.sortLS = [];
		this.listTasks = [];
		this.inputIsEmpty = false;

		this.addTask = this.addTask.bind(this);
	}

	addTask(e){
		e.preventDefault();
		let inputValue = e.target.parentNode[0].value;

		this.checkingForEmptiness(inputValue);

		if (this.inputIsEmpty === false){
			// adding elements to an array
			this.listTasks.unshift(inputValue);

			// adding elements to a LS
			this.writeLS(inputValue);
		}

		this.setState({});
		
		// clearing input after entering value
		this.cleareInput(e);
	}

	checkingForEmptiness(inputValue){
		if (inputValue === ''){
			this.inputIsEmpty = true;
		} else {
			this.inputIsEmpty = false;
		}
	}

	writeLS(inputValue){
		/* check for emptiness of localStorage.If yes,
		then assign an empty array to the tasks key */
		if (JSON.parse(window.localStorage.getItem('tasks')) === null) {
			window.localStorage.setItem('tasks', JSON.stringify([]))
		}
		// Getting the value from LS
		this.sortLS = JSON.parse(window.localStorage.getItem('tasks'));
		// Adding the entered value to the beginning of the array
		this.sortLS.unshift(inputValue);
		// Setting the tasks value with the last value
		window.localStorage.setItem('tasks', JSON.stringify(this.sortLS));
	}

	cleareInput(e){
		e.target.parentNode[0].value = '';
	}

	render(){
		return (
			<div className="todo">
				<div className='titleSection'>
					<h1>Todo App</h1>
					<h2>Enter your task</h2>
					<h3>(Using localStorage)</h3>
				</div>
				<div className='createTasks tasks'>
					<form>
						<input type="text" placeholder='Enter your task'/>
						<button onClick={this.addTask}>Confirm</button>
					</form>
					{this.inputIsEmpty === true ? <p>Enter correct value</p> : null}
				</div>
				<CompleteTasks taskName={this.listTasks} />
			</div>
		);
	}
}