import React from "react";
import AppContext from "../context";
import { Link } from "react-router-dom";

const Info = ({
  title,
  image,
  description,
  link,
  btnText = "Вернуться",
  isArrow = true,
  setIsOrderComplete,
  width = 120,
}) => {
  const { setCartOpened } = React.useContext(AppContext);
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width={width} src={image} alt="Empty cart" />
      <h2>{title}</h2>
      <p style={{ whiteSpace: "pre-wrap" }} className="opacity-6 description">
        {description}
      </p>
      <Link to={link}>
        <button
          onClick={() => {
            if (btnText !== "Понял!") {
              setCartOpened(false);
            } else {
              setIsOrderComplete(false);
            }
          }}
          className="greenButton"
        >
          {isArrow ? <img src="img/arrow.svg" alt="Arrow" /> : ""}
          {btnText}
        </button>
      </Link>
    </div>
  );
};

export default Info;
