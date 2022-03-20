import React, { useEffect, useState } from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from '@material-ui/core'

import { addBot, updateBotInfo, deleteBot } from '@/actions'
import { useRouter } from 'next/router'
import initState from '@/pages/Bot/Context/initState'

const useStyles = makeStyles((theme) => ({
  deleteBtn: {
    marginRight: 'auto',
    color: 'red',
  },
}))

const NewBotDialog = (props) => {
  const classes = useStyles()
  const router = useRouter()
  const [name, setName] = useState('')
  const [token, setToken] = useState('')
  const { open, setOpen, bot } = props

  useEffect(() => {
    setName(bot.name)
  }, [bot])

  const handleClose = () => {
    setOpen(false)
  }
  const handleSave = async () => {
    if (bot._id) {
      const data = { name }
      if (token) {
        data.token = token
      }
      updateBotInfo(bot._id, data, (newBot) => {
        setOpen(false)
        props.onUpdate(newBot)
      })
    } else {
      const data = {
        ...initState.get('bot').toJS(),
        token,
        name,
      }
      await addBot(data, (newBot) => {
        router.push('/bot/' + newBot._id)
        props.onAdd(newBot)
      })
    }
  }
  const handleDelete = async () => {
    const res = confirm('Do you really want to delete this bot?')
    if (res) {
      await deleteBot(bot._id, () => {
        setOpen(false)
        props.onDelete(bot)
      })
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {bot.name ? 'Edit bot' : 'Create bot'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter bot details
          </DialogContentText>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            margin="dense"
            label="Name"
            type="email"
            fullWidth
          />
          <TextField
            value={token}
            onChange={(e) => setToken(e.target.value)}
            margin="dense"
            label="API token"
            fullWidth
            placeholder="Enter new to change"
            type="password"
          />
        </DialogContent>
        <DialogActions>
          {bot._id &&
            <Button onClick={handleDelete} className={classes.deleteBtn}>
              Delete
            </Button>}
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NewBotDialog
