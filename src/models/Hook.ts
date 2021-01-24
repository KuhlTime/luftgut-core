import { firebase } from '../firebase'
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

  get valid(): boolean {
    if (this.capability.required) {
      return this.active && this.code !== ''
    } else {
      // Hooks that are not marked as required are always valid
      return true
    }
  }
}
