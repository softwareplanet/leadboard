import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Lead from './Lead';
import store from '../state';
import { getDashboard } from '../api';
import { loadDashboard } from '../actions';

class Dashboard extends Component {

	constructor() {
		super();
/*
		store.subscribe(() => console.log('State ', store.getState()));
		store.dispatch({
			type: 'LOAD_STAGES',
			stages: [{id: 1}]
		});
*/
		// set Redux real-world examples
		this.state = {
			stages: [
				{id: '1', name: 'Cold Leads',
					leads: [
						{id: '10', name: 'John Smith'},
						{id: '11', name: 'Jessica Feathers'}
					]
				},
				{id: '2', name: 'Qualified Leads', leads: []},
				{id: '3', name: 'Prospects', leads: []},
				{id: '4', name: 'Clients', leads: []}
			]
		}
	}

	componentDidMount() {
		/*
		getDashboard()
			.then((data) => {
				store.dispatch({
					type: 'STAGES_LOADED',
					state: data
				});
			});
			*/


			this.props.loadDashboard();
	}

	onButton() {
		console.log('clicked');
	/*
		let p = new Promise((resolve, reject) => {
			setTimeout(function() {
				console.log('timeour reached');
				resolve();
			}, 3000)
		});
		*/
		getDashboard().then((data) => console.log(':::: ' + JSON.stringify(data)));
		console.log('after promise');
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

//export default connect(
//	(state) => {return {dashboard: state.dashboard}; }
//)(Dashboard);

export default connect(
	(state) => {return {dashboard: state.dashboard};}, //access via this.props.dashboard
	(dispatch) => bindActionCreators({loadDashboard}, dispatch)
)(Dashboard);

//module.exports = Dashboard;
