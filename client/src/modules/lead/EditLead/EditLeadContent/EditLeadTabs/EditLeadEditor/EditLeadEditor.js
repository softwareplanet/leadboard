import React, { Component } from "react"
import styles from "./EditLeadEditor.css"
import isBlank from "../../../../../../utils/isBlank"

export default class EditLeadEditor extends Component {
  state = {
    noteText: this.props.text ? this.props.text : ""
  }

  onChange = e => {
    this.setState({
      ...this.state,
      noteText: e.target.value
    })
  }

  onCancel = () => {
    this.clearEditor();
    this.props.onCancel();
  }

  onSave = () => {
    if (!isBlank(this.state.noteText)) {
      this.props.onSave(this.state.noteText);
      this.clearEditor();
      this.props.onCancel();
    }
  }

  clearEditor = () => {
    this.setState({ noteText: "" })
  }

  render() {
    return (
      <div className={styles.editor}>
        <textarea value={this.state.noteText} onChange={this.onChange} className={styles.textArea}/>
        <div className={styles.footer}>
          <button onClick={this.onCancel} className={styles.button}><span>Cancel</span></button>
          <button onClick={this.onSave} className={styles.buttonSave}><span>Save</span></button>
         </div>
      </div>
    )
  }
}
