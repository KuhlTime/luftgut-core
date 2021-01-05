import Message from './Message'

/**
 * Login Message
 * @warning Do not include any computation.
 */
export default class ErrorMessage extends Message {
  error: Error

  constructor(error: Error) {
    super()

    this.error = error
  }
}
