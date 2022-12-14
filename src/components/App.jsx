import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const baseContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];


export default function App() {
  
  const localContacts = localStorage.getItem('keyContacts');
  const parsLocalContacts = JSON.parse(localContacts);

  const [contacts, setContacts] = useState(() =>
    parsLocalContacts?.length > 0 ? parsLocalContacts : baseContacts
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('keyContacts', JSON.stringify(contacts));
  }, [contacts]);

  const submitFormValue = newContactObject => {
    if (checkName(newContactObject.name)) {
      alert(`${newContactObject.name} is already in contacts.`);
      return;
    }
    setContacts(prevContact => [...prevContact, newContactObject]);
  };

  const checkName = name => {
    return contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const filterContacts = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const deleteCurrentItem = id => {
    setContacts(
      contacts.filter(contact => {
        return contact.id !== id;
      })
    );
  };

  const onChangeFilter = event => {
    setFilter(event.target.value);
  };

  return (
    <div style={{ marginLeft: '40px' }}>
      <h1>Phonebook</h1>
      <ContactForm submitForm={submitFormValue} />

      <h2>Contacts</h2>
      <Filter onChangeFilter={onChangeFilter} />
      <ContactList
        contacts={filterContacts()}
        deleteBtn={deleteCurrentItem}
      />
    </div>
  );
}
