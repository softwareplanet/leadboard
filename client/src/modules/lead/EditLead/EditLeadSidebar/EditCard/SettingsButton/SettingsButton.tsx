import * as React from 'react';
import { Popover, PopoverBody } from 'reactstrap';
import settingsIcon from '../../../../../../assets/settings-icon.svg';
import * as styles from './SettingsButton.css';

interface State {
  showPopover: boolean,
}

interface Props {
  showCustomize(): void,
}

class SettingsButton extends React.Component<Props, State> {

  public state: State = {
    showPopover: false,
  };

  public render() {
    return (
        <button id="settingsButton" className={styles.settingsButton} onClick={this.togglePopover}>
          <img className={styles.settingsIcon} src={settingsIcon} alt="Settings icon" />
          <Popover
            placement="bottom-start"
            isOpen={this.state.showPopover}
            toggle={this.togglePopover}
            target="settingsButton"
          >
            <PopoverBody className={styles.popover}>
              <ul className={styles.list}>
                <li className={styles.listElement} onClick={this.props.showCustomize}>Customize fields</li>
              </ul>
            </PopoverBody>
          </Popover>
        </button>
    );
  }

  private togglePopover = () => {
    this.setState({
      showPopover: !this.state.showPopover,
    });
  };
}

export default SettingsButton;
