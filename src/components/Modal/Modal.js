import React from "react";
import ReactDOM from "react-dom";

function Modal({ show, close, title, children, closeButton, submitButton }) {
  const closeModal = () => close();

  return ReactDOM.createPortal(
    show ? (
      <div className="modalContainer" onClick={closeModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <header className="modal_header">
            <h2 className="modal_header-title"> {title}</h2>
          </header>
          <main className="modal_content">{children}</main>
          <footer className="modal_footer">
            {closeButton && (
              <button className="modal-close" onClick={closeModal}>
                {closeButton}
              </button>
            )}

            {submitButton && <button className="submit">{submitButton}</button>}
          </footer>
        </div>
      </div>
    ) : null,
    document.getElementById("modal")
  );
}

export default Modal;
