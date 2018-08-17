import React, { Component } from 'react';
import styles from './CardField.css'

class CardField extends Component {
    render() {
        return (
            <div className='SideCard__field'>
                <div className='SideCard__field-value--highlight'>
                    <div className={styles.fieldValue}>
                        <div className={styles.fieldValueWrapper}>
                            <div className={styles.fieldLabel}>
                                {this.props.fieldName}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default  CardField;