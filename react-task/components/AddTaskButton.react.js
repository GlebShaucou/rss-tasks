import React from 'react';
import { Button } from 'react-bootstrap';

export default class AddTaskButton extends React.Component {
	render() {
		return (
			<Button id="new" bsStyle="info" className="new-task">New</Button>
		)
	}
}