import axios from 'axios';
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../store';
import { CartItem } from './cartSlice';

// type FetchPizzasArgs = Record<string, string>

type Pizza = {
   id: string;
   title: string;
   price: number;
   imageUrl: string;
   sizes: number[];
   types: number[];
   rating: number;
};

export enum Status {
   LOADING = 'loading',
   SUCCESS = 'success',
   ERROR = 'error',
}

interface PizzaSliceState {
   items: Pizza[];
   status: Status;
}

const initialState: PizzaSliceState = {
   items: [],
   status: Status.LOADING, // loading | success | error
};

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
   'pizza/fetchPizzasStatus',
   async (params) => {
      const { sortBy, order, category, search, currentPage } = params;

      const { data } = await axios.get<Pizza[]>(`https://64664993ba7110b6639ccaf5.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);

      return data;
   });

const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {
      setItems(state, action: PayloadAction<Pizza[]>) {
         state.items = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchPizzas.pending, (state, action) => {
         state.status = Status.LOADING;
         state.items = [];
      });

      builder.addCase(fetchPizzas.fulfilled, (state, action) => {
         state.items = action.payload;
         state.status = Status.SUCCESS;
      });

      builder.addCase(fetchPizzas.rejected, (state, action) => {
         state.status = Status.ERROR;
         state.items = [];
      });
   }

   // Вариант без typescript и без типизации асинхронных action
   
   // extraReducers: {
   //    [fetchPizzas.pending]: (state) => {
   //       state.status = 'loading';
   //       state.items = [];
   //    },
   //    [fetchPizzas.fulfilled]: (state, action) => {
   //       state.items = action.payload;
   //       state.status = 'success'
   //    },
   //    [fetchPizzas.rejected]: (state, action) => {
   //       state.status = 'error';
   //       state.items = [];
   //    },
   // },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;