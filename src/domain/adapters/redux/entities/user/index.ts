import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserNormalizedEntity } from '@/domain/entities/schemas/user'

type State = {
  entities: UserNormalizedEntity | null
  result: number[]
}

const initialState: State = {
  entities: null,
  result: [],
}

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateEntities: (state, action: PayloadAction<State>) => {
      state = action.payload
      console.log(state)
    },
  },
})

export { reducer }
export default actions
