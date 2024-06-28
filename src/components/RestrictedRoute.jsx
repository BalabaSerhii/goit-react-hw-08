import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selIsLoggedIn } from "../redux/auth/selectors";

export default function RestrictedRoute({
  component: Component,
  redirectTo = "/",
}) {
  const isLoggedIn = useSelector(selIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
}
