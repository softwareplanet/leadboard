import React, { Component } from 'react';
import styles from './CardField.css'

class MainField extends Component {
    render() {
        const personIcon = "M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm0 2c-3 0-9 1.56-9 4.67V21h18v-2.33c0-3.1-6-4.67-9-4.67z";
        const organizationIcon = "M3 3h10v18H3V3zm12 4l2.5-2h1L21 7v14h-6V7zM5 5v2h2V5H5zm0 4v2h2V9H5zm0 4v2h2v-2H5zm0 4v2h2v-2H5zM9 5v2h2V5H9zm0 4v2h2V9H9zm0 4v2h2v-2H9zm0 4v2h2v-2H9zm8 0v2h2v-2h-2zm0-4v2h2v-2h-2zm0-4v2h2V9h-2z";
        let iconPath;

        if('organization' in this.props.value) {
            iconPath = personIcon;
        }
        else {
            iconPath = organizationIcon;
        }
        return (
            <div className={styles.field}>
                <div className={styles.fieldValue}>
                    <div className={styles.mainFieldValueWrapper}>
                        <span className={styles.badge}>
                            <svg className={styles.icon}>
                                <path d={iconPath}>
                                </path>
                            </svg>
                        </span>
                        <h3>
                            <a className={styles.mainValue}>
                                {this.props.value.name}
                            </a>
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainField;