import React from "react";
import Card from "../components/Card";
import AppContext from "../context";
import Info from "../components/Info";
import { useAutoAnimate } from "@formkit/auto-animate/react";
function Favorites() {
  const { favorites, onAddToFavorite } = React.useContext(AppContext);
  const [animate] = useAutoAnimate();
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
      </div>

      <div ref={animate} className="d-flex flex-wrap">
        {favorites.length > 0 ? (
          favorites.map((item, index) => (
            <Card
              key={index}
              id={item.id}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              favorited={true}
              onFavorite={onAddToFavorite}
            />
          ))
        ) : (
          <Info
            title={"Закладок нет :("}
            image={"img/empty-favorites.svg"}
            description={"Вы ничего не добавляли в закладки"}
            link={"/"}
            width={60}
          />
        )}
      </div>
    </div>
  );
}

export default Favorites;
