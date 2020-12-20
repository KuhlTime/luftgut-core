import { Router } from 'express'
import { Logger } from '@/lib/betterLog'
import { certificatePath } from '@/server'

const better = new Logger('API')
const router = new Router()

router.get('/cert', (req, res) => {
  better.info('GET /cert')
  res.download(certificatePath, 'luftgut.cert')
})

export default router
