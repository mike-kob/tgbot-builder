import { fromJS } from 'immutable'

export const nodeFactory = () => fromJS({
  type: 'default',
  position: {
    x: 300,
    y: 250,
  },
  data: {
    label: 'New state',
    commands: [],
  },
})

export const commandFactory = () => fromJS({
  name: '',
  actions: [],
})

export const actionFactory = () => fromJS({
  type: null,
  options: {},
})

export const linkFactory = (node1, port1, node2, port2) => ({
  from: {
    nodeId: node1,
    portId: port1,
  },
  to: {
    nodeId: node2,
    portId: port2,
  },
  properties: {
    label: 'example link label',
  },
})

export const NewAction = {
  type: '',
  options: {},
}
