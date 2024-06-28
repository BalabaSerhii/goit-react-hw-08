import AuthNav from "../AuthNav/AuthNav";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import { selIsLoggedIn } from "../../redux/auth/selectors";

import { useSelector } from "react-redux";
import css from "./AppBar.module.css";

export default function AppBar() {
  const isLoggedIn = useSelector(selIsLoggedIn);

  return (
    <header className={css.head}>
      <p className={css.text}>Your Contact Book</p>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
