import { fromJS } from 'immutable';

import { INIT_NODE_ID, VIEW_NAME } from '../constants';
import { commandFactory, messageFactory, scheduleFactory } from './models';

export default fromJS({
  currentView: VIEW_NAME.MAIN,
  drawer: false,
  historyDrawer: false,
  selected: {},
  currentCommand: commandFactory(),
  currentMessage: messageFactory(),
  currentScheduleEntry: scheduleFactory(),
  currentActions: [],
  popup: {
    open: false,
  },
  bot: {
    name: '',
    token: '',
    description: '',
    status: false,
    src: {
      [INIT_NODE_ID]: {
        id: INIT_NODE_ID,
        position: { x: 10, y: 10 },
        data: {
          label: 'Initial state',
          commands: [{ id: '0', name: 'start', actions: [] }],
          initial: [],
          messages: [],
          schedule: [],
        },
      },
    },
  },
  userSearch: '',
  users: [],
  selectedUser: {},
});
