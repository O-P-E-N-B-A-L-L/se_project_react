import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  activeModal,
  formHasErrors,
  onClose,
  onSubmit,
}) {
  return (
    <div
      className={`modal${activeModal === "add-garment" ? " modal_opened" : ""}`}
      onClick={(evt) => {
        if (evt.target === evt.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          className="modal__button--close modal__button--close_type_medium"
          type="button"
          aria-label="Close"
          onClick={onClose}
        ></button>
        <form action="" className="modal__form" noValidate onSubmit={onSubmit}>
          {children}
          <button
            className={`modal__button--submit${formHasErrors ? " is-disabled" : ""}`}
            type="submit"
            disabled={formHasErrors}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
