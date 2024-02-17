import Card from "../components/Card";
import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function Home({
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  items,
  cartItems,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        id={item?.id}
        name={item?.name}
        price={item?.price}
        imageUrl={item?.imageUrl}
        cartItems={cartItems}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
      />
    ));
  };
  const [animate] = useAutoAnimate();
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex">
          <img src="img/search.svg" alt="Search" />
          {searchValue && (
            <img
              className="removeBtn cu-p clear"
              onClick={() => setSearchValue("")}
              src="img/btn-remove.svg"
              alt="Clear"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            type="text"
            placeholder="Поиск..."
          />
        </div>
      </div>

      <div ref={animate} className="d-flex flex-wrap">
        {renderItems()}
      </div>
    </div>
  );
}

export default Home;
