import React, { Component } from "react";
import styles from "./EditLeadSidebar.css";
import EditCard from "./EditCard/EditCard";
import PropTypes from "prop-types";
import {loadLead} from "../../../actions/leadActions";
import {connect} from "react-redux";

class EditLeadSidebar extends Component {
    constructor(){
        super();
        this.state = {
            leadId: '',
            leads: {}
        }
    }

    componentWillReciveProps(nextProps){
        if(nextProps){
            this.setState({
                leadId: nextProps,
                leads: {}
            })
        }
    }

    componentDidMount(){
        let id = '5b6d7b35401106620b1a1a6d';
        this.props.loadLead(id);
    }

  render() {
      const { leads } = this.props.leads;
      if(!Object.values(leads).length) {
          return <div />;
      }
    return <div className={styles.sidebar}>
        <EditCard value={leads.contact.organization}/>
        <EditCard value={leads.contact}/>
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

export default connect(mapStateToProps, { loadLead })(EditLeadSidebar);
