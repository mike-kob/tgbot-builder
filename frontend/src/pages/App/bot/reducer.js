const reducer = (state, action) => {
  switch (action.type) {
    case 'STATE_UPDATE':
      return {
        ...state,
        ...action.data,
      }
    case 'INSERT_NODE_IN_CHART':
      return {
        ...state,
        chart: {
          ...state.chart,
          nodes: {
            ...state.chart.nodes,
            [action.data.id]: action.data.node,
          },
        },
      }
    case 'ADD_NODE':
      return {
        ...state,
        chart: {
          ...state.chart,
          nodes: {
            ...state.chart.nodes,
            [action.data.id]: action.data.node,
          },
        },
        nodeInfo: {
          ...state.nodeInfo,
          [action.data.id]: action.data.nodeInfo,
        },
      }
    case 'SELECT':
      return {
        ...state,
        selected: action.data,
      }
    case 'SET_DRAWER':
      return {
        ...state,
        drawer: {
          ...state.drawer,
          ...action.data,
        },
      }
    case 'SET_CURRENT_COMMAND':
      return {
        ...state,
        currentCommand: {
          ...state.currentCommand,
          ...action.data,
        },
      }
    case 'SET_NODE':
      return {
        ...state,
        nodeInfo: {
          ...state.nodeInfo,
          ...action.data,
        },
      }
    case 'SET_POPUP':
      return {
        ...state,
        popup: {
          ...state.popup,
          ...action.data,
        },
      }
    case 'SET_CHART_NODES':
      return {
        ...state,
        chart: {
          ...state.chart,
          nodes: {
            ...state.chart.nodes,
            ...action.data,
          },
        },
      }
    case 'SET_CHART_LINKS':
      return {
        ...state,
        chart: {
          ...state.chart,
          links: {
            ...state.chart.links,
            ...action.data,
          },
        },
      }
    case 'CHANGE_GREETING':
      return {
        ...state,
        greeting: action.data,
      }
    case 'CHANGE_INIT_STATE':
      return {
        ...state,
        initState: action.data,
      }
    default:
      return state
  }
}

export default reducer
