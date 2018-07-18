import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Lead from './Lead';
import store from '../state';
import { getStages } from '../api';
import { loadStages } from '../actions';

class Dashboard extends Component {

	constructor() {
			super();

		// set Redux real-world examples
		this.state = {
			stages: [],
			leads: []
		}
	}

	componentDidMount() {
			let funnel = 'funnel';
			this.props.loadStages(funnel);
	}

	onButton() {
		console.log('clicked');
		getStages().then((data) => console.log(':::: ' + JSON.stringify(data)));
	}

	render() {
		//stage
		console.log('here');
		console.log(JSON.stringify(this.props.dashboard.stages));
		if (!this.props.dashboard.stages) return <div/>;
		var stages = this.props.dashboard.stages.map(function(stage) {
			console.log(stage);
	       return (
			    <div className='dashboard__stage' key={stage._id}>
			      <div className='dashboard__head'>
			      {stage.name}
			      </div>
			      <Lead />
				</div>
			);
	  });

		return (<div className='dashboard'>{stages}
		<button onClick={this.onButton.bind(this)}>Click</button>
		</div>);
	}
}

export default connect(
	(state) => {return {dashboard: state.dashboard};}, //access via this.props.dashboard
	(dispatch) => bindActionCreators({loadStages}, dispatch)
)(Dashboard);
