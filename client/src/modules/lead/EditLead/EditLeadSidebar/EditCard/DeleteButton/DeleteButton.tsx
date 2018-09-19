import * as React from 'react';
import trashIcon from '../../../../../../assets/trash-icon.svg';

interface Props {
  className: any;

  onClick(): void;
}

class DeleteButton extends React.Component<Props, object> {
  public render() {
    return (
      <button className={this.props.className} onClick={this.props.onClick}>
        <img src={trashIcon} alt="trash-icon" />
      </button>
    );
  }
}

export default DeleteButton;
