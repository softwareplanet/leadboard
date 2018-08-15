import React, { Component } from 'react';
import styles from './CardField.css'
import classNames from 'classnames';

class MainField extends Component {
    render() {
        return (
            <div className={styles.field}>
                <div className={styles.fieldValue}>
                    <div className={styles.mainFieldValueWrapper}>
                        <span className={styles.badge}>
                            <svg className={styles.icon}>
                                <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm0 2c-3 0-9 1.56-9 4.67V21h18v-2.33c0-3.1-6-4.67-9-4.67z">
                                </path>
                            </svg>
                        </span>
                        <h3>
                            <a className={styles.mainValue}>
                                Bob
                            </a>
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default  MainField;