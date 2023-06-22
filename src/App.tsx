import React, { Suspense } from 'react';
import { Route, Routes } from "react-router-dom";

import Header from './components/Header';

import Home from './pages/Home';
// import Cart from './pages/Cart';
// import FullPizza from './pages/FullPizza';
// import NotFound from './components/NotFoundBlock';


import './scss/app.scss';
import MainLayout from "./layouts/MainLayout";

const Cart = React.lazy(() => import(/* webpackChunkName: 'Cart' */ './pages/Cart'))
const FullPizza = React.lazy(() => import(/* webpackChunkName: 'FullPizza' */ './pages/FullPizza'))
const NotFound = React.lazy(() => import(/* webpackChunkName: 'NotFound' */ './pages/NotFound'))

function App() {
   return (
      // <div className="wrapper">
      //    <Header />
      //    <div className="content">
      <Routes >
         <Route path='/' element={<MainLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/cart'
               element={<Suspense fallback={<div>Загрузка корзины...</div>}>
                  <Cart />
               </Suspense>}
            />
            <Route path='/pizza/:id'
               element={<Suspense fallback={<div>Загрузка описания...</div>}>
                  <FullPizza />
               </Suspense>} />
            <Route path='*'
               element={<Suspense fallback={<div>Загрузка страницы...</div>}>
                  <NotFound />
               </Suspense>} />
         </Route>
      </Routes>
      //    </div>
      // </div>
   );
}

export default App;
