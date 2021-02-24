import React, { createContext, useReducer } from 'react'

const initialState = {}

const Reducer = (state, action) => ({
  ...state,
  ...action,
})

export const UserContext = createContext(initialState)

export const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)
  return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
  )
}
