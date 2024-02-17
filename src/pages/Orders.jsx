import React from "react";
import Card from "../components/Card";
import Info from "../components/Info";
import axios from "axios";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [animate] = useAutoAnimate();
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://65be52d6dcfcce42a6f24125.mockapi.io/orders"
        );
        setOrders(data);
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе заказов");
        console.error(error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои заказы</h1>
      </div>

      <div ref={animate} className="d-flex flex-wrap">
        {(orders.length === 0) & !isLoading ? (
          <Info
            title={"У вас нет заказов"}
            description={"Вы нищеброд?\nОформите хотя бы один заказ"}
            image={"img/empty-orders.svg"}
            link={"/"}
            width={60}
          />
        ) : null}
        {(isLoading ? [...Array(1)] : orders).map((obj, index) => {
          return (
            <div className="order-wrapper" key={isLoading ? index : obj.id}>
              <h3 className="order-number d-flex justify-between align-center">
                Заказ #{isLoading ? index + 1 : obj.id}
                <img
                  onClick={async () => {
                    await axios.delete(
                      `https://65be52d6dcfcce42a6f24125.mockapi.io/orders/${obj.id}`
                    );
                    setOrders((prev) =>
                      prev.filter((item) => Number(item.id) !== Number(obj.id))
                    );
                  }}
                  className="cu-p"
                  src="img/btn-remove.svg"
                  alt=""
                />
              </h3>

              <div className="orders d-flex">
                {(isLoading ? [...Array(4)] : obj.items).map((item, index) => (
                  <Card
                    key={index}
                    id={item?.id}
                    name={item?.name}
                    price={item?.price}
                    imageUrl={item?.imageUrl}
                    loading={isLoading}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
