import * as React from 'react';
import * as Modal from 'react-modal';
import * as styles from './AddCustomField.css';

interface Props {
  buttonSign: string;
}

interface State {
  isModalShown: boolean;
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
  };

  public render() {
    return (
      <div>
        <button
          className={styles.addButton}
          onClick={this.showModal}
        >
          {this.props.buttonSign}
        </button>
        <Modal
          isOpen={this.state.isModalShown}
          onRequestClose={this.hideModal}
          shouldCloseOnOverlayClick={false}
          style={modalStyles}>

        </Modal>
      </div>
    );
  }

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
}


export default AddCustomField;
