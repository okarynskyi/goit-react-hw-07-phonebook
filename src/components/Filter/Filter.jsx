import { nanoid } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from 'redux/selectors';
import { visibleContacts } from 'redux/filterSlice';
import css from './Filter.module.css';

export const Filter = () => {
    const filterId = nanoid();
    const dispatch = useDispatch();
    const filter = useSelector(getFilter);

    const handleChange = e => {
        dispatch(visibleContacts(e.target.value));
    };

    return (
        <label htmlFor={filterId} className={css.input}>Find contacts by name
            <input type="text" id = {filterId} name="filter" value={filter} onChange={handleChange} className={css.input_text}/>
        </label>
    )
}
