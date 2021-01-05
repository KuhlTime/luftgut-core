import * as fb from '@/firebase'
import * as Message from '@/models/messages'

/**
 * Creates a new Update Message
 */
export default (): Message.Update => {
  return new Message.Update(fb.getCurrentUser())
}