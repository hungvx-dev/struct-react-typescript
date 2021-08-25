import React from 'react'
import { Provider } from 'react-redux'
import { RMWCProvider } from '@rmwc/provider'
import 'rmwc/dist/styles'

import store from '@/domain/adapters/redux/store'
import { rmwcConfig } from 'Constants/app'

function App() {
  return (
    <RMWCProvider {...rmwcConfig}>
      <Provider store={store}>
        <div>hung</div>
      </Provider>
    </RMWCProvider>
  )
}

export default App
