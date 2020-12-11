const path = require('path')
const Application = require(path.resolve('app', 'Application'))
const param = require(path.resolve('app', 'AppParameters'))

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
