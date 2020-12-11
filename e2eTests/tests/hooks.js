const param = require('../app/AppParameters')
const Application = require('../app/Application')

before(async function () {
  try {
    param.app = new Application

  } catch (error) {
    console.log(error.message)
    throw error
  }
})

after(async function () {
  try {
    await param.app.quit()
  } catch (error) {
    console.log(error.message)
  }
})
