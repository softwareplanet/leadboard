import * as React from 'react';
import InputGroup from '../../../common/InputGroup/InputGroup';
import * as styles from './PipeDriveImport.css';

interface State {
  apiToken: string;
  [name: string]: string;
}

export default class ImportService extends React.Component<{}, State> {
  public state: State = {
    apiToken: '',
  };

  public render() {
    return (
      <div className={styles.container}>
        <span className={styles.title}>
          <h2>Import Your Data From Pipedrive</h2>
          <h2>Just fill in the form below and initiate the import</h2>
        </span>
        <div className={styles.dataModule}>
          <InputGroup
            name="apiToken"
            value={this.state.apiToken}
            onChange={this.onChange}
            label="API token"
          />
          <div>
            <button className={styles.button}>
              Start import
            </button>
          </div>
        </div>
      </div>
    );
  }

  private onChange = (event: any) => {
    const newState = { ...this.state };
    newState[event.target.name] = event.target.value;
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
}
