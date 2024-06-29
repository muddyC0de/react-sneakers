import React from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";
function Card({
  id,
  name,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  loading = false,
}) {
  const { isItemAdded, isItemFavorite } = React.useContext(AppContext);
  const obj = { id, name, imageUrl, price };
  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavotire = () => {
    onFavorite(obj);
  };
  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={210}
          viewBox="0 0 160 210"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="100" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="124" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="174" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="170" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavotire}>
              <img
                src={isItemFavorite(id) ? "img/liked.svg" : "img/unliked.svg"}
                alt="Unliked"
              />
            </div>
          )}

          <img width={133} height={112} src={imageUrl} alt="Add to cart"></img>
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} грн.</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                width={32}
                height={32}
                src={
                  isItemAdded(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"
                }
                alt="Plus"
              ></img>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
