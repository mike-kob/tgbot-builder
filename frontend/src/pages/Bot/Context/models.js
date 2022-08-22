import { fromJS } from 'immutable';
import { ACTION } from '@/pages/Bot/constants';

export const nodeFactory = () => fromJS({
  id: String((new Date()).getTime()),
  type: 'default',
  position: {
    x: 300,
    y: 250,
  },
  data: {
    label: 'New state',
    commands: [],
    initial: [],
    messages: [],
    schedule: [],
  },
});

export const commandFactory = () => fromJS({
  name: '',
  actions: [],
});

export const messageFactory = () => fromJS({
  regexp: '.*',
  actions: [],
});

export const scheduleFactory = () => fromJS({
  id: String((new Date()).getTime()),
  cron: '0 12 * * *',
  actions: [],
});

export const actionFactory = () => fromJS({
  type: ACTION.SEND_MESSAGE,
  options: {},
});

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
});

export const NewAction = {
  type: '',
  options: {},
};
