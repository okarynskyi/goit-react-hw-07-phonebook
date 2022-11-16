import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { removeContact } from 'redux/contactsSlice';
import css from './ContactList.module.css';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const getFilterContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();
    const filterContacts = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLowerCase();
      const normalizedNumber = number.toLowerCase();
      const result = normalizedName.includes(normalizedFilter) || normalizedNumber.includes(normalizedFilter);
      return result
    });
    return filterContacts;
  };
  const filteredContacts = getFilterContacts();

  const elements = filteredContacts.map(({ name, number, id }) => {
        return <li key={id} className={css.list}>{name}: {number}
            <button onClick={() => dispatch(removeContact(id))} className={css.list_button}>Delete</button>
        </li>
    })
    return (
        <ul>{elements}</ul>
    )
}
