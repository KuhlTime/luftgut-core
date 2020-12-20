import Crypto from 'crypto-js'

class LoginPayload {
  email: string

  /**
   * Base64 Encoded Password
   */
  password: string

  constructor(email: string, password: string) {
    this.email = email
    this.password = Crypto.enc.Base64.stringify(Crypto.enc.Utf8.parse(password))
  }
}

export default LoginPayload
