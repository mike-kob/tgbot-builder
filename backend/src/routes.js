import express from 'express'

import * as auth from './controllers/auth'
import * as bots from './controllers/bots'

const router = express.Router()

router.get('/bots', bots.botList)
router.get('/bot/:id', bots.botDetail)
router.post('/bot', bots.createBot)
router.put('/bot/:id', bots.updateBot)
router.delete('/bot/:id', bots.deleteBot)
router.post('/bot/deploy/:id', bots.deployBot)

router.get('/user', auth.user)
router.post('/login', auth.login)
router.post('/signup', auth.signup)
router.post('/logout', auth.logout)

export default router
