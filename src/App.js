import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const favotire = JSON.parse(localStorage.getItem("favorites")) || [];
        const itemsResponse = await axios.get(
          "https://65b918dab71048505a8a2da9.mockapi.io/items"
        );

        setIsLoading(false);

        setCartItems(cart);
        setFavorites(favotire);
        setItems(itemsResponse.data);
      } catch (error) {
        console.log(error);
        alert("Ошибка при запросе данных ;(");
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.id) === Number(obj.id)
      );
      if (findItem) {
        const filtredCartItems = cartItems.filter(
          (item) => Number(item.id) !== Number(obj.id)
        );
        setCartItems(filtredCartItems);
        localStorage.setItem("cart", JSON.stringify(filtredCartItems));
      } else {
        const newCartItems = [...cartItems, obj];
        setCartItems(newCartItems);
        localStorage.setItem("cart", JSON.stringify(newCartItems));
      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину");
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      const filtredCartItems = cartItems.filter(
        (item) => Number(item.id) !== Number(id)
      );
      setCartItems(filtredCartItems);
      localStorage.setItem("cart", JSON.stringify(filtredCartItems));
    } catch (error) {
      alert("Ошибка при удалении из корзины");
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      const findItem = favorites.find(
        (favObj) => Number(favObj.id) === Number(obj.id)
      );
      if (findItem) {
        const filtredFavorites = favorites.filter(
          (item) => Number(item.id) !== Number(obj.id)
        );
        setFavorites(filtredFavorites);
        localStorage.setItem("favorites", JSON.stringify(filtredFavorites));
      } else {
        const newFavorites = [...favorites, obj];
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        setFavorites(newFavorites);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemFavorite = (id) => {
    return favorites.some((obj) => Number(obj.id) === Number(id));
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };
  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        isItemFavorite,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          setCartOpened={setCartOpened}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path=""
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={!items.length}
              />
            }
            exact
          />

          <Route path="/favorites" element={<Favorites />} exact />
          <Route path="/orders" element={<Orders />} exact />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
