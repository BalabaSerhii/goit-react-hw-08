import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectFiltrCont } from "../../redux/contacts/selectors";
import css from "./ContactList.module.css";

const ContactList = () => {
  const contacts = useSelector(selectFiltrCont);

  if (contacts.length === 0) {
    return <p>No contacts found.</p>;
  }

  return (
    <ul className={css.container}>
      {contacts.map(contact => (
        <li className={css.li} key={contact.id}>
          <Contact contacts={contact} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

