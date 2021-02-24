export const convertFromSrcToExec = (bot) => {
  const states = []
  const initStateName = bot.src.nodeInfo[bot.src.initState]?.label
  states.push(getStartState(bot.src.greeting, initStateName))

  for (const nodeId in bot.src.nodeInfo) {
    const nodeInfo = bot.src.nodeInfo[nodeId]
    const state = {
      name: nodeInfo.label,
      cmd_triggers: {},
    }
    for (const commandId in nodeInfo.commands) {
      const cmd = nodeInfo.commands[commandId]
      state.cmd_triggers[cmd.name] = cmd.actions.map(a => a.type !== 'change_state'
        ? a
        : {
            ...a,
            options: {
              ...a.options,
              state: bot.src.nodeInfo[a.options.state].label,
            },
          })
    }
    states.push(state)
  }

  const botExec = {
    name: bot.name,
    token: bot.token,
    states: states,
  }

  return botExec
}

const getStartState = (greeting, initState) => {
  const res = {
    name: 'start',
    cmd_triggers: {
      '/start': [
        {
          type: 'send_message',
          options: {
            text: greeting,
          },
        },
      ],
    },
  }
  if (initState) {
    res.cmd_triggers['/start'].push({
      type: 'change_state',
      options: {
        state: initState,
        immediately: true,
      },
    })
  }

  return res
}
