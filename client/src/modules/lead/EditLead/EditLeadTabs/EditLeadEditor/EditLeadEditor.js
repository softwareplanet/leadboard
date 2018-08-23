import React, { Component } from "react"
import styles from "./EditLeadEditor.css"
import isBlank from "../../../../../utils/isBlank"

export default class EditLeadEditor extends Component {
  state = {
    noteText: ""
  }

  onChange = e => {
    this.setState({
      ...this.state,
      noteText: e.target.value
    })
  }

  onCancel = () => {
    this.clearEditor();
  }

  onSave = () => {
    if (!isBlank(this.state.noteText)) {
      this.props.onSave(this.state.noteText);
      this.clearEditor();
    }
  }

  clearEditor = () => {
    this.setState({
      ...this.state,
      noteText: ""
    })
  }

  render() {
    return (
      <div>
        <div className={styles.editor}>
          <textarea value={this.state.noteText} onChange={this.onChange} className={styles.textArea}/>
          <div className={styles.footer}>
            <button onClick={this.onCancel} className={styles.button}><span>Cancel</span></button>
            <button onClick={this.onSave} className={styles.buttonSave}><span>Save</span></button>
          </div>
        </div>
      </div>
    )
  }
}
