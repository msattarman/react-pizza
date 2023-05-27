import React from 'react';

import styles from './Search.module.scss';
import { SearchContext } from '../../App';

const Search = () => {
   const { searchValue, setSearchValue } = React.useContext(SearchContext);
   const inputRef = React.useRef();

   const onClickClear = () => {
      setSearchValue('');
      inputRef.current.focus();
   }

   console.log(inputRef);

   return (
      <div className={styles.root}>
         <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
            <path d="M15 15L21 21" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#323232" strokeWidth="2" />
         </svg>
         <input
            ref={inputRef}
            value={searchValue} 
            onChange={e => setSearchValue(e.target.value)}
            className={styles.input}
            placeholder='поиск пиццы...'
         />
         {searchValue &&
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
