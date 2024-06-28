import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
axios.defaults.baseURL = "https://connections-api.herokuapp.com/";

export const deleteContact = createAsyncThunk(
  "contacts/dellContact",
  async (contactId, thunkAPI) => {
    try {
      const resp = await axios.delete(`/contacts/${contactId}`);
      toast.success("You have successfully deleted your contact! Good job!");
      return resp.data;
    } catch (error) {
      toast.success("Sorry, the contact could not be deleted!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get("/contacts");
      return resp.data;
    } catch (error) {
      return (
        thunkAPI.rejectWithValue(error.message) &&
        toast.error("Don't worry! Try reloading the page!")
      );
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addCont",
  async ({ name, number }, thunkAPI) => {
    try {
      const resp = await axios.post("/contacts", { name, number });
      toast.success("New contact added!");

      return resp.data;
    } catch (error) {
      return (
        thunkAPI.rejectWithValue(error.message) &&
        toast.error("Failed to add contact!")
      );
    }
  }
);

export const patchContact = createAsyncThunk(
  "contacts/patchContact",
  async ({ id, name, number }, thunkAPI) => {
    try {
      const response = await axios.patch(`/contacts/${id}`, { name, number });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
