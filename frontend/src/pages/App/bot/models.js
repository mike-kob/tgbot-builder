
export const nodeFactory = () => ({
  id: Date.now().toString(),
  type: '',
  position: {
    x: 300,
    y: 250,
  },
  ports: {},
})

export const nodeInfoFactory = () => ({
  id: Date.now(),
  label: 'New state',
  commands: {},
})

export const commandFactory = () => ({
  id: Date.now(),
  name: '',
  actions: [],
})

export const linkFactory = (node1, port1, node2, port2) => ({
  id: Date.now(),
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
