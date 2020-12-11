const {By} = require('selenium-webdriver')

module.exports = class AuthorizationPage {
  constructor (seleniumFunctions) {
    this.seleniumFunctions = seleniumFunctions

    this.logInButtonSelector = By.css('div[class*=add-nav] button[class*=header-btn]')
    this.emailFormFieldSelector = By.css('.form-group.email input[type=email]')
    this.submitLoginButtonSelector = By.css('button[type=submit]')
    this.showPasswordButtonSelector = By.css('.btn-box button[class*=btn-input-block]')
    this.errorMessageText = By.css('.noty_text')
    this.passwordFormFieldGenerator = ({ type }) => `input[name=password][type=${type}]`
  }

  async clickLogInButton() {
    await this.seleniumFunctions.clickElement({selector: this.logInButtonSelector, waitVisible: true})
  }

  async getErrorMessage() {
    await this.seleniumFunctions.waitUntil(
      await this.seleniumFunctions.untilElementIsPresent({
          selector: this.errorMessageText,
          currentImplicitWait: 20000
        }
      )
    )

    return this.seleniumFunctions.getText({selector: this.errorMessageText})
  }

  async isPasswordShown() {
    return this.seleniumFunctions.isElementPresent({selector: By.css(this.passwordFormFieldGenerator({type: 'text'}))})
  }

  async setEmailFormField({value}){
    await this.seleniumFunctions.setValue({selector: this.emailFormFieldSelector, value})
  }

  async setPasswordFormField({value}){
    await this.seleniumFunctions.setValue({selector: By.css(this.passwordFormFieldGenerator({type: 'password'})), value})
  }

  async showPassword() {
    await this.seleniumFunctions.clickElement({selector: this.showPasswordButtonSelector, waitVisible: true})
  }

  async submitLogin() {
    await this.seleniumFunctions.clickElement({selector: this.submitLoginButtonSelector, waitVisible: true})
  }
}
