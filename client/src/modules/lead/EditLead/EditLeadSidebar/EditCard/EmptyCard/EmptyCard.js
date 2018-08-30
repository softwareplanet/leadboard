import React, { Component } from "react";
import styles from "../EditCard.css";
import Modal from "react-modal";
import classNames from "classnames";
import indefiniteArticle from "../../../../../../utils/indefiniteArticle";
import { autocompleteStyles } from "../../../../../common/autocomplete/styles/autocomplete-styles";
import isBlank from "../../../../../../utils/isBlank";

const customStyles = {
  content: {
    top: 0,
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, 0)",
    margin: "0",
    padding: "0",
    width: "420px",
    borderRadius: "0 0 2px 2px",
    border: "1px solid #e5e5e5",
    boxShadow: "0 10px 45px rgba(38,41,44,.88)",
    boxSizing: "border-box",
    overflow: "hidden",
  },
};

class EmptyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isLinkDisabled: true,
      items: [],
      item: {
        id: null,
        name: ""
      },
      itemAfterSelect : {
        id: null,
        name: "",
      },
      name: "",
      openDropdown: false,
      showAdditionalMessage: false,
      showBadge: false,
    };
  }

  openModal = () => {
    this.setState({
      isModalOpen: true,
      items: this.props.items,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      isLinkDisabled: true,
      item: {
        id: null,
        name: ""
      },
      itemAfterSelect : {
        id: null,
        name: "",
      },
      name: "",
      openDropdown: false,
      showAdditionalMessage: false,
      showBadge: false,
    });
  };

  onLinkClick = (e) => {
    e.preventDefault();
    this.openModal();
  };

  onFocus = () => {
    document.getElementById(`${this.props.title.toLowerCase()}-input-wrapper`).setAttribute("style", "border: 1px solid #317ae2");
  };

  onChange = (event) => {
    let inputValue = event.target.value;
    this.setState({
      item: {
        id: this.state.itemAfterSelect.name === event.target.value ? this.state.itemAfterSelect.id : null,
        name: event.target.value
      },
      openDropdown: true,
      showAdditionalMessage: isBlank(inputValue) ? false : this.state.showAdditionalMessage,
      isLinkDisabled: isBlank(inputValue) ? true : this.state.isLinkDisabled,
      showBadge: isBlank(inputValue) ? false : this.state.showBadge,
    })
  };

  onSelect = (value, item) => {
    this.setState({
      item: {
        id: item._id,
        name: value
      },
      openDropdown: false,
      showBadge: false,
      itemAfterSelect: {
        id: item._id,
        name: value,
      },
    }, () => this.onBlur())
  };

  onSave = () => {
    let updatedLead = {};
    updatedLead._id = this.props.lead._id;
    const { item } = this.state;
    updatedLead[this.props.id.split("-")[0]] = item.id ? item.id : item.name;
    this.props.onUpdate(updatedLead);
  };

  onBlur = () => {
    document.getElementById(`${this.props.title.toLowerCase()}-input-wrapper`).removeAttribute("style");
    this.setState({
      openDropdown: false,
      name: this.state.item.name,
      showAdditionalMessage: !isBlank(this.state.item.name),
      isLinkDisabled: isBlank(this.state.item.name),
      showBadge: !this.state.item.id && this.state.item.name.length,
    })
  };

  clearInput = () => {
    document.getElementById(`${this.props.title.toLowerCase()}-input-wrapper`).getElementsByTagName("input")[0].focus();
    this.setState({
      name: "",
      item: {
        id: null,
        name: ""
      },
      itemAfterSelect : {
        id: null,
        name: "",
      },
      showAdditionalMessage: false,
      isLinkDisabled: true,
    })
  };

  render() {
    const childrenWithExtraProps = React.cloneElement(this.props.children, {
      items: this.state.items,
      onFocus: this.onFocus,
      onChange: this.onChange,
      onSelect: this.onSelect,
      onBlur: this.onBlur,
      value: this.state.item.name,
      open: this.state.openDropdown,
      styles: this.props.styles,
      inputStyle: autocompleteStyles.linkLeadInput,
      itemsCount: 3,
    });

    const title = this.props.title.toLowerCase();
    const additionalMessage = (
      <div className={styles.additionMessage}>
        { !this.state.item.id ?
          `A new ${title} (${this.state.name}) will be created and linked to this lead.` :
          `The existing ${title} (${this.state.name}) will be linked to this lead.`
        }
      </div>
    );

    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.titleName}>{title}</span>
        </div>

        <div className={styles.linkObject}>
          <p className={styles.linkDescription}>No {title} is linked to this deal.</p>
          <a className={styles.link} href="#" onClick={this.onLinkClick}>
            {`+ Link ${indefiniteArticle(title)} ${title}`}
          </a>
        </div>

        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={false}
          style={customStyles}
          overlayClassName={styles.overlayModal}
        >
          <header className={styles.formHeader}>
            {`Link ${indefiniteArticle(title)} ${title}`}
          </header>

          <button type="button" onClick={this.closeModal} aria-label="Close" className={styles.closeBtn}>
            <span aria-hidden="true" className={classNames("close", styles.closeIcon)}>
              &times;
            </span>
          </button>

          <div id={this.props.id} className={styles.modalContent}>
            <form className={styles.modalForm}>
              <label style={{width: "100%"}}>
                <span className={styles.formSpan}>{this.props.title} name</span>
                <div id={`${title}-input-wrapper`} className={styles.inputContainer}>
                  <i className={this.props.iTagClass} />
                  { childrenWithExtraProps }
                  {
                    this.state.showBadge ? <span id={`${title}-badge`} className={styles.newBadge}>NEW</span> : (
                      <button type="button" className={styles.clearBtn} onClick={this.clearInput}>
                        <span className={styles.clearIcon}>&times;</span>
                      </button>
                    )
                  }
                </div>
              </label>
              {
                this.state.showAdditionalMessage ? additionalMessage : <div/>
              }
            </form>
          </div>

          <footer className={styles.modalFooter}>
            <div>

              <button
                className={styles.cancelButton}
                onClick={this.closeModal}
              >
                <span className={styles.cancelSpan}>Cancel</span>
              </button>

              <span>
                <button
                  className={this.state.isLinkDisabled ? styles.disabledButton : styles.enableButton}
                  onClick={this.onSave}
                  disabled={this.state.isLinkDisabled}
                >
                  <span className={styles.linkSpan}>Link {indefiniteArticle(title)} {title}</span>
                </button>
              </span>

            </div>
          </footer>
        </Modal>
      </div>
    );
  }
}
export {EmptyCard};
export default EmptyCard;
