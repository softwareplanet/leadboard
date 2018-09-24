import * as React from 'react';
import isBlank from '../../../../../../utils/isBlank';
import * as styles from './CardField.css';
import SingleEditView from './EditView/SingleEditView/SingleEditView';
import { Link } from 'react-router-dom';

export interface Props {
  title: string;
  value: string;
  icon?: string;
  link: string;
  onUpdate(value: string): void;
}

export interface State {
  isInEditMode: boolean;
}

class MainField extends React.Component<Props, State> {

  private static isNameValid(name: string): boolean {
    return !isBlank(name);
  }

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
                <Link to={`/${this.props.link.toLowerCase()}`} className={styles.mainValue}>
                  {name}
                </Link>
              </h3>
              <button
                className={styles.buttonRename}
                onClick={this.openEditMode}
              >
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
              onCancel={this.closeEditMode}
              isValid={MainField.isNameValid}
              fieldKey={'name'}
            />
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
