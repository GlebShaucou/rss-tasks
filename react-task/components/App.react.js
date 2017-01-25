import React from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';

class NewTaskForm extends React.Component {
	render() {
		return (
			<form className="add-task-form" id="add-form">
				<input type="text" name="title" id="title" placeholder="Enter here task title" />
				<input type="text" name="description" id="description" placeholder="Enter here task description" />	
				<button id="add" className="add-task">Add</button>
			</form>
		)
	}
}

class AddTaskButton extends React.Component {
	render() {
		return (
			<button id="new" className="new-task">New</button>
		)
	}
}

class ListItem extends React.Component {
	render() {
		return (
			<Panel header={this.props.taskTitle}>
				{this.props.description}
				<button id={this.props.uniqKey} className="switch">Next</button>
				<button id={this.props.uniqKey} className="switch">Prev</button>
			</Panel>
		)
	}
}

class ListOfTasks extends React.Component {
	render() {
		const Status = this.props.statusId;

		const dataToDisplay = this.props.data.map(task => {
			if(Status == task.status) {
				return <ListItem key={task.title} taskTitle={task.title} description={task.description} uniqKey={task.uniqKey} />;
			}
		});

		return <div>{dataToDisplay}</div>
	}
}

class BlockOfTasks extends React.Component {
	render() {
		return (
			<Col sm={6} md={3}>
				<h2>{this.props.title}</h2>
				<ListOfTasks data={this.props.data} statusId={this.props.statusId} />
			</Col>
		)
	}
}

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sections: this.props.sections, 	
			data: this.props.data
		};

		this.handleClick = this.handleClick.bind(this); 
	}

	handleClick(e) {
		const newState = {};
		const dataToProcess = [];
		const stateData = this.state.data;

		for(let i = 0, len = stateData.length; i < len; i++) {
			dataToProcess.push(stateData[i]);			
		}

		if(e.target.id === "new") {
			const form = document.querySelector("#add-form");
			form.style.display = "block";
		}

		if(e.target.id === "add") {
			const inputTitle = document.querySelector("#title");
			const inputDescr = document.querySelector("#description");
			const newTask = {};
			const form = document.querySelector("#add-form");

			newTask.title = inputTitle.value;
			newTask.description = inputDescr.value;
			newTask.uniqKey = Math.ceil(Math.random() * (1000 - 1) + 1) + ""; // it is needed to make a string:)
			newTask.status = 0;
			dataToProcess.push(newTask);

			form.style.display = "none";
		}

		dataToProcess.forEach(current => {
			if(current.uniqKey === e.target.id && e.target.textContent == "Next") {
				if (current.status !== 3) {
					current.status++;
				}		
			}

			if(current.uniqKey === e.target.id && e.target.textContent == "Prev") {
				if (current.status !== 0) {
					current.status--;
				}		
			}
		});

		newState.data = dataToProcess;

		this.setState(newState);
	}

	render() {
		const Sections = this.state.sections.map((section, index) => {
			return <BlockOfTasks key={index} title={section} data={this.state.data} statusId={index} />
		});

		return (
		    <Grid>
		    	<Row className="show-grid" onClick={this.handleClick}>
		    		<AddTaskButton />
		    		<NewTaskForm />
		    		{Sections}
		    	</Row>	
		    </Grid>
		)
	}
}