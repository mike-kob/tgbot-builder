import React, { useCallback, useContext } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@material-ui/core'
import PermDeviceInformationIcon from '@material-ui/icons/PermDeviceInformation'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import PeopleIcon from '@material-ui/icons/People'

import { DiagramContext } from '@/pages/Bot/Context'
import { VIEW_NAME } from '@/pages/Bot/constants'

const Navigation = props => {
  const [state, dispatch] = useContext(DiagramContext)
  const currentView = state.get('currentView')

  const setView = useCallback((view) => {
    dispatch({ type: 'SET_VIEW', data: view })
  }, [dispatch])

  return (
    <List>
      <ListItem button
                selected={currentView === VIEW_NAME.MAIN}
                onClick={() => setView(VIEW_NAME.MAIN)}
      >
        <ListItemIcon>
          <PermDeviceInformationIcon/>
        </ListItemIcon>
        <ListItemText primary={'Main info'}/>
      </ListItem>
      <ListItem button
                selected={currentView === VIEW_NAME.DIAGRAM}
                onClick={() => setView(VIEW_NAME.DIAGRAM)}
      >
        <ListItemIcon>
          <AccountTreeIcon/>
        </ListItemIcon>
        <ListItemText primary={'Diagram'}/>
      </ListItem>
      <ListItem button
                selected={currentView === VIEW_NAME.USERS}
                onClick={() => setView(VIEW_NAME.USERS)}
      >
        <ListItemIcon>
          <PeopleIcon/>
        </ListItemIcon>
        <ListItemText primary={'Users'}/>
      </ListItem>
      <Divider/>
    </List>
  )
}

export default Navigation
