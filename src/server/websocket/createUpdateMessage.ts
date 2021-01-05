import * as fb from '@/firebase'
import { UpdateMessage } from '@/models/messages'

/**
 * Creates a new Update Message
 */
export default (): UpdateMessage => {
  return new UpdateMessage(fb.isLoggedIn(), fb.getCurrentUser())
}
