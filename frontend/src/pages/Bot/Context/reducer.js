const reducer = (state, { type, data }) => {
  switch (type) {
    case 'SET_VIEW':
      return state.set('currentView', data);
    case 'SET_BOT':
      return state.set('bot', data);
    case 'ADD_NODE':
      return state.setIn(['bot', 'src', data.get('id')], data);
    case 'UPDATE_NODE':
      return state.setIn(['bot', 'src', data.get('id')], data);
    case 'DELETE_NODE':
      return state.deleteIn(['bot', 'src', data]);
    case 'SELECT_NODE':
      return state.set('selected', data);
    case 'UPDATE_CUR_COMMAND':
      return state.set('currentCommand', data);
    case 'UPDATE_CUR_COMMAND_ACTION':
      return state.setIn(['currentCommand', 'actions', data.get('id')], data);
    case 'UPDATE_CUR_ACTIONS':
      return state.set('currentActions', data);
    case 'UPDATE_CUR_MESSAGE':
      return state.set('currentMessage', data);
    case 'UPDATE_CUR_SCHEDULE_ENTRY':
      return state.set('currentScheduleEntry', data);
    case 'UPDATE_DRAWER':
      return state.set('drawer', data);
    case 'UPDATE_HISTORY_DRAWER':
      return state.set('historyDrawer', data);
    case 'UPDATE_POPUP':
      return state.update('popup', (el) => el.merge(data));
    case 'SET_SELECTED_USER':
      return state.set('selectedUser', data);
    case 'SET_USERS':
      return state.set('users', data);
    default:
      return state;
  }
};

const logger = (reducer) => (state, action) => {
  console.log('BEFORE ACTION', action, state.toJS());
  const res = reducer(state, action);
  console.log('AFTER ACTION', action, res.toJS());
  return res;
};

export default logger(reducer);
