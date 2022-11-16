import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  selectContacts,
  selectError,
  selectFilter,
  selectIsLoading,
} from 'redux/selectors';
import { fetchContacts, deleteContact } from 'redux/contactsOperations';
import css from './ContactList.module.css'; 

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const getFilterContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();
    const filterContacts = contacts.filter(({ name, phone }) => {
      const normalizedName = name.toLocaleLowerCase();
      const normalizedNumber = phone.toLocaleLowerCase();
      const result = normalizedName.includes(normalizedFilter) || normalizedNumber.includes(normalizedFilter);
      return result
    });
    return filterContacts;
  };
  const filteredContacts = getFilterContacts();

  const elements = filteredContacts.map(({ name, phone, id }) => {
        return <li key={id} className={css.list}>{name}: {phone}
            <button onClick={() => dispatch(deleteContact(id))} className={css.list_button}>Delete</button>
        </li>
  })
  
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {contacts.length > 0 && <ul>{elements}</ul>}
    </div>
  )  
}
