import * as React from 'react';
import EditCustomField from '../EditCustomField/EditCustomField';

interface Props {
  model:string,
  customFields:any[],
}

class EditCustomFieldsView extends React.Component<Props, object> {
  public render() {
    return (
      <div>
        {this.props.customFields.map(custom => {
          if(this.props.model === custom.model){
            <EditCustomField customSettings={custom} />
          }
        })}
      </div>
    );
  }
}

export default EditCustomFieldsView;
