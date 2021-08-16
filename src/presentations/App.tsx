import React, { useState, lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { normalize } from 'normalizr'

import { UserEntity, userMap, userMapArray } from '@/domain/entities/models/user'
import { CardEntity, cardMapArray } from '@/domain/entities/models/card'
import { cards, user, users } from '@/data/db'
import { UserNormalizedEntity, users as schemaUsers } from '@/domain/entities/schemas/user'
import store from '@/domain/adapters/redux/store'
import Test from './modules/Test'

function App() {
  const [state, setState] = useState(0)
  const userEntity: UserEntity = userMap(user)
  // console.log(user, userEntity)

  const usersEntity: UserEntity[] = userMapArray(users)
  const cardsEntity: CardEntity[] = cardMapArray(cards)

  console.log(users, usersEntity, userEntity, cardsEntity)
  const test = normalize<{ users: UserNormalizedEntity }>(usersEntity, schemaUsers)
  console.log(test)
  return (
    <Provider store={store}>
      <div>
        <Test />
        Trasi tim cua
      </div>
    </Provider>
  )
}

export default App
