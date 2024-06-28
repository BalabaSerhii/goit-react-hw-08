import { useDispatch, useSelector } from "react-redux";
import { useEffect, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import Layout from "../Layout/Layout";
import PrivateRoute from "../PrivateRoute.jsx";
import RestrictedRoute from "../RestrictedRoute.jsx";
import { refreshUser } from "../../redux/auth/operations.js";
import { selIsRefreshing } from "../../redux/auth/selectors.js";

const Contacts = lazy(() => import("../../pages/Contacts/Contacts.jsx"));
const Home = lazy(() => import("../../pages/Home/Home.jsx"));
const Login = lazy(() => import("../../pages/Login/Login.jsx"));
const RegistrUser = lazy(() =>
  import("../../pages/RegistrUser/RegistrUser.jsx")
);

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  
  return isRefreshing ? (
    <b>Refreshing user. Wait</b>
  ) : (
    <Layout>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegistrUser />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<Login />} />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<Contacts />} />
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
