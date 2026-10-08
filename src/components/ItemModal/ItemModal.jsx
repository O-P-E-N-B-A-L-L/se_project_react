import "./ItemModal.css";

function ItemModal({ card, activeModal, onClose }) {
  return (
    <div
      className={`modal${activeModal === "preview" ? " modal_opened" : ""}`}
      onClick={(evt) => {
        if (evt.target === evt.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__button--close"
          type="button"
          onClick={onClose}
        ></button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
