import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './EditCard.css';
import { loadLead } from '../../../../actions/leadActions'
import CardField from './CardField';

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
            <CardField fieldValue={Object.values(field)} fieldName={Object.keys(field)}/>);
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    <span className={styles.titleName}>
                        Person
                    </span>
                    <div className='SideCard__actions'>
                    </div>
                </div>
                <div className={styles.fields}>
                    {fields}
                </div>
                {/*<div className='SideCard__fields'>
                    <div className='SideCard__field'>
                        <div className='SideCard__field-value'>
                            <div className='SideCard__field-value-wrap'>
                                <span className='SideCard__field-value-badge'>

                                </span>
                                <h3>
                                    <a className='SideCard__field-value-name'>
                                        {leads.contact.name}
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className='SideCard__field'>
                        <div className='SideCard__field-value--highlight'>
                            <div className='SideCard__field-value'>
                                <div className='SideCard__field-label-wrap'>
                                    <div className='SideCard__field-label'>
                                        Phone
                                    </div>
                                </div>
                                <span className='SideCard__field-value-add-value'>
                                    <div className='SideCard__field-value-add-button'>
                                            + Add value
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='SideCard__field'>
                        <div className='SideCard__field-value--highlight'>
                            <div className='SideCard__field-value'>
                                <div className='SideCard__field-label-wrap'>
                                    <div className='SideCard__field-label'>
                                        Email
                                    </div>
                                </div>
                                <span className='SideCard__field-value-add-value'>
                                    <div className='SideCard__field-value-add-button'>
                                            + Add value
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>*/}
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