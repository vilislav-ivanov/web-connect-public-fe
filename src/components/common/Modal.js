function Modal({ actionType, onConfirm, modalStyle, modalTitle, modalBody }) {
  let classes = `btn ${modalStyle}`;

  return (
    <>
      <button
        type="button"
        className={classes}
        data-toggle="modal"
        data-target="#exampleModal"
      >
        {actionType}
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {modalTitle}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{modalBody}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className={classes}
                data-dismiss="modal"
                onClick={onConfirm}
              >
                {actionType}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
