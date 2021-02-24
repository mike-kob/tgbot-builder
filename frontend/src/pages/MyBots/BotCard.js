import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  Paper,
  IconButton,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  paper: {
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: theme.spacing(15),
  },
  editButton: {
    marginLeft: 'auto',
  },
  titleLink: {
    cursor: 'pointer',
  },
}))

const BotCard = (props) => {
  const classes = useStyles()
  const router = useRouter()
  const { bot } = props
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <Paper className={fixedHeightPaper} elevation="0">
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
        className={classes.titleLink}
        onClick={() => router.push('/bot/' + bot._id) }
      >{bot.name}</Typography>
      <IconButton className={classes.editButton} onClick={props.onEdit}>
        <EditIcon/>
      </IconButton>
    </Paper>
  )
}

export default BotCard
