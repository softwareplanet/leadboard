import * as classNames from 'classnames';
import * as React from 'react';
import * as Modal from 'react-modal';
import { connect } from 'react-redux';
import organizationIcon from '../../../../../assets/img/organizationIcon.svg';
import Contact from '../../../../../models/Contact';
import CustomFieldSetting from '../../../../../models/customFields/CustomFieldSetting';
import Organization from '../../../../../models/Organization';
import * as addingModalStyles from '../../../../../styles/addingModal.css';
import * as commonStyles from '../../../../../styles/common.css';
import reactModalStyles from '../../../../../styles/reactModalDefaultStyle';
import Table from '../../../../common/Table/Table';
import { getTableData } from '../../../../layouts/Contacts/ContactsService';
import * as styles from './AllContactsModal.css';

const columns = [
  {
    dataField: 'name',
    text: 'Name',
  },
  {
    dataField: 'organization.name',
    text: 'Organization',
  },
];

interface Props {
  contacts: Contact[];
  domainCustomFields: CustomFieldSetting[];
  isModalOpen: boolean;
  organization: Organization;

  toggleModal(): void;
}

class AllContactsModal extends React.Component<Props> {
  private allContactsModalStyles = { ...reactModalStyles };

  constructor(props: Props){
    super(props);
    this.allContactsModalStyles.content.width = '91%';
  }

  public render() {
    const modelName = 'Contact';
    const tableData = getTableData(modelName, this.props.contacts, this.props.domainCustomFields, columns);
    return (
      <Modal
        isOpen={this.props.isModalOpen}
        style={this.allContactsModalStyles}
        onRequestClose={this.props.toggleModal}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={false}
      >
        <header className={addingModalStyles.formHeader}>People</header>
        <button type="button" aria-label="Close" className={addingModalStyles.closeBtn}>
            <span
              aria-hidden="true"
              onClick={this.props.toggleModal}
              className={classNames('close', addingModalStyles.closeIcon)}
            >
              &times;
            </span>
        </button>
        <div className={styles.modalBody}>
          <div className={styles.organizationInfo}>
            <img src={organizationIcon} alt={'organization-icon'} className={styles.organizationIcon} />
            <span className={styles.organizationName}>{this.props.organization.name}</span>
          </div>
          <div className={styles.tableWrapper}>
            <Table
              modelName={modelName}
              data={tableData.rows}
              columns={tableData.columns}
            />
          </div>
        </div>
        <footer className={addingModalStyles.formFooter} >
          <button
            onClick={this.props.toggleModal}
            className={commonStyles.button}
          >
            Close
          </button>
        </footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state: any) => ({
  contacts: state.organization.detailedOrganization.contacts,
  domainCustomFields: state.domain.settings.customFields,
  organization: state.organization.detailedOrganization.organization,
});

export default connect(mapStateToProps)(AllContactsModal);
