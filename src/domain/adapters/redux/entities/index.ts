import { combineReducers } from '@reduxjs/toolkit'

import { reducer as user } from './user'
import { reducer as card } from './card'

export default combineReducers({ user, card })
