import React from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { fetchPizzas } from '../redux/slices/pizzaSlice';


const Home = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const isSearch = React.useRef(false);
   const isMounted = React.useRef(false);

   const { items, status } = useSelector((state) => state.pizza);
   const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

   const { searchValue } = React.useContext(SearchContext);

   const onChangeCategory = (id) => {
      dispatch(setCategoryId(id));
   }

   const onChangePage = (number) => {
      dispatch(setCurrentPage(number));
   }

   const getPizzas = async () => {
      const sortBy = sort.sortProperty.replace('-', '');
      const order = sort.sortProperty.includes('-') ? 'ask' : 'desc';
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      dispatch(
         fetchPizzas({
            sortBy,
            order,
            category,
            search,
            currentPage,
         }),
      );
   };

   // Если изменили параметры и был первый рендер
   React.useEffect(() => {
      if (isMounted.current) {
         const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage,
         });

         navigate(`?${queryString}`);
      }
      isMounted.current = true;

   }, [categoryId, sort.sortProperty, currentPage]);

   // Если был первый рендер, то проверяем URL параметры и сохраняем в redux.
   React.useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1));

         const sort = list.find((obj) => obj.sortProperty === params.sortProperty)

         dispatch(
            setFilters({
               ...params,
               sort,
            }),
         );
         isSearch.current = true;
      }
   }, [])

   // Если был первый рендер, то запрашиваем пиццы
   React.useEffect(() => {
      window.scrollTo(0, 0);

      if (!isSearch.current) {
         getPizzas();
      }

      isSearch.current = false;

   }, [categoryId, sort.sortProperty, searchValue, currentPage]);

   const skeleton = [...new Array(4)].map((_, index) => <Skeleton key={index} />)

   const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

   return (
      <div className="container">
         <div className="content__top">
            <Categories value={categoryId} onChangeCategory={onChangeCategory} />
            <Sort />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         {status === 'error' ? (
            <div className='content__error-info'>
               <h2>Произошла Ошибка 😕</h2>
               <p>Не удалось получить товары. Повторите попытку позже.</p>
            </div>
         ) : (
            <div className="content__items">
               {status === 'loading'
                  ? skeleton
                  : pizzas
               }
            </div>)}
         <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
   )
}

export default Home;
