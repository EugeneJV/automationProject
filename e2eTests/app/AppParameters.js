let appParameters = {
    emailLogin: 'ssls.automation+666@gmail.com',
    password: '123456'
  }

appParameters.systemUrl = 'https://www.sbzend.ssls.com'

appParameters.capabilities = {
  name: `chromeProperties`,
  browserName: 'chrome',
  'goog:chromeOptions': {
    args: [
      '--start-maximized',
      '--no-sandbox'
    ]
  },
  'timeouts': {"implicit": 30000}
}

appParameters.implicitWait = 20000

module.exports = appParameters