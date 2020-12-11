const param = require('../app/AppParameters')
const {expect} = require('chai')
require('./hooks')

it('QAA_2_AuthorizationFlowRegisteredUserTest', async function () {
  this.timeout(20000)
  try {
    const userEmail = param.emailLogin

    await param.app.openPage({url: param.systemUrl})

    const currentUrl = await param.app.getCurrentUrl()

    expect(currentUrl, `Current url is not correct`).to.equal(`${param.systemUrl}/`)

    await param.app.pages.AuthorizationPage.clickLogInButton()
    await param.app.delayApp({})

    const currentUrlAfterRegistery = await param.app.getCurrentUrl()

    expect(currentUrlAfterRegistery, `Current url is not correct`).to.equal(`${param.systemUrl}/authorize`)

    await param.app.pages.AuthorizationPage.setEmailFormField({value: userEmail})
    await param.app.pages.AuthorizationPage.setPasswordFormField({value: param.password})
    await param.app.pages.AuthorizationPage.showPassword()

    const isPasswordShown = await param.app.pages.AuthorizationPage.isPasswordShown()

    expect(isPasswordShown, `Password on authorization page is not displayed`).to.be.true

    await param.app.pages.AuthorizationPage.submitLogin()
    await param.app.delayApp({mls: 2000})

    const buttonDescription = await param.app.pages.UserProfilePage.getButtonDescription()

    expect(buttonDescription, `Button description is not shown as ${param.emailLogin}`).to.equal(userEmail.toUpperCase())

    await param.app.pages.UserProfilePage.clickUserEmaiButton()

    const isDropdownMenuPresent = await param.app.pages.UserProfilePage.isUserDropdownMenuPresent()

    expect(isDropdownMenuPresent, `Dropdown menu for user is not present`).to.be.true
  } catch (error) {
    throw error
  }
})