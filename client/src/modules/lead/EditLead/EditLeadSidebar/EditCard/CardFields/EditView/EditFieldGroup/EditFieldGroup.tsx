import * as React from 'react';
import * as styles from './EditFieldGroup.css';

export interface Props {
  fieldKey: string;
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
            id={`input${this.props.fieldKey}`}
            type="text"
            name={this.props.name}
            className={isValid ? styles.input : styles.inputInvalid}
            defaultValue={this.props.value}
            onChange={this.onInputChange} />
        </div>
      </div>
    );
  }

  private onInputChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    this.props.onChange(target.id.slice(5), target.value);
  };

}

export default EditFieldGroup;
