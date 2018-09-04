import * as React  from 'react'
import * as Modal from 'react-modal'
import Activity from '../../../../../models/Activity';
import AddActivity from '../../EditLeadContent/EditLeadTabs/AddActivity/AddActivity';
import * as styles from './EditActivityModal.css';
interface Props {
  activity: Activity;
  isModalOpen: boolean;
  closeModal(): void;
}

const customStyles = {
  content: {
    top: 0,
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, 0)',
    margin: '0',
    padding: '0',
    width: '420px',
    borderRadius: '0 0 2px 2px',
    border: '1px solid #e5e5e5',
    boxShadow: '0 10px 45px rgba(38,41,44,.88)',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
};

export default class EditActivityModal extends React.Component<Props, object> {
  public render() {
    return (
      <Modal
        isOpen={this.props.isModalOpen}
        onRequestClose={this.props.closeModal}
        shouldCloseOnOverlayClick={true}
        style={customStyles}
      >
        <header className={styles.header}>{this.props.activity.subject}</header>
        <div>
          <AddActivity />
        </div>
      </Modal>
    )
  }
}
