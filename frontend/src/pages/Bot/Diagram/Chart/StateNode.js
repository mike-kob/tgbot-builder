import React, { useContext } from 'react'
import {
  makeStyles,
  Paper,
} from '@material-ui/core'

import { Context } from '../bot/store'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    width: '100px',
    height: '100px',
    padding: 0,
  },
}))

const CustomNode = ({ node, children, ...otherProps }, ref) => {
  const classes = useStyles()
  const [state] = useContext(Context)
  const info = state.nodeInfo[node.id]

  return (
        <Paper ref={ref} {...otherProps} className={classes.root}>
            {info.label}
            {children}
        </Paper>
  )
}

export default React.forwardRef(CustomNode)
