import * as React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

interface Props {
  data: any[];
  columns: any[];
}

class Table extends React.Component<Props, object> {
  public render() {
    return (
      <div>
        <BootstrapTable keyField="_id" data={this.props.data} columns={this.props.columns} hover={true} />
      </div>
    );
  }
}

export default Table;
