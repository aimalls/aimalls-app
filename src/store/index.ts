import { configureStore } from '@reduxjs/toolkit'


import accountProfileStore from './account-profile'
import addressStore from "./address"

export const store = configureStore({
    reducer: {
        accountProfileStore,
        addressStore
    },
})
  
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch