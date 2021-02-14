import Message from './Message'

export default class LogMessage extends Message {
  topic: string
  message: string
  type: string

  constructor(topic: string, message: string, type: string) {
    super()

    this.topic = topic
    this.message = message
    this.type = type
  }
}
