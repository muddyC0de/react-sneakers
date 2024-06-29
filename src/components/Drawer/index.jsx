import React from "react";
import Info from "../Info";
import AppContext from "../../context";
import axios from "axios";
import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function Drawer({ onClose, onRemove, items = [], opened, setCartOpened }) {
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { cartItems, setCartItems } = React.useContext(AppContext);

  const totalPrice =
    cartItems && cartItems.length > 0
      ? cartItems.reduce((sum, obj) => obj.price + sum, 0)
      : 0;
  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://65be52d6dcfcce42a6f24125.mockapi.io/orders",
        { items: cartItems }
      );

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      setCartItems([]);
      localStorage.setItem("cart", JSON.stringify([]));
      delay(1000);
    } catch (error) {
      alert("Ошибка при создании заказа :(");
    }
    setIsLoading(false);
  };
  return (
    <div
      onClick={(event) => {
        if (
          event.target.className ===
          "Drawer_overlay__8JsZ- Drawer_overlayVisible__SopQx"
        ) {
          setCartOpened(!opened);
        }
      }}
      className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}
    >
      <div className={`${styles.drawer}`}>
        <h2 className="cartTitle d-flex justify-between mb-30">
          Корзина
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="img/btn-remove.svg"
            alt="Remove"
          />
        </h2>
        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className={styles.items}>
              {items.map((obj, index) => {
                return (
                  <div
                    key={index}
                    className="cartItem d-flex align-center mb-20"
                  >
                    <div
                      style={{ backgroundImage: `url(${obj.imageUrl})` }}
                      className="cartItemImg"
                    ></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{obj.name}</p>
                      <b>{obj.price} грн.</b>
                    </div>
                    <img
                      onClick={() => onRemove(obj.id)}
                      className="removeBtn"
                      src="img/btn-remove.svg"
                      alt="Remove"
                    />
                  </div>
                );
              })}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} грн.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{(totalPrice * 0.05).toFixed(2)} грн.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
            image={
              isOrderComplete ? "img/complete-order.svg" : "img/empty-cart.jpg"
            }
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
            }
            btnText={isOrderComplete ? "Понял!" : "Вернуться назад"}
            isArrow={isOrderComplete ? false : true}
            setIsOrderComplete={setIsOrderComplete}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
