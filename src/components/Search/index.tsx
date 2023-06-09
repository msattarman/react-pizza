import React from 'react';
import { setSearchValue } from '../../redux/slices/filterSlice'
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';

const Search: React.FC = () => {
   const dispatch = useDispatch()
   const [value, setValue] = React.useState('')
   const inputRef = React.useRef<HTMLInputElement>(null);

   const onClickClear = () => {
      dispatch(setSearchValue(''));
      setValue('');
      inputRef.current?.focus();
   }

   const updateSearchValue = React.useCallback(
      debounce((str: string) => {
         dispatch(setSearchValue(str));
      }, 1000),
      [],
   )

   const onChangeInput = (event: any) => {
      setValue(event.target.value);
      updateSearchValue(event.target.value);
   }

   return (
      <div className={styles.root}>
         <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
            <path d="M15 15L21 21" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#323232" strokeWidth="2" />
         </svg>
         <input
            ref={inputRef}
            value={value}
            onChange={onChangeInput}
            className={styles.input}
            placeholder='поиск пиццы...'
         />
         {value &&
            <svg
               onClick={onClickClear}
               className={styles.close} viewBox="0 0 24 24" fill="none">
               <path d="M9.16998 14.83L14.83 9.17004" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
               <path d="M14.83 14.83L9.16998 9.17004" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
               <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>}
      </div>
   )
}

export default Search;
