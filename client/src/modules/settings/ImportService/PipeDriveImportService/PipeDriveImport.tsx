import * as React from 'react';
import { connect } from 'react-redux';
import InputGroup from '../../../common/InputGroup/InputGroup';
import * as styles from './PipeDriveImport.css';
import {
  getContactFields,
  getContactsData,
  getOrganizationFields,
  getOrganizationsData,
} from './pipeDriveImportActions';

interface Props {

  getOrganizationsData(token: string): void;

  getContactsData(token: string): void;

  getOrganizationFields(token: string): void;

  getContactFields(token: string): void;
}

interface State {
  apiToken: string;
  [name: string]: string;
}

class ImportService extends React.Component<Props, State> {
  public state: State = {
    apiToken: '',
  };

  public onClick = () => {
    const { apiToken } = this.state;
    this.props.getOrganizationsData(apiToken);
    this.props.getContactsData(apiToken);
    this.props.getOrganizationFields(apiToken);
    this.props.getContactFields(apiToken);
  }

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
            <button className={styles.button} onClick={this.onClick}>
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

const mapStateToProps = (state: any) => ({
  data: state.import,
});

export default connect(mapStateToProps,
  {
    getContactFields,
    getContactsData,
    getOrganizationFields,
    getOrganizationsData,
  })(ImportService);
