const param = require('../app/AppParameters')
const {expect} = require('chai')
require('./hooks')

it('QAA_1_AuthorizationFlowNotRegisteredUserTest', async function () {
  this.timeout(20000)
  try {
    const userData = {
      email: 'userInvalid@email.com',
      password: 'trashValue'
    }
    const expectedErrorMessage = 'Uh oh! Email or password is incorrect'

    await param.app.openPage({url: param.systemUrl})

    const currentUrl = await param.app.getCurrentUrl()

    expect(currentUrl, `Current url is not correct`).to.equal(`${param.systemUrl}/`)

    await param.app.pages.AuthorizationPage.clickLogInButton()
    await param.app.delayApp({})

    const currentUrlAfterRegistery = await param.app.getCurrentUrl()

    expect(currentUrlAfterRegistery, `Current url is not correct`).to.equal(`${param.systemUrl}/authorize`)

    await param.app.pages.AuthorizationPage.setEmailFormField({value: userData.email})
    await param.app.pages.AuthorizationPage.setPasswordFormField({value: userData.password})
    await param.app.pages.AuthorizationPage.showPassword()

    const isPasswordShown = await param.app.pages.AuthorizationPage.isPasswordShown()

    expect(isPasswordShown, `Password on authorization page is not displayed`).to.be.true

    await param.app.pages.AuthorizationPage.submitLogin()

    const errorMessage = await param.app.pages.AuthorizationPage.getErrorMessage()

    expect(errorMessage, `Error message is not shown`).to.equal(expectedErrorMessage)
  } catch (error) {
    throw error
  }
})