import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = "https://connections-api.herokuapp.com/";

const setAuth = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuth = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuth(persistedToken);
      const response = await axios.get("/users/current");
      return response.data;
    } catch (error) {
      toast.error("Don't worry! Try reloading the page!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuth();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", {
        name,
        email,
        password,
      });
      setAuth(response.data.token);
      return response.data;
    } catch (error) {
      toast.error("Don't worry! Try reloading the page!");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post("/users/login", { email, password });
      setAuth(response.data.token);
      return response.data;
    } catch (error) {
      toast.error("Don't worry! Try reloading the page!");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
