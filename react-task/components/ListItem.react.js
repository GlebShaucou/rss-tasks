import React from 'react';
import { Panel, Button } from 'react-bootstrap';

export default class ListItem extends React.Component {
	render() {
		return (
			<Panel header={this.props.taskTitle}>
				<p>{this.props.description}</p>
				<Button id={this.props.uniqKey} bsStyle="warning" className="switch">Prev</Button>
				<Button id={this.props.uniqKey} bsStyle="success" className="switch">Next</Button>				
			</Panel>
		)
	}
}