import { configureStore, createSlice } from "@reduxjs/toolkit";

const todoState = { todos: [], completedTodo: [], deteleName: "" };

const todoSlice = createSlice({
  name: "todo",
  initialState: todoState,
  reducers: {
    addCompletedTodo(state, action) {
      state.completedTodo.push(action.payload);
    },
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    updateTodo(state, action) {
      const index = action.payload;
      state.todos.splice(index, 1);
    },
    setTodo(state, action) {
      state.todos = action.payload;
    },
    setCompletedTodo(state, action) {
      state.completedTodo = action.payload;
    },
  },
});

const Store = configureStore({
  reducer: { todo: todoSlice.reducer },
});

export const todoActions = todoSlice.actions;

export default Store;
