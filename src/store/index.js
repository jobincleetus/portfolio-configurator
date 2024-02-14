import { configureStore } from '@reduxjs/toolkit'
import libraryReducer from './library'

export const store = configureStore({
  reducer: {
    library: libraryReducer
  },
})