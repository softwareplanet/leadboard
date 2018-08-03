import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadLeadboard } from "../actions/leadActions";

import Lead from "./Lead";

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
        {
          id: "1",
          name: "Cold Leads",
          leads: [{ id: "10", name: "John Smith" }, { id: "11", name: "Jessica Feathers" }]
        },
        { id: "2", name: "Qualified Leads", leads: [] },
        { id: "3", name: "Prospects", leads: [] },
        { id: "4", name: "Clients", leads: [] }
      ]
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.leads) {
      this.setState({ leads: nextProps.leads });
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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

    console.log("DOMAIN: " + this.props.auth.domainid);
    this.props.loadLeadboard(this.props.auth.domainid);
  }

  onButton() {
    console.log("clicked");
    /*
		let p = new Promise((resolve, reject) => {
			setTimeout(function() {
				console.log('timeour reached');
				resolve();
			}, 3000)
		});
		*/
    //getDashboard().then((data) => console.log(':::: ' + JSON.stringify(data)));
    console.log("after promise");
  }

  render() {
    //stage
    console.log("here");
    //console.log(JSON.stringify(this.props.dashboard.stages));
    if (!this.state.stages) return <div />;
    var stages = this.state.stages.map(function(stage) {
      console.log(stage);
      return (
        <div className="dashboard__stage" key={stage._id}>
          <div className="dashboard__head">{stage.name}</div>
          <Lead />
        </div>
      );
    });

    return (
      <div className="dashboard">
        {stages}
        <button onClick={this.onButton.bind(this)}>Click</button>
      </div>
    );
  }
}

//export default connect(
//	(state) => {return {dashboard: state.dashboard}; }
//)(Dashboard);

//export default Dashboard;
/*
connect(
  state => {
    return { dashboard: state.dashboard };
  }, //access via this.props.dashboard
  dispatch => bindActionCreators({ loadDashboard }, dispatch)
)(Dashboard);
*/
//module.exports = Dashboard;

loadLeadboard.propTypes = {
  loadLeadboard: PropTypes.func.isRequired,
  leads: PropTypes.func.isRequired,
  errors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  leads: state.leads,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loadLeadboard }
)(Dashboard);
