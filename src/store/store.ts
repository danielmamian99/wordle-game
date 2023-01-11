import { configureStore } from '@reduxjs/toolkit'
import { sessionSlice } from './slices/session'
import { gameSlice } from './slices/game'
import { uiSlice } from './slices/ui'

export const store = configureStore({
  reducer: {
    session: sessionSlice.reducer,
    game: gameSlice.reducer,
    ui: uiSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch