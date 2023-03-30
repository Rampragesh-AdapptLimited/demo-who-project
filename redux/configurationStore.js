import {configureStore} from '@reduxjs/toolkit';
import todoListSlice from './categoriesSlice';

const store = configureStore({
  reducer: {
    todoList: todoListSlice,
  },
});

export default store;
