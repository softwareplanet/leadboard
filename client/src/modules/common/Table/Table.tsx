import * as React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Contact from '../../../models/Contact';

interface Props {
  contacts: Contact[];
  columns:any[];
}

class Table extends React.Component<Props, object> {
  public render() {
    return (
      <div>
        <BootstrapTable keyField="_id" data={this.props.contacts} columns={this.props.columns} hover={true} />
      </div>
    );
  }
}

export default Table;
