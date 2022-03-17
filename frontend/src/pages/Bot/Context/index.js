import React, { createContext, useReducer } from 'react'

import Reducer from './reducer'
import initState from './initState'

export const DiagramContext = createContext(initState)

export const DiagramProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initState)

  return (
    <DiagramContext.Provider value={[state, dispatch]}>
      {children}
    </DiagramContext.Provider>
  )
}

export {
  nodeFactory,
  linkFactory,
  commandFactory,
  actionFactory,
} from './models'
