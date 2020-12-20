import { Router } from 'express'
const router = new Router()

import cert from './cert'
import user from './user'
import login from './login'
import register from './register'
import logout from './logout'

router.use(cert)
router.use(user)
router.use(login)
router.use(register)
router.use(logout)

export default router
