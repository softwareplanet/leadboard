import * as React from 'react';
import { connect } from 'react-redux';
import NavBar from '../../Navbar/Navbar';
import { loadContacts } from '../../../common/autocomplete/contact/contactActions';
interface Props {
  loadContacts(): object;
}

class People extends React.Component<Props, object> {
  public componentWillMount = () => {
    this.props.loadContacts();
  };

  public render() {
    return (
      <div>
        <NavBar />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  contacts: state.contacts,
});

export { People };
export default connect(mapStateToProps, { loadContacts })(People);
