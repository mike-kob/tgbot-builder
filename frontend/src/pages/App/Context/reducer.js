const reducer = (state, { type, data }) => {
  switch (type) {
    case 'ADD_NODE':
      return state.update('elements', (els) => els.push(data.set('id', String(els.size))))
    case 'UPDATE_NODE':
      return state.setIn(['elements', data.get('id')], data)
    case 'SELECT_NODE':
      return state.set('selected', data)
    case 'UPDATE_CUR_COMMAND':
      return state.set('currentCommand', data)
    case 'UPDATE_CUR_COMMAND_ACTION':
      return state.setIn(['currentCommand', 'actions', data.get('id')], data)
    case 'UPDATE_DRAWER':
      return state.setIn(['drawer', 'open'], data)
    case 'UPDATE_POPUP':
      return state.update('popup', (el) => el.merge(data))
    default:
      return state
  }
}

const logger = reducer => (state, action) => {
  console.log('BEFORE ACTION', action, state.toJS())
  const res = reducer(state, action)
  console.log('AFTER ACTION', action, res.toJS())
  return res
}

export default logger(reducer)
