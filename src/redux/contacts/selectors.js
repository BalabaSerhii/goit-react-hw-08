import { selectNameFilter } from "../filter/selectors";
import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectError = (state) => state.contacts.error;

export const selectFiltrCont = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    if (!contacts) {
      return [];
    }
    return contacts.filter(
      (contact) =>
        (typeof contact.name === "string" &&
          contact.name.toLowerCase().includes(filter.toLowerCase())) ||
        (typeof contact.number === "string" && contact.number.includes(filter))
    );
  }
);
