/**
 * A message is a standarized model to send data between the
 * server and the client. The data of the message can vary.
 */
export default class Message<T> {
  /**
   * The date the message was created (send)
   */
  created: Date = new Date()

  /**
   * The data that should be send with this message
   */
  data: T

  constructor(data: T) {
    this.data = data
  }
}
