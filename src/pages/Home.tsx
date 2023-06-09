import React from 'react';
import qs from 'qs';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';


const Home: React.FC = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const isSearch = React.useRef(false);
   const isMounted = React.useRef(false);

   const { items, status } = useSelector(selectPizzaData);
   const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

   const onChangeCategory = (id: number) => {
      dispatch(setCategoryId(id));
   }

   const onChangePage = (page: number) => {
      dispatch(setCurrentPage(page));
   }

   const getPizzas = async () => {
      const sortBy = sort.sortProperty.replace('-', '');
      const order = sort.sortProperty.includes('-') ? 'ask' : 'desc';
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      dispatch(
         // @ts-ignore
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

         const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty)

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

   const pizzas = items.map((obj: any) => <Link key={obj.id} to={`/pizza/${obj.id}`}><PizzaBlock {...obj} /></Link>)

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
