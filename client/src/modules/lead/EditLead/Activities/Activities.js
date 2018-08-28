import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Activities.css";
import PropTypes from "prop-types";

class Activities extends Component {

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.timeLineBar} />
            </div>
        )
    }
}

export default Activities;