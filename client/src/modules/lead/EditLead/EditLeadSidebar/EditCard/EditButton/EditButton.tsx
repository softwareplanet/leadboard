import * as React from 'react';
import editIcon from '../../../../../../assets/edit-icon.svg';
import * as styles from './EditButton.css';

interface Props {
  style?: string;

  onClick(): void;
}

class EditButton extends React.Component<Props, object> {

  public render() {
    return (
      <button
        className={this.props.style ? this.props.style : styles.editButton}
        onClick={this.props.onClick}>
        <img className={styles.editIcon} src={editIcon} alt="Edit icon" />
      </button>
    );
  }
}

export default EditButton;