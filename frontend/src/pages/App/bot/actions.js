import _ from 'lodash'
import { commandFactory } from './models'

export const openDrawerAction = (_, dispatch) => () => {
  dispatch({ type: 'SET_DRAWER', data: { open: true } })
}

export const closeDrawerAction = (_, dispatch) => () => {
  dispatch({ type: 'SET_DRAWER', data: { open: false } })
}

export const addNodeAction = (_, dispatch) => (node, nodeInfo) => {
  dispatch({
    type: 'ADD_NODE',
    data: { id: node.id, node: node, nodeInfo: nodeInfo },
  })
}

export const deleteCommandAction = (state, dispatch) => (nodeId, commandId) => {
  const node = state.nodeInfo[nodeId]
  const newCommands = { ...node.commands }
  delete newCommands[commandId]

  dispatch({
    type: 'SET_NODE',
    data: {
      [nodeId]: {
        ...node,
        commands: newCommands,
      },
    },
  })
}

export const resetCurCommandAction = (_, dispatch) => () => {
  dispatch({ type: 'SET_CURRENT_COMMAND', data: commandFactory() })
}

export const updateCurCommandAction = (_, dispatch) => (cmd) => {
  dispatch({ type: 'SET_CURRENT_COMMAND', data: cmd })
}

export const swapCurCommandActionsAction = (state, dispatch) => (i1, i2) => {
  const actions = state.currentCommand.actions.slice()
  actions[i1] = state.currentCommand.actions[i2]
  actions[i2] = state.currentCommand.actions[i1]

  dispatch({
    type: 'SET_CURRENT_COMMAND',
    data: {
      ...state.currentCommand,
      actions: actions,
    },
  })
}

export const removeCurCommandActionAction = (state, dispatch) => (index) => {
  const actions = state.currentCommand.actions

  dispatch({
    type: 'SET_CURRENT_COMMAND',
    data: {
      ...state.currentCommand,
      actions: actions.filter((_, i) => i !== index),
    },
  })
}

export const setPopupActionsAction = (state, dispatch) => (question, onReject, onApprove) => {
  dispatch({ type: 'SET_POPUP', data: { question, onReject, onApprove } })
}

export const openPopupAction = (state, dispatch) => () => {
  dispatch({ type: 'SET_POPUP', data: { open: true } })
}

export const closePopupAction = (state, dispatch) => () => {
  dispatch({ type: 'SET_POPUP', data: { open: false } })
}

export const changeNodeInfoAction = (state, dispatch) => (nodeId, data) => {
  dispatch({
    type: 'SET_NODE',
    data: {
      [nodeId]: {
        ...state.nodeInfo[nodeId],
        ...data,
      },
    },
  })
}

export const connectNodesAction = (state, dispatch) => (node1Id, node2Id) => {
  const node1 = _.cloneDeep(state.chart.nodes[node1Id])
  const node2 = _.cloneDeep(state.chart.nodes[node2Id])
  const id1 = `to${node2Id}`
  const id2 = `to${node1Id}`
  _.merge(node1, { ports: { [id1]: { id: id1, type: 'output' } } })
  _.merge(node2, { ports: { [id2]: { id: id2, type: 'input' } } })

  const link = {
    id: `${node1Id}to${node2Id}`,
    from: {
      nodeId: node1Id,
      portId: id1,
    },
    to: {
      nodeId: node2Id,
      portId: id2,
    },
  }

  dispatch({
    type: 'SET_CHART_NODES',
    data: {
      [node1Id]: node1,
      [node2Id]: node2,
    },
  })
  dispatch({
    type: 'SET_CHART_LINKS',
    data: {
      [link.id]: link,
    },
  })
}
