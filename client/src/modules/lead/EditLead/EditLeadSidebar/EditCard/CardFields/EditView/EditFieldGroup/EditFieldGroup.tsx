import * as React from 'react';
import * as styles from './EditFieldGroup.css';

export interface Props {
  name: string;
  isValid?: boolean;
  value: string;

  onChange(fieldName: string, fieldValue: string): void;
}

class EditFieldGroup extends React.Component<Props> {

  public render() {
    const isValid: boolean = this.props.isValid || this.props.isValid === undefined;
    return (
      <div className={styles.wrapper}>
        <div className={styles.labelWrapper}>
          <span className={styles.label}>{this.props.name}</span>
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            name={this.props.name}
            className={isValid ? styles.input : styles.inputInvalid}
            defaultValue={this.props.value}
            onChange={this.onInputChange} />
        </div>
      </div>
    );
  }

  private onInputChange = (e: any) => {
    this.props.onChange(e.target.name, e.target.value);
  };

}

export default EditFieldGroup;
