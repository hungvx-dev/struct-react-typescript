import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
  ThunkAction,
  AnyAction,
  createAction,
} from '@reduxjs/toolkit'

import entities from './entities'

type Action1 = { type: string, payload: string}

const testReducers = (initialState = 1, action: Action1) => {
  switch (action.type) {
    case 'increment':
      return initialState + action.payload || 1
    default:
      return initialState
  }
}


const testAReducers = (initialState = 1, action: Action1) => {
  switch (action.type) {
    case 'incrementA':
      return initialState + action.payload || 1
    default:
      return initialState
  }
}

const rootReducer = combineReducers({
  entities,
  test: testReducers,
  test1: testAReducers,
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
