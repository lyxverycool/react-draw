import React, { useState } from 'react'

export const UserContext = React.createContext()

function UserProvider({ children }) {
  const [user, setUser] = useState({ name: 'cool', age: '19' })
  const resetUser = userNow => setUser(prevUsers => ({ ...prevUsers, ...userNow }))
  return (
    <UserContext.Provider value={{ user, resetUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
