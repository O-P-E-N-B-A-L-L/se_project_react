import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  name,
  buttonText,
  isOpen,
  formHasErrors,
  onClose,
  onSubmit,
}) {
  return (
    <div
      className={`modal modal_type_${name}${isOpen ? " modal--opened" : ""}`}
      onClick={(evt) => {
        if (evt.target === evt.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          className="modal__close-button modal__close-button--type-medium"
          type="button"
          aria-label="Close"
          onClick={onClose}
        ></button>
        <form
          name={name}
          action=""
          className="modal__form"
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={`modal__submit-button${formHasErrors ? " modal__submit-button--disabled" : ""}`}
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
