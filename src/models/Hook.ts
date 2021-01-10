import { firebase } from '@/firebase'
import { Capability } from '.'

export default class Hook {
  /**
   * The reference id of the capability
   */
  capability: Capability

  /**
   * The code in content only format. So NO "Function Decorator" aka function() {}
   */
  code: string

  /**
   * Wether or not the hook is marked as active
   */
  active: boolean

  constructor(
    capabilitySnapshot: firebase.firestore.DocumentSnapshot,
    code: string,
    active: boolean
  ) {
    this.capability = new Capability(capabilitySnapshot)
    this.code = code
    this.active = active
  }

  /**
   * Checks if the entered code is valid
   */
  get isValid(): boolean {
    // TODO: Add more rules
    // For now check if the code contains the return keyword
    return this.code.includes('return')
  }

  /**
   * Perform the hook
   */
  async getData(): Promise<any> {
    return await eval(`async (() => { ${this.code} })()`)
  }
}
