import React from "react";
import { Link } from "react-router-dom";
import AppContext from "../context";

function Header(props) {
  const { cartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="img/logo.png" alt="Logo"></img>
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кросовок</p>
          </div>
        </div>
      </Link>

      <ul className="headerRight d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="img/cart.svg" alt="Cart"></img>
          <span className="totalPrice">{totalPrice} грн.</span>
        </li>
        <li className="mr-30 cu-p">
          <Link to="/favorites">
            <img width={17} height={17} src="img/favorites.svg" alt="" />
            <span>Закладки</span>
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img width={18} height={18} src="img/user.svg" alt="User"></img>
            <span>Профиль</span>
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
