import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsOperations';
import css from './ContactForm.module.css';

export const ContactForm = () => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleChange = (e) => {
    const { name } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(e.currentTarget.value);
        break;
      case 'number':
        setNumber(e.currentTarget.value);
        break;
      default:
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isDuplicate = contacts.find(
      contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );
    if (isDuplicate) {
      alert(`${name} is already in contacts.`);
      return;
    }
    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
  }

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.input}>
        <label className={css.input_label}>Name</label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={handleChange}
          required
          className={css.input_text}
        />
      </div>
      <div className={css.input}>
        <label className={css.input_label}>Number</label>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={handleChange}
          required
          className={css.input_text}
        />
      </div>
      <button type="submit" className={css.input_button}>Add contact</button>
    </form>
  )
};
