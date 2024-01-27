function Card() {
  return (
    <div className="card">
      <div className="favorite">
        <img src="img/heart-unliked.svg" alt="Unliked" />
      </div>
      <img width={133} height={112} src="img/sneakers/1.jpg"></img>
      <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>6 999 грн.</b>
        </div>
        <button className="button d-flex justify-center align-center">
          <img width={32} height={32} src="img/plus.svg" alt="Plus"></img>
        </button>
      </div>
    </div>
  );
}

export default Card;
