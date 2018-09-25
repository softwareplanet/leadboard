import * as React from 'react';
import organizationIcon from '../../../assets/img/organizationIcon.svg';
import personIcon from '../../../assets/img/personIcon.svg';
import ownerIcon from '../../../assets/img/user-icon.svg';
import Contact from '../../../models/Contact';
import Organization from '../../../models/Organization';
import EditLeadFieldPopover from '../../lead/EditLead/EditLeadHeader/EditLeadFieldPopover/EditLeadFieldPopover';
import * as leadHeaderStyles from '../../lead/EditLead/EditLeadHeader/EditLeadHeader.css';
import * as styles from './DetailedViewHeader.css';

interface Props {
  model: Organization | Contact;
  modelType: string;

  modelUpdateAction(model: any): void;
}

const displayFlex = {
  display: 'flex',
};

interface State {
  isNamePopoverOpen: boolean;
}

export default class DetailedViewHeader extends React.Component<Props, State> {
  public state: State = {
    isNamePopoverOpen: false,
  };

  public render() {
    const model = this.props.model;
    const iconSrc = this.props.modelType === 'Organization' ? organizationIcon : personIcon;
    return (
      <div className={styles.header}>
        <div style={displayFlex}>
          <span className={styles.badge}>
            <img className={styles.icon} src={iconSrc} alt="Icon" />
          </span>
          <h1 onClick={this.toggleModelNamePopover} className={styles.name} id={`${this.props.modelType}-header-name`}>{model.name}</h1>
          <EditLeadFieldPopover
            onSave={this.handleModelNameSave}
            onCancel={this.toggleModelNamePopover}
            value={model ? model.name : null}
            isOpen={this.state.isNamePopoverOpen}
            target={`${this.props.modelType}-header-name`}
            toggle={this.toggleModelNamePopover}
            title={`Rename this ${this.props.modelType.toLowerCase()}:`}
          />
        </div>
        <div className={leadHeaderStyles.leadOptions}>
          <div className={leadHeaderStyles.owner}>
            <img src={ownerIcon} className={leadHeaderStyles.ownerPicture} />
            <div className={leadHeaderStyles.ownerBody}>
              <span>{model.owner ? model.owner.firstname + ' ' + model.owner.lastname : ''}</span>
              <small className={leadHeaderStyles.ownerRole}>Owner</small>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private handleModelNameSave = (name: string) => {
    this.props.modelUpdateAction({ _id: this.props.model._id, name });
    this.toggleModelNamePopover();
  }

  private toggleModelNamePopover = () => {
    this.setState({
      isNamePopoverOpen: !this.state.isNamePopoverOpen,
    });
  }
}
