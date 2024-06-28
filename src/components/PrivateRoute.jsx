import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selIsLoggedIn } from "../redux/auth/selectors";

export default function PrivateRoute({
  component: Component,
  redirectTo = "/",
}) {
  const isLoggedIn = useSelector(selIsLoggedIn);

  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
}
