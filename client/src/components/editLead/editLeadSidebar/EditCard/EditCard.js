import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './EditCard.css';
import { loadLead } from '../../../../actions/leadActions'
import CardField from './CardFields/CardField';
import MainField from "./CardFields/MainField";

class EditCard extends Component {

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
        const fields = leads.contact.custom.map((field) =>
            <CardField fieldValues={Object.values(field)} fieldName={Object.keys(field)}/>);
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    <span className={styles.titleName}>
                        Person
                    </span>
                </div>
                <div className={styles.fields}>
                    <MainField contact={leads.contact}/>
                    {fields}
                </div>
            </div>
        )
    }
}

EditCard.propTypes = {
    loadLead: PropTypes.func.isRequired,
    leads: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    leads: state.leads
});

export default connect(mapStateToProps, { loadLead })(EditCard);