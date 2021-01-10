export default class ClientHook {
  id: string
  code: string
  activated: boolean

  constructor(id: string, code: string, activated: boolean) {
    this.id = id
    this.code = code
    this.activated = activated
  }
}
