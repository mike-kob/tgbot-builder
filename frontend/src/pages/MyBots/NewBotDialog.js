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

import { addBot } from '@/actions'
import { useRouter } from 'next/router'
import initState from '@/pages/Bot/Context/initState'

const useStyles = makeStyles((theme) => ({
}))

const NewBotDialog = (props) => {
  const classes = useStyles()
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { open, setOpen } = props

  const handleClose = () => {
    setOpen(false)
    setName('')
    setDescription('')
  }

  const handleSave = async () => {
    const data = {
      ...initState.get('bot').toJS(),
      name,
      description,
    }
    await addBot(data, (newBot) => {
      router.push('/bot/' + newBot._id)
      props.onAdd(newBot)
    })
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Create bot
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant="body2" color="textSecondary">
            Enter bot details
          </DialogContentText>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            variant="outlined"
            margin="dense"
            label="Name"
            type="email"
            fullWidth
          />
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            margin="dense"
            label="Description"
            fullWidth
            multiline
            minRows={2}
            maxRows={5}
          />
        </DialogContent>
        <DialogActions>
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
