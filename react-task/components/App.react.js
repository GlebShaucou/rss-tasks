import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import AddTaskButton from './AddTaskButton.react';
import NewTaskForm from './NewTaskForm.react';
import ListItem from './ListItem.react';

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
		const newState = Object.assign({}, this.state);
		const dataToProcess = [];
		const stateData = newState.data;

		for(let i = 0, len = stateData.length; i < len; i++) {
			dataToProcess.push(stateData[i]);			
		}

		if(e.target.id === "new") {
			const form = document.querySelector("#add-form"); // <--------- !!!!!!!!!!!!!!! 
			form.style.display = "block"; // <--------- !!!!!!!!!!!!!!! 
		}

		if(e.target.id === "add") {
			const newTask = {
				title: this.form.titleInput.value,
				description: this.form.descrInput.value,
				uniqKey: Math.ceil(Math.random() * (1000 - 1) + 1) + "x", // it is needed to make a string:)
				status: 0
			};
			const form = document.querySelector("#add-form"); // <--------- !!!!!!!!!!!!!!! 

			dataToProcess.push(newTask);

			form.style.display = "none"; // <--------- !!!!!!!!!!!!!!! 
		}

		if (e.target.textContent == "Next" || e.target.textContent == "Prev") {
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
		}

		this.setState({ data: dataToProcess });
	}

	render() {
		const Sections = this.state.sections.map((section, index) => {
			return <BlockOfTasks key={index} title={section} data={this.state.data} statusId={index} />
		});

		return (
		    <Grid>
		    	<Row className="show-grid" onClick={this.handleClick}>
		    		<AddTaskButton />
		    		<NewTaskForm ref={form => this.form = form} />
		    		{Sections}
		    	</Row>	
		    </Grid>
		)
	}
}