import * as React from 'react';
import { connect } from 'react-redux';
import isBlank from '../../../../utils/isBlank';
import InputGroup from '../../../common/InputGroup/InputGroup';
import * as styles from './PipeDriveImport.css';
import { startImport } from './PipeDriveImportService';

interface Props {
  domainId: string;
  importStatus: {
    message: string,
    status: boolean,
  };
}

interface State {
  apiToken: string;
  [name: string]: string;
}

class PipeDriveImport extends React.Component<Props, State> {
  public state: State = {
    apiToken: '',
  };

  public onClick = () => {
    if (window.confirm('You will import data from Pipedrive.' +
      'This action duplicates data that has been imported from Pipedrive before. Are you sure you want to import?')
    ) {
      const { apiToken } = this.state;
      const props = this.props;
      if(!isBlank(apiToken)){
        startImport(props.domainId, apiToken);
      }
      this.setState({apiToken: ''});
    }
  }

  public render() {
    const { importStatus } = this.props;
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
          <p className={styles.tokenHint}> You can find your token in your Pipedrive account's settings</p>
          <div>
            <button className={styles.button} onClick={this.onClick}>
              Start import
            </button>
          </div>
          <span className={importStatus.status ? styles.successStyles : styles.rejectStyles}>{importStatus.message}</span>
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

const mapStateToProps = (state: any) => ({
  domainId: state.domain._id,
  importStatus: state.import.importStatus,
});

export { PipeDriveImport };

export default connect(mapStateToProps)(PipeDriveImport);
