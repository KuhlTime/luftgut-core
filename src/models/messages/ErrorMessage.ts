import Message from './Message'

/**
 * Error Message
 * @warning Do not include any computation.
 */
export default class ErrorMessage extends Message {
  error: Error

  /**
   * At defines a place where the error can be associated with
   */
  at?: string

  constructor(error: Error, at: string | undefined) {
    super()

    this.error = error
    this.at = at
  }
}
