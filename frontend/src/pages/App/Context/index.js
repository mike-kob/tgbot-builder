import React, { createContext, useReducer } from 'react'
import { fromJS } from 'immutable'

import Reducer from './reducer'
import { commandFactory } from './models'

const initialState = fromJS({
  elements: [
    {
      id: '0',
      data: { label: '-', commands: [] },
      position: { x: 100, y: 100 },
    },
    {
      id: '1',
      data: { label: 'Node 2', commands: [] },
      position: { x: 100, y: 200 },
    },
    {
      id: '2',
      source: '0',
      target: '1',
    },
  ],
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
})

export const DiagramContext = createContext(initialState)

export const DiagramProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

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
