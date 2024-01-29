import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="Navbar">
      <NavLink to="/" activeclassname="active">
        메뉴목록
      </NavLink>
      <NavLink to="/order" activeclassname="active">
        주문내역
      </NavLink>
    </nav>
  );
};

export default Navbar;
