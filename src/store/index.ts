import { configureStore } from '@reduxjs/toolkit'


import accountProfileStore from './account-profile'
import addressStore from "./address"
import shopProfileStore from './shop-profile'

export const store = configureStore({
    reducer: {
        accountProfileStore,
        shopProfileStore,
        addressStore
    },
})
  
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch