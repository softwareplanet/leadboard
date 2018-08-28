import React, {Component} from "react";
import styles from "../EditCard/EditCard.css";
import Modal from "react-modal";
import classNames from "classnames";
import indefiniteArtcile from "../../../../../utils/indefiniteArticle";

const customStyles = {
  content: {
    top: 0,
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, 0)",
    margin: "0",
    padding: "0",
    width: "350px",
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
      isModalOpen: false
    }
  }

  openModal = () => {
    this.setState({
      isModalOpen: true
    })
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false
    })
  };

  onLinkClick = (e) => {
    e.preventDefault();
    this.openModal();
  };

  render() {
    let title = this.props.title.toLowerCase();
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.titleName}>{title}</span>
        </div>

        <div className={styles.linkObject}>
          <p className={styles.linkDescription}>No {title} is linked to this deal.</p>
          <a className={styles.link} href="#" onClick={this.onLinkClick}>
            { `+ Link ${indefiniteArtcile(title)} ${title}` }
          </a>
        </div>

        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} shouldCloseOnOverlayClick={false}
               style={customStyles}>
          <header className={styles.formHeader}>
            { `Link ${indefiniteArtcile(title)} ${title}` }
            </header>
          <button type="button" onClick={this.closeModal} aria-label="Close" className={styles.closeBtn}>
            <span aria-hidden="true" className={classNames("close", styles.closeIcon)}>
              &times;
            </span>
          </button>
        </Modal>
      </div>
    )
  }
}

export default EmptyCard;