import React, { useState } from 'react';
import { useAddContactMutation, useGetContactsQuery } from 'redux/contactsApi';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export default function ContactForm() {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const { data: contactsArray } = useGetContactsQuery();
  const [addCont, { isLoading: isUpdating, isSuccess, error }] =
    useAddContactMutation();

  useEffect(() => {
    isSuccess && toast.success('Контакт успешно добавлен') && clearForm();

    !isSuccess &&
      error &&
      toast.error(' что-то пошло не так, попробуй еще разок');
  }, [error, isSuccess]);

  function addContact(contact) {
    if (
      contactsArray.find(
        cont => cont.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      toast.error(contact.name + ' is already in contact');
      return;
    }

    addCont(contact);
  }

  const handleChange = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      default:
        console.log(e.target.name);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    addContact({
      name,
      phone,
    });
  };

  const clearForm = () => {
    setName('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Name</p>
      <input
        onChange={handleChange}
        value={name}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <p>Number</p>
      <input
        onChange={handleChange}
        value={phone}
        type="tel"
        name="phone"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <button type="submit" disabled={isUpdating}>
        Add contact
      </button>
    </form>
  );
}
