/**
 * A message is a standarized model to send data between the
 * server and the client. The data of the message can vary.
 */
class Message {
  created: Date = new Date()

  /**
   * Convert a plain JavaScript object into a `Message` object
   * @url See *Titian Cernicova-Dragomir*s Answer: https://stackoverflow.com/a/50342951/4179020
   * @param obj The plain JSON object
   */
  static toClass<T>(this: new () => T, obj: Record<string, unknown>): T {
    return Object.assign(new this(), obj)
  }
}

export default Message
