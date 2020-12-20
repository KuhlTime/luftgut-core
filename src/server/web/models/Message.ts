import { v5 as uuid } from 'uuid'

enum MessageType {
  Warning,
  Success,
  Info,
  Error
}

class Message {
  id: string = uuid()
  type: MessageType
  title: string
  message: string

  constructor(type: MessageType = MessageType.Info, title: string, message: string) {
    this.type = type
    this.title = title
    this.message = message
  }
}

export { Message, MessageType }
