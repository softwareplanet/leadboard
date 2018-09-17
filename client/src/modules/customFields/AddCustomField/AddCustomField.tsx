import * as React from 'react';
import * as Modal from 'react-modal';
import CustomFieldSetting from '../../../models/customFields/CustomFieldSetting';
import isBlank from '../../../utils/isBlank';
import EditFieldGroup
  from '../../lead/EditLead/EditLeadSidebar/EditCard/CardFields/EditView/EditFieldGroup/EditFieldGroup';
import * as styles from './AddCustomField.css';

interface Props {
  modelName: string;

  addCustomField(modelName: string, customField: CustomFieldSetting): void
}

interface State {
  isModalShown: boolean;
  isValidationShown: boolean;
  newFieldName: string;
  newFieldType: string;
}

const modalStyles = {
  content: {
    border: '1px solid #e5e5e5',
    borderRadius: '0 0 2px 2px',
    boxShadow: '0 10px 45px rgba(38,41,44,.88)',
    boxSizing: 'border-box',
    top: '100px',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, 0)',
    margin: '0',
    padding: '0',
    width: '350px',

  },
};

class AddCustomField extends React.Component<Props, State> {

  public state: State = {
    isModalShown: false,
    isValidationShown: false,
    newFieldName: '',
    newFieldType: 'string',
  };

  public render() {
    return (
      <div>
        <button
          className={styles.addButton}
          onClick={this.showModal}
        >
          {`Add ${this.props.modelName} field`}
        </button>
        <Modal
          isOpen={this.state.isModalShown}
          onRequestClose={this.hideModal}
          shouldCloseOnOverlayClick={false}
          style={modalStyles}
        >
          <div className={styles.modalHeading}>
            <h2 className={styles.modalHeader}>{`Add a field for ${this.props.modelName}s`}</h2>
            <button onClick={this.hideModal}>X</button>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.typeSelector}>
              <h1 className={styles.typeSelectorHeader}>
                What type of field do you want to add?
              </h1>
            </div>
            <div className={styles.nameInputGroupContainer}>
              <EditFieldGroup
                fieldKey={'fieldName'}
                name={'Name of the field'}
                value={''}
                onChange={this.updateFieldName}
                isValid={this.state.isValidationShown ? this.isNameValid() : undefined}
              />
            </div>
            <div className={styles.actions}>
              <button className={styles.buttonSave} onClick={this.saveCustomField}>
                Save
              </button>
              <button className={styles.buttonCancel}>Cancel</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  private isNameValid = (): boolean => {
    return !isBlank(this.state.newFieldName);
  };

  private updateFieldName = (name: string, value: string): void => {
    this.setState({
      newFieldName: value,
    });
  };

  private showModal = (): void => {
    this.setState({
      isModalShown: true,
    });
  };

  private hideModal = (): void => {
    this.setState({
      isModalShown: false,
    });
  };

  private saveCustomField = (): void => {
    const newCustomField: CustomFieldSetting = {
      isAlwaysShownInAddDialog: false,
      isAlwaysVisible: false,
      isDefault: false,
      model: this.props.modelName.toLowerCase(),
      name: this.state.newFieldName,
      type: this.state.newFieldType,
    };
    this.props.addCustomField(this.props.modelName, newCustomField);
  };
}

export default AddCustomField;
