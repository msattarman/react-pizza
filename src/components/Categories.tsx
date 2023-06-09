import React from 'react';

const Categories = ({ value, onChangeCategory }) => {

   const categories = [
      'Все',
      'Мясные',
      'Вегетарианская',
      'Гриль',
      'Острые',
      'Закрытые'
   ]

   return (
      <div className="categories">
         <ul>
            {
               categories.map((CategoryName, i) => (
                  <li
                     key={i}
                     onClick={() => onChangeCategory(i)}
                     className={value === i ? 'active' : ''} >
                     {CategoryName}
                  </li>
               ))
            }
         </ul>
      </div>
   )
}

export default Categories;