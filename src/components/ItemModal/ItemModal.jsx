import "./ItemModal.css";

function ItemModal({ card, isOpen, onClose }) {
  return (
    <div
      className={`modal${isOpen ? " modal--opened" : ""}`}
      onClick={(evt) => {
        if (evt.target === evt.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal__content modal__content--type-image">
        <button
          className="modal__close-button modal__close-button--type-light"
          type="button"
          aria-label="Close"
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
