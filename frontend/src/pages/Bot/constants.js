import TrendingFlatIcon from '@material-ui/icons/TrendingFlat'
import EmailIcon from '@material-ui/icons/Email'
import LanguageIcon from '@material-ui/icons/Language'
import React from 'react'

export const VIEW_NAME = {
  MAIN: 'MAIN',
  DIAGRAM: 'DIAGRAM',
  USERS: 'USERS',
}

export const INIT_NODE_ID = 'init'

export const ACTION = {
  CHANGE_STATE: 'change_state',
  SEND_MESSAGE: 'send_message',
  MAKE_REQUEST: 'make_request',
  SAVE_USER_DATA: 'save_user_data',
}

export const ACTION_LABEL = {
  [ACTION.CHANGE_STATE]: 'state',
  [ACTION.SEND_MESSAGE]: 'msg',
  [ACTION.MAKE_REQUEST]: 'request',
}
export const ACTION_ICON = {
  [ACTION.CHANGE_STATE]: <TrendingFlatIcon/>,
  [ACTION.SEND_MESSAGE]: <EmailIcon/>,
  [ACTION.MAKE_REQUEST]: <LanguageIcon/>,
}

export const DRAWER = {
  INITIAL: 'initial',
  COMMAND: 'command',
  MESSAGE: 'message',
}
