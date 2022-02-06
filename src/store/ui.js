import { createSlice } from "@reduxjs/toolkit";

export const DEFAULT_SELECTED = {
  _id: 0,
  name: "All Genres",
};

const slice = createSlice({
  name: "ui",
  initialState: {
    currentPage: 1,
    selectedGenre: DEFAULT_SELECTED,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  },
  reducers: {
    genreSelected: (ui, action) => {
      ui.selectedGenre = action.payload.data;
    },
    pageSelected: (ui, action) => {
      ui.currentPage = action.payload.data;
    },
    columnSortedBy: (ui, action) => {
      ui.sortColumn.path = action.payload.data.path;
      ui.sortColumn.order = action.payload.data.order;
    },
    tableFilteredBy: (ui, action) => {
      ui.searchQuery = action.payload.data;
    },
  },
});

export const { genreSelected, pageSelected, columnSortedBy, tableFilteredBy } =
  slice.actions;
export default slice.reducer;
