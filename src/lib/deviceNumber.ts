import serialNumber from 'serial-number'

function getUniqueDeviceNumber(): Promise<string> {
  return new Promise((resolve, reject) => {
    serialNumber((err, value) => {
      if (err) {
        reject(err)
      } else {
        resolve(value)
      }
    })
  })
}

export default getUniqueDeviceNumber
