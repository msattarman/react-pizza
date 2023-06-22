import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
   const [pizza, setPizza] = React.useState<{
      imageUrl: string;
      title: string;
      price: number;
   }>();

   const { id } = useParams();
   const navigate = useNavigate();

   React.useEffect(() => {
      async function fetchPizza() {
         try {
            const { data } = await axios.get('https://64664993ba7110b6639ccaf5.mockapi.io/items/' + id);
            setPizza(data);
         } catch (error) {
            console.log(error);
            alert('Ошибка при получении данных');
            navigate('/');
         }
      }

      fetchPizza();
   }, []);

   if (!pizza) {
      return <>Загрузка...</>;
   }

   return (
      <div className='container'>
         <img src={pizza.imageUrl} />
         <h2>{pizza.title}</h2>
         <h4>{pizza.price} P</h4>
         <Link to='/'>
            <button className="button button--outline button--add">
               <span>Назад</span>
            </button>
         </Link>
      </div>
   )
}

export default FullPizza;