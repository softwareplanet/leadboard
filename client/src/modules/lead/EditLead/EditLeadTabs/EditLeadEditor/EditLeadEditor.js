import React, { Component } from 'react'
import styles from './EditLeadEditor.css'

export default class EditLeadEditor extends Component {
  render() {
    return (
      <div>
        <div className={styles.editor}>
          <textarea className={styles.textArea}/>
          <div className={styles.footer}>
            <button className={styles.button}><span>Cancel</span></button>
            <button className={styles.buttonSave}><span>Save</span></button>
          </div>
        </div>
      </div>
    )
  }
}
