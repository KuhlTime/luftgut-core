import Message from './Message'

export default class LogMessage extends Message {
  time: Date = new Date()
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
