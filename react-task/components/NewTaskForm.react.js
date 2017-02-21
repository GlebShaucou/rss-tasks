import React from 'react';
import { Button } from 'react-bootstrap';

export default class NewTaskForm extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="add-task-form" id="add-form">
				<input type="text" 
					ref={input => this.titleInput = input} 
					name="title" 
					id="title" 
					placeholder="Enter here task title" />
				<input type="text" 
					ref={input => this.descrInput = input} 
					name="description" id="description" 
					placeholder="Enter here task description" />	
				<br />
				<Button id="add" className="add-task">Add</Button>
			</div>
		)
	}
}