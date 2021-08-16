import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CardNormalizedEntity } from '@/domain/entities/schemas/card'

type State = {
  entities: CardNormalizedEntity | null
  result: number[]
}

const initialState: State = {
  entities: null,
  result: [],
}

const { actions, reducer } = createSlice({
  name: 'card',
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
