import { useState, useEffect } from "react";
import "../App/App.css";
import contactList from "../contacts.json";
import ContactForm from "../ContactForm/ContactForm.jsx";
import SearchBox from "../SearchBox/SearchBox.jsx";
import ContactList from "../ContactList/ContactList.jsx";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = window.localStorage.getItem("saved-contacts");
    if (savedContacts !== null) {
      return JSON.parse(savedContacts);
    }
    return contactList;
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("saved-contacts", JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = (contactId) => {
    setContacts((prevContacts) => {
      return prevContacts.filter((contact) => contact.id !== contactId);
    });
  };

  const addContact = (newValues) => {
    setContacts((prevContacts) => {
      return [...prevContacts, newValues];
    });
  };

  const searchContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <SearchBox value={filter} onValue={setFilter} />
      <ContactList contactList={searchContacts} deleteContact={deleteContact} />
    </div>
  );
}
