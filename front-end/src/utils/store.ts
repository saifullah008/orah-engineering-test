import { configureStore } from "@reduxjs/toolkit"
import studentSlice from "./studentSlice"

const store = configureStore({
  reducer: {
    student: studentSlice,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
