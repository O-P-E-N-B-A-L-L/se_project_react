import { useState, useEffect } from "react";

import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ handleAddClick, weatherData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const toggleMenuVisibility = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    function resetNavMenuState() {
      if (isMenuOpen && window.innerWidth > 750) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("resize", resetNavMenuState);

    return () => {
      window.removeEventListener("resize", resetNavMenuState);
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="WTWR Logo" />
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <button
        className="header__button--nav-menu"
        type="button"
        onClick={toggleMenuVisibility}
        aria-label="Open navigation menu"
      ></button>
      <div
        className={`header__nav-wrapper${isMenuOpen ? " header__nav-wrapper_opened" : ""}`}
      >
        <button
          className="header__button--close"
          type="button"
          onClick={toggleMenuVisibility}
        ></button>
        <button
          className="header__button--add-clothes"
          type="button"
          onClick={() => {
            handleAddClick();
            setIsMenuOpen(false);
          }}
        >
          + Add Clothes
        </button>
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img className="header__avatar" src={avatar} alt="Your Avatar" />
        </div>
      </div>
    </header>
  );
}

export default Header;
