import { IoPersonSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations.js";
import { useState } from "react";
import { ToDelete, ToEdit } from "../AddDeletet/AddAndDelet";

import css from "./Contact.module.css";

import { IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from '@mui/icons-material/SettingsApplications';

const Contact = ({ contacts: { id, name, number } }) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const handleConfirmDelete = () => {
    if (contactToDelete) {
      dispatch(deleteContact(contactToDelete.id));
      closeModal();
    }
  };

  const openModal = (data) => {
    setModalIsOpen(true);
    setContactToDelete(data);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setContactToDelete(null);
  };

  const openModalEdit = () => {
    setModalEditOpen(true);
  };

  const closeModalEdit = () => {
    setModalEditOpen(false);
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <p>
          <IoPersonSharp className={css.icon} />
          {name}
        </p>
        <p>
          <FaPhone className={css.icon} />
          {number}
        </p>
      </div>
      <IconButton edge="end" aria-label="edit" onClick={openModalEdit}>
        <AddIcon
          sx={{
            width: 35,
            color: "black",
          }}
        />
      </IconButton>
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => openModal({ id, name, number })}
      >
        <RemoveIcon
          sx={{
            width: 35,
            color: "black",
          }}
        />
      </IconButton>
      {modalIsOpen && (
        <ToDelete
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          onConfirm={handleConfirmDelete}
          contactName={name}
        />
      )}
      {modalEditOpen && (
        <ToEdit
          isOpen={modalEditOpen}
          onRequestClose={closeModalEdit}
          initialValues={{ id, name, number }}
        />
      )}
    </div>
  );
};

export default Contact;