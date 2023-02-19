import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./studentSlice";

const store = configureStore({
  reducer: {
    student: studentSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

