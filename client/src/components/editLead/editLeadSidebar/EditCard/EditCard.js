import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './EditCard.css';
import { loadLead } from '../../../../actions/leadActions'
import CardField from './CardFields/CardField';
import MainField from "./CardFields/MainField";

class EditCard extends Component {

    render() {
        let title = ('organization' in this.props.value) ? 'Person' : 'Organization';
        const fields = this.props.value.custom.map((field) =>
            <CardField fieldValues={Object.values(field)} fieldName={Object.keys(field)}/>);
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    <span className={styles.titleName}>
                        {title}
                    </span>
                </div>
                <div className={styles.fields}>
                    <MainField value={this.props.value}/>
                    {fields}
                </div>
            </div>
        )
    }
}

export default EditCard;