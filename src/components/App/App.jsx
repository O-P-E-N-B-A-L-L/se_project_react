import { useState, useEffect } from "react";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { coordinates, APIkey } from "../../utils/constants.js";
import { defaultClothingItems } from "../../utils/constants.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    city: "",
    temp: { F: 0 },
    condition: "",
    isDay: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingData, setClothingData] = useState([...defaultClothingItems]);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    weatherType: "",
  });

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCardSubmit = (evt) => {
    evt.preventDefault();

    const cardData = {
      _id: Math.max(...clothingData.map((item) => item._id), 0) + 1,
      name: formData.name,
      link: formData.imageUrl,
      weather: formData.weatherType,
    };

    setClothingData([...clothingData, cardData]);

    setFormData({
      name: "",
      imageUrl: "",
      weatherType: "",
    });

    closeActiveModal();
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    function closeOnEscape(evt) {
      if (activeModal && evt.key === "Escape") {
        closeActiveModal();
      }
    }

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeModal]);

  return (
    <div className="page">
      <div className="page_content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main
          handleCardClick={handleCardClick}
          weatherData={weatherData}
          clothingData={clothingData}
        />
        <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
        onSubmit={handleAddCardSubmit}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            name="name"
            placeholder="Name"
            required
            onChange={handleInputChange}
            value={formData.name}
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            name="imageUrl"
            placeholder="Image URL"
            required
            onChange={handleInputChange}
            value={formData.imageUrl}
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              type="radio"
              className="modal__radio-input"
              id="hot"
              value="hot"
              name="weatherType"
              required
              onChange={handleInputChange}
              checked={formData.weatherType === "hot"}
            />{" "}
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              className="modal__radio-input"
              id="warm"
              value="warm"
              name="weatherType"
              required
              onChange={handleInputChange}
              checked={formData.weatherType === "warm"}
            />{" "}
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              className="modal__radio-input"
              id="cold"
              value="cold"
              name="weatherType"
              required
              onChange={handleInputChange}
              checked={formData.weatherType === "cold"}
            />{" "}
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        card={selectedCard}
        activeModal={activeModal}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
