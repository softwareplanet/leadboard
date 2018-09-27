import * as React from 'react';
import CustomFieldData from '../../../../../../models/customFields/CustomFieldData';
import isBlank from '../../../../../../utils/isBlank';
import EditButton from '../EditButton/EditButton';
import * as styles from './CardField.css';
import SingleEditView from './EditView/SingleEditView/SingleEditView';

interface Props {
  field: CustomFieldData;

  onUpdate(name: string, value: any): void;
}

interface State {
  isInEditMode: boolean,
}

export default class CardField extends React.Component<Props, State> {

  public state: State = {
    isInEditMode: false,
  };

  public render() {
    const { name, value, key } = this.props.field;
    const { isInEditMode } = this.state;

    const valueAdd = (
      <span className={styles.addValue} onClick={this.openEditMode}>
        + Add value
      </span>
    );
    const valueShow = (
      <div id="fieldValue" className={styles.customFieldValueWrap}>
        <span className={styles.customFieldValue}>
          {value}
        </span>
      </div>
    );
    return (
      <div className={styles.customValue}>
        {
          !isInEditMode &&
          <div className={styles.customFieldsWrapper}>
            <div id="fieldLabel" className={styles.customFieldLabelWrap}>
              <span className={styles.customFieldLabel}>{name}</span>
            </div>
            {isBlank(value) ? valueAdd : valueShow}
            {
              !isBlank(value) && <EditButton onClick={this.openEditMode} style={styles.editButton} />
            }
          </div>
        }
        {
          this.state.isInEditMode &&
          <SingleEditView
            fieldName={name}
            fieldValue={value}
            fieldKey={key}
            onChange={this.props.onUpdate}
            onCancel={this.closeEditMode} />
        }
      </div>
    );
  }

  private openEditMode = () => {
    this.setState({ isInEditMode: true });
  };

  private closeEditMode = () => {
    this.setState({ isInEditMode: false });
  };
}
