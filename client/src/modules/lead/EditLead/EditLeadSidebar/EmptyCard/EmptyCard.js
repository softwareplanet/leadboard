import React, { Component } from "react";
import styles from "../EditCard/EditCard.css";
import Modal from "react-modal";
import classNames from "classnames";
import indefiniteArticle from "../../../../../utils/indefiniteArticle";

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
  },
};

class EmptyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isLinkDisabled: true,
      items: [],
      name: "",
      openDropdown: false,

    };
  }

  openModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  onLinkClick = (e) => {
    e.preventDefault();
    this.openModal();
  };

  onFocus = () => {
    console.log("Focus");
  };

  onChange = () => {
    console.log("Change");
  };

  onSelect = () => {
    console.log("Select");
  };

  onBlur = () => {
    console.log("Blur");
  };

  render() {
    const childrenWithExtraProps = React.cloneElement(this.props.children, {
      items: this.state.items,
      onFocus: this.onFocus,
      onChange: this.onChange,
      onSelect: this.onSelect,
      onBlur: this.onBlur,
      value: this.state.name,
      open: this.state.openDropdown,
    });

    let title = this.props.title.toLowerCase();
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

          <div className={styles.modalContent}>
            <form className={styles.modalForm}>
              <label style={{width: "100%"}}>
                <span className={styles.formSpan}>{this.props.title} name</span>
                <div className={styles.inputContainer}>
                  <i className={this.props.iTagClass} />
                  {
                    childrenWithExtraProps
                  }
                </div>
              </label>
              <div className={styles.additionMessage}>
                A new person (*here input*) will be created and linked to this deal.
              </div>
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
                  onClick={() => alert("Linking")}
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

export default EmptyCard;