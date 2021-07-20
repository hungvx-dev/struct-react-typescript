import React, { useState } from 'react'
// import { hot } from 'react-hot-loader'
// import Auth from './modules/auth'

// const test = () => 0

interface Profile {
  age: number
  gender: string
}

class User {
  profile: Profile

  fullName: string
}

function App() {
  const [state, setState] = useState(0)

  const a = new User()
  // console.log(test, a)

  return (
    <div>
      <span>hung</span>
      {/* <Auth /> */}
    </div>
  )
}

// export default hot(module)(App)
export default App
