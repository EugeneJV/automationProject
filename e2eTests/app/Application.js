const pages = require('../pages')
const param = require('../app/AppParameters')
const SeleniumFunctions = require('../pages/SeleniumFunctions')
const chromedriver = require('chromedriver')
const {Builder} = require('selenium-webdriver');

module.exports = class Application {
  constructor () {
    this.driver =  new Builder()
      .withCapabilities(param.capabilities)
      .build()
    this.seleniumFunctions = new SeleniumFunctions(this.driver)

    pages.forEach((page, i) => {
      pages[String(page.name)] = new pages[i](this.seleniumFunctions)
    })
    this.pages = pages
  }

  async delayApp({mls}) {
    await this.seleniumFunctions.delay({mls})
  }

  async getCurrentUrl() {
    return this.seleniumFunctions.getCurrentUrl()
  }

  async logInToAccountAndViewProfile() {
    await this.pages.AuthorizationPage.clickLogInButton()
    await this.delayApp({})
    await this.pages.AuthorizationPage.setEmailFormField({value: param.emailLogin})
    await this.pages.AuthorizationPage.setPasswordFormField({value: param.password})
    await this.pages.AuthorizationPage.submitLogin()
    await this.delayApp({mls: 2000})
    await param.app.pages.UserProfilePage.clickUserEmaiButton()
    await this.delayApp({})
    await param.app.pages.UserProfilePage.selectProfileItemInDropdown()
    await this.delayApp({mls: 2000})
  }

  async openPage({url}) {
    await this.seleniumFunctions.open(url)
  }

  async quit() {
    await this.seleniumFunctions.quit()
  }
}