import { fromJS } from 'immutable'

import { INIT_NODE_ID, VIEW_NAME } from '../constans'
import { commandFactory } from './models'

export default fromJS({
  currentView: VIEW_NAME.MAIN,
  drawer: {
    open: false,
    nodeId: undefined,
  },
  selected: {},
  currentCommand: commandFactory(),
  popup: {
    open: false,
  },
  bot: {
    name: '',
    token: '',
    status: false,
    initState: {
      id: INIT_NODE_ID,
      data: { label: 'Initial state', commands: [{ id: '0', name: '/start', actions: [] }] },
    },
    src: [],
  },
  userSearch: '',
  users: [],
  selectedUser: {},
})
