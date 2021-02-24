import React, { createContext, useReducer } from 'react'

import { commandFactory } from './models'
import Reducer from './reducer'

const initialState = {
  chart: {
    offset: { x: 0, y: 0 },
    scale: 1,
    nodes: {
    },
    links: {
    },
    selected: {},
    hovered: {},
  },
  nodeInfo: {},
  drawer: {
    open: false,
    nodeId: undefined,
  },
  selected: {},
  currentCommand: commandFactory(),
  popup: {
    open: false,
  },
  greeting: '',
  initState: null,
}

export const Context = createContext(initialState)

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)
  return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
  )
}

export default Store
