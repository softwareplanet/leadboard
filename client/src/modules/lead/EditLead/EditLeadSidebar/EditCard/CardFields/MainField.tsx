import * as React from 'react';
import * as styles from './CardField.css';
import SingleEditView from './EditView/SingleEditView/SingleEditView';

export interface Props {
  title: string;
  value: string;
  icon?: string;

  onUpdate(value: string): void;
}

export interface State {
  isInEditMode: boolean;
}

class MainField extends React.Component<Props, State> {

  public state: State = {
    isInEditMode: false,
  };

  public render() {
    const name = this.props.value;
    const { isInEditMode } = this.state;
    return (
      <div>
        {
          !isInEditMode &&
          <div className={styles.fieldValue}>
            <div className={styles.mainFieldValueWrapper}>
          <span className={styles.badge}>
            <img className={styles.icon} src={this.props.icon} alt="Icon" />
          </span>
              <h3>
              <span className={styles.mainValue}>
                {name}
              </span>
              </h3>
              <button className={styles.buttonRename}
                      onClick={this.openEditMode}>
                Rename
              </button>
            </div>
          </div>
        }
        {
          isInEditMode &&
          <div className={styles.fieldEditValue}>
            <SingleEditView
              fieldName={'Name'}
              fieldValue={name}
              onChange={this.handleNameUpdate}
              onCancel={this.closeEditMode} />
          </div>
        }
      </div>
    );
  }

  private openEditMode = () => {
    this.setState({ isInEditMode: true });
  };

  private closeEditMode = () => {
    this.setState({ isInEditMode: false });
  };

  private handleNameUpdate = (name: string, value: string) => {
    this.props.onUpdate(value);
    this.closeEditMode();
  };
}

export default MainField;
