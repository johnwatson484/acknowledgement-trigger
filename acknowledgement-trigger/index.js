const axios = require('axios')
const CONTAINER_NAME = 'target'

module.exports = async function (context, mySbMsg) {
  context.log('JavaScript ServiceBus topic trigger function processed message', mySbMsg)

  const sourceFile = mySbMsg.acknowledgementFile.replace(`${CONTAINER_NAME}/`, '')

  const result = await axios.post(process.env.TRIGGER_URL, {
    sourceFile,
    sourceContainer: CONTAINER_NAME,
    targetContainer: 'batch',
    targetFolder: 'inbound'
  })

  if (result.status === 200) {
    console.log(`Successfully triggered transfer for ${sourceFile}`)
  } else {
    console.log(`Unable to transfer ${sourceFile}`)
  }
}
