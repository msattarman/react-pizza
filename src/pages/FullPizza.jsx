import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FullPizza = () => {
   const [pizza, setPizza] = React.useState();
   const { id } = useParams();

   React.useEffect(() => {
      async function fetchPizza() {
         try {
            const { data } = await axios.get('https://64664993ba7110b6639ccaf5.mockapi.io/items/' + id);
            setPizza(data);
         } catch (error) {
            console.log(error);
            alert('Ошибка при получении данных');

         }
      }

      fetchPizza();
   }, []);

   if (!pizza) {
      return 'Loading...';
   }

   return (
      <div className='container'>
         <img src={pizza.imageUrl} />
         <h2>{pizza.title}</h2>
         <h4>{pizza.price} P</h4>
      </div>
   )
}

export default FullPizza;