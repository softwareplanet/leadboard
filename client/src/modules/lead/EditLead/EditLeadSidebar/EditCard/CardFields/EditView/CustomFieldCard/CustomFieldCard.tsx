import * as classNames from 'classnames';
import * as React from 'react';
import CustomFieldSetting from '../../../../../../../../models/customFields/CustomFieldSetting';
import CustomFieldEditCard from '../CustomFields/CustomFieldEditCard/CustomFieldEditCard';
import * as styles from './CustomFieldCard.css';

interface Props {
  customSettings: CustomFieldSetting;
  addDialogTitle: string;

  editCustomFieldInDomain(customField: CustomFieldSetting): void;
}

interface State {
  editMode: boolean;
}

class CustomFieldCard extends React.Component<Props, State> {
  public state: State = {
    editMode: false,
  };

  public editModeHandler = () => {
    this.setState(prevState => {
      return {editMode: !prevState.editMode} 
    });
  }

  public render() {
    return !this.state.editMode ? this.renderCard() : this.renderEditCard()
  }

  private renderCard = () => {
    return (
      <div>
        <div className={classNames(styles.item, { [styles.editable]: this.isEditable() })}>
          <div className={styles.fieldName}>
            <span className={styles.icon}>A̲</span>
            <div className={styles.title}>
              {this.props.customSettings.name}
            </div>
            <div className={styles.actions}>
              <button className={styles.editButton} onClick={this.editModeHandler}>
                <span>
                  Edit
              </span>
              </button>
            </div>
          </div>
          <ul className={styles.properties}>
            {this.props.customSettings.isAlwaysVisible ? <li>Always visible on sidebar</li> : null}
            {this.props.customSettings.isShownInAddDialog ?
              <li>Appears in "Add new {this.props.addDialogTitle.toLowerCase()}" dialogue</li> : null}
          </ul>
        </div>
      </div>
    );
  }

  private renderEditCard = () => {
    return (
      <CustomFieldEditCard
        field={this.props.customSettings}
        model={this.props.customSettings.model}
        addDialogTitle={this.props.addDialogTitle}
        onSave={this.props.editCustomFieldInDomain}
        onCancel={this.editModeHandler}
      />);
  }

  private isEditable() {
    return !this.props.customSettings.isDefault;
  }
}

export default CustomFieldCard;
