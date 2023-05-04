import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategoryId: 0,
  sortState: { name: 'популярности', axiosSortString: 'rating' },
  searchText: '',
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategoryId(state, action) {
      state.activeCategoryId = action.payload;
    },
    setSortState(state, action) {
      state.sortState = action.payload;
    },
    setSearchText(state, action) {
      state.searchText = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },

    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.activeCategoryId = Number(action.payload.activeCategoryId);
      state.sortState = action.payload.sort;
    },
  },
});

export const { setActiveCategoryId, setSortState, setSearchText, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
