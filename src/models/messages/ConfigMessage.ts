import Message from './Message'

/**
 * This is the configuration message which either gets send on the 
 * initial setup or when updating any device settings.
 * @to Server  
 * @warning Do not include any computation.
 */
export default class ConfigMessage extends Message {
  location: string

  // TODO: Add Hooks
}
