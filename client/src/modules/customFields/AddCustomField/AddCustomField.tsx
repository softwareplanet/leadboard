import cx from 'classnames';
import * as React from 'react';
import * as Modal from 'react-modal';
import CustomFieldSetting from '../../../models/customFields/CustomFieldSetting';
import isBlank from '../../../utils/isBlank';
import EditFieldGroup
  from '../../lead/EditLead/EditLeadSidebar/EditCard/CardFields/EditView/EditFieldGroup/EditFieldGroup';
import * as styles from './AddCustomField.css';

interface Props {
  modelName: string;

  addCustomField(customField: CustomFieldSetting): void
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
    bottom: 'auto',
    boxShadow: '0 10px 45px rgba(38,41,44,.88)',
    boxSizing: 'border-box',
    left: '50%',
    margin: '0',
    padding: '0',
    right: 'auto',
    top: '100px',
    transform: 'translate(-50%, 0)',
    width: '590px',
  },
};

const defaultState: State = {
  isModalShown: false,
  isValidationShown: false,
  newFieldName: '',
  newFieldType: 'string',
};

class AddCustomField extends React.Component<Props, State> {
  public state: State = defaultState;

  public render() {
    return (
      <div>
        <button
          className={styles.addButton}
          onClick={this.showModal}
        >
          {`Add ${this.props.modelName.toLowerCase()} field`}
        </button>
        <Modal
          isOpen={this.state.isModalShown}
          onRequestClose={this.hideModal}
          shouldCloseOnOverlayClick={false}
          style={modalStyles}
        >
          <div className={styles.modalHeading}>
            <div className={styles.modalHeader}>{`Add a field for ${this.props.modelName.toLowerCase()}s`}</div>
            <button className={styles.closeModal} onClick={this.hideModal}>
              <i className="fas fa-times" />
            </button>
          </div>
          <div className={styles.modalBody}>
            <div className={this.state.isValidationShown && !this.isNameValid() ? styles.error : styles.hidden}>
              Field cannot be empty
            </div>
            <div className={styles.nameInputGroupContainer}>
              <EditFieldGroup
                fieldKey={'fieldName'}
                name={'Name of the field'}
                value=""
                onChange={this.updateFieldName}
                isValid={this.state.isValidationShown ? this.isNameValid() : undefined}
              />
            </div>
            <div className={styles.actions}>
              <button
                className={cx(styles.buttonSave, { [styles.disabled]: !this.isNameValid() })}
                onClick={this.saveCustomField}
              >
                Save
              </button>
              <button className={styles.buttonCancel} onClick={this.hideModal}>Cancel</button>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <small>
              Please bear in mind that customized fields are shared with all users throughout your company.
            </small>
          </div>
        </Modal>
      </div>
    );
  }

  private isNameValid = (): boolean => {
    return !isBlank(this.state.newFieldName);
  };

  private updateFieldName = (name: string, value: string) => {
    this.setState({
      newFieldName: value,
    });
  };

  private showModal = () => {
    this.setState({
      isModalShown: true,
    });
  };

  private hideModal = () => {
    this.setState(defaultState);
  };

  private showValidation = () => {
    this.setState({
      isValidationShown: true,
    });
  };

  private saveCustomField = () => {
    if (this.isNameValid()) {
      const { newFieldName, newFieldType } = this.state;
      const newCustomField: CustomFieldSetting = {
        isAlwaysVisible: false,
        isDefault: false,
        isShownInAddDialog: false,
        model: this.props.modelName,
        name: newFieldName,
        type: newFieldType,
      };
      this.props.addCustomField(newCustomField);
      this.hideModal();
    } else {
      this.showValidation();
    }
  }
}

export default AddCustomField;
