import * as React from 'react';
import EditFieldGroup from '../EditFieldGroup/EditFieldGroup';
import * as styles from './SingleEditView.css';

export interface Props {
  fieldName: string;
  fieldValue: string;

  onChange(fieldName: string, fieldValue: string): void;

  onCancel(): void;
}

export interface State {
  updatedValue: string;
}

class SingleEditView extends React.Component<Props, State> {

  public state: State = {
    updatedValue: this.props.fieldValue,
  };

  public render() {
    return (
      <div className={styles.editView}>
        <EditFieldGroup
          name={this.props.fieldName}
          value={this.props.fieldValue}
          onChange={this.onChangeEditField}
        />
        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={this.props.onCancel}>
            Cancel
          </button>
          <button
            className={styles.saveButton}
            onClick={this.onSaveClicked}>
            Save
          </button>
        </div>
      </div>
    );
  }

  private onChangeEditField = (name: string, value: string) => {
    this.setState({ updatedValue: value });
  };

  private onSaveClicked = () => {
    this.props.onChange(this.props.fieldName, this.state.updatedValue);
    // Calling cancel to close edit mode on parent
    this.props.onCancel();
  };

}

export default SingleEditView;
