import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from './slices/instanceApiGreen'
import { setupListeners } from '@reduxjs/toolkit/query'


export const store = configureStore({
  reducer: {
    user:userReducer,    
  },
})
setupListeners(store.dispatch)

