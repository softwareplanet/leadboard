import React, { Component } from 'react';
import styles from './CardField.css'

class MainField extends Component {
    render() {
        return (
            <div className={styles.fieldValue}>
                <div className={styles.mainFieldValueWrapper}>
                    <span className={styles.badge}>
                        <img className={styles.icon} src={this.props.icon}/>
                    </span>
                    <h3>
                        <a className={styles.mainValue}>
                            {this.props.value.name}
                        </a>
                    </h3>
                </div>
            </div>
        )
    }
}

export default MainField;