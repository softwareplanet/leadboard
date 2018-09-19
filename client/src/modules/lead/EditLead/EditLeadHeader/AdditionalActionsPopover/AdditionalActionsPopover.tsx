import * as React from 'react';
import { Popover } from 'reactstrap';
import * as styles from './AdditionalActionsPopover.css';

interface Props {
  target: string;
  isOpen: boolean;
  leadId: string;

  toggle(): void;

  deleteLead(leadId: string): void;
}

class AdditionalActionsPopover extends React.Component<Props> {

  public render() {
    return (
      <Popover
        className={styles.popover}
        placement="bottom-end"
        target={this.props.target ? this.props.target : ''}
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
      >
        <div className={styles.popoverBody}>
          <div className={styles.actions}>
            <div
              className={styles.action}
              onClick={this.handleDeleteClick}
            >
              Delete
            </div>
          </div>
        </div>
      </Popover>
    );
  }

  private handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      this.props.deleteLead(this.props.leadId);
    } else {
      this.props.toggle();
    }
  }
}

export default AdditionalActionsPopover;
