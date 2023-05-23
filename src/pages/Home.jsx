import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
   const [items, setItems] = React.useState([]);
   const [isLoading, setIsLoading] = React.useState(true);
   const [categoryId, setCategoryId] = React.useState(0);
   const [currentPage, setCurrentPage] = React.useState(1);
   const [sortType, setSortType] = React.useState({
      name: 'популярности',
      sortProperty: 'rating'
   });

   const sortBy = sortType.sortProperty.replace('-', '');
   const order = sortType.sortProperty.includes('-') ? 'ask' : 'desc';
   const category = categoryId > 0 ? `category=${categoryId}` : '';
   const search = searchValue ? `&search=${searchValue}` : '';

   React.useEffect(() => {
      setIsLoading(true);
      fetch(
         `https://64664993ba7110b6639ccaf5.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
         .then((res) => res.json())
         .then((arr) => {
            setItems(arr);
            setIsLoading(false);
         });
      window.scrollTo(0, 0);
   }, [categoryId, sortType, searchValue, currentPage]);

   const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

   const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

   return (
      <div className="container">
         <div className="content__top">
            <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
            <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">
            {isLoading
               ? skeleton
               : pizzas
            }
         </div>
         <Pagination onChangePage={(number) => setCurrentPage(number)} />
      </div>
   )
}

export default Home;
