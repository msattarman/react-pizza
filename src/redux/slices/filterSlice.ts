import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Sort = {
   name: string;
   sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price';
}

interface filterSliceState {
   searchValue: string;
   categoryId: number;
   currentPage: number;
   sort: Sort;
}

const initialState: filterSliceState = {
   searchValue: '',
   categoryId: 0,
   currentPage: 1,
   sort: {
      name: 'популярности',
      sortProperty: 'rating'
   },
};

const filterSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      setCategoryId(state, action: PayloadAction<number>) {
         state.categoryId = action.payload;
      },

      setSearchValue(state, action: PayloadAction<string>) {
         state.searchValue = action.payload;
      },

      setSort(state, action: PayloadAction<Sort>) {
         state.sort = action.payload;
      },

      setCurrentPage(state, action: PayloadAction<number>) {
         state.currentPage = action.payload;
      },

      // setFilters(state, action) {
      //    state.categoryId = Number(action.payload.categoryId);
      //    state.currentPage = Number(action.payload.currentPage);
      //    state.sort = action.payload.sort;
      // }
      setFilters(state, action: PayloadAction<filterSliceState>) {
         if (Object.keys(action.payload).length) {
            state.categoryId = Number(action.payload.categoryId);
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
         } else {
            state.currentPage = 1;
            state.categoryId = 0;
            state.sort = {
               name: 'популярности',
               sortProperty: 'rating',
            };
         }
      },
   },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;