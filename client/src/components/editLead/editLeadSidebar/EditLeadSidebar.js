import React, { Component } from "react";
import styles from "./EditLeadSidebar.css";
import EditCard from "./EditCard/EditCard";
import PropTypes from "prop-types";
import {loadLead} from "../../../actions/leadActions";
import {connect} from "react-redux";
import _ from "lodash";

class EditLeadSidebar extends Component {
    constructor(){
        super();
        this.state = {
            leadId: '',
            leads: {}
        }
    }

    componentWillReciveProps(nextProps) {
        if(nextProps){
            this.setState({
                leadId: nextProps,
                leads: {}
            })
        }
    }

    componentDidMount() {
        this.props.loadLead('5b7524f139fb331e42dd3ca6');
    }

  render() {
      const { leads } = this.props.leads;
      if(!Object.values(leads).length) {
          return <div />;
      }
    return <div className={styles.sidebar}>
        {Cards(EditCard)(leads.contact)}
    </div>;
  }
}

EditLeadSidebar.propTypes = {
    loadLead: PropTypes.func.isRequired,
    leads: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    leads: state.leads
});

const Cards = (Component) => (props) => {
    if('organization' in props && _.isEmpty(props.name)) {
        return <div>
            <Component value={props.organization} title={'Organization'}/>
        </div>
    }
    else if('organization' in props) {
        return <div>
            <Component value={props.organization} title={'Organization'}/>
            <Component value={props} title={'Person'}/>
        </div>
    }
    else {
        return <div>
            <Component value={props} title={'Person'}/>
        </div>
    }
};

export default connect(mapStateToProps, { loadLead })(EditLeadSidebar);
