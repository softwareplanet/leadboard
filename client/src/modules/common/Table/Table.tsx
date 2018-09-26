import * as React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import history from '../../../history';

interface Props {
  modelName: string;
  data: any[];
  columns: any[];
}

class Table extends React.Component<Props, object> {

  public selectRow = {
    clickToSelect: true,
    hideSelectColumn: true,
    mode: 'radio',
    onSelect: (row: any) => {
      history.push(`/${this.props.modelName.toLocaleLowerCase()}/${row._id}`);
    },
  };

  public render() {
    return (
      <div>
        <BootstrapTable
          keyField="_id"
          data={this.props.data}
          columns={this.props.columns}
          hover={true}
          selectRow={this.selectRow}
        />
      </div>
    );
  }
}

export default Table;
