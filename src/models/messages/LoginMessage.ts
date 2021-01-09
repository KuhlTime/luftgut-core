import Message from './Message'

/**
 * Login Message
 * @to Server
 * @warning Do not include any computation.
 */
export default class LoginMessage extends Message {
  email: string
  password: string

  constructor(email: string, password: string) {
    super()

    this.email = email
    this.password = password
  }
}
