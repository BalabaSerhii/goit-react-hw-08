import { useDispatch, useSelector } from "react-redux";
import { selUser } from "../../redux/auth/selectors.js";
import { logOut } from "../../redux/auth/operations.js";
import css from "./UserMenu.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selUser);

  return (
    <div className={css.container}>
      <p className={css.style}>Welcome, {user.name}!</p>
      <button
        className={css.btn}
        type="button"
        onClick={() => dispatch(logOut())}
      >
        Logout
      </button>
    </div>
  );
}
