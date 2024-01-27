function Header() {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <img width={40} height={40} src="img/logo.png"></img>
        <div>
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Магазин лучших кросовок</p>
        </div>
      </div>

      <ul className="headerRight d-flex">
        <li className="mr-30">
          <img width={18} height={18} src="img/cart.svg"></img>
          <span>1200 грн.</span>
        </li>
        <li>
          <img width={18} height={18} src="img/user.svg"></img>
        </li>
      </ul>
    </header>
  );
}

export default Header;
