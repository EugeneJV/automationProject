const {By} = require('selenium-webdriver')

module.exports = class UserProfilePage {
  constructor (seleniumFunctions) {
    this.seleniumFunctions = seleniumFunctions

    this.profileItemSelector = By.css(`li a[href='/user/profile']`)
    this.userEmaiButtonSelector = By.css('button[class*=header-btn] span[class$=btn-text]')
    this.supportPinFieldSelector = By.css('div[ng-class*=pin] span.text.ng-binding')
    this.newsletterFieldSelector = By.css('div[ng-class*=newsletter] span.text.mail-list')
    this.userDropdownMenuSelector = By.css('div[class*=dropdown] ul[class$=ssls-header-user-nav]')
    this.logOutButtonSelector = By.css('div[class*=dropdown] ul button[type=button]')
    this.userProfileFieldsGenerator = ({type}) => `.description span[ng-hide*=${type}]`
  }

  async clickUserEmaiButton() {
    await this.seleniumFunctions.clickElement({selector: this.userEmaiButtonSelector})
  }

  async getButtonDescription() {
    return this.seleniumFunctions.getText({selector: this.userEmaiButtonSelector})
  }

  async getProfileFieldsDescription({profileFields}) {
    const fields = {}

    for (const field of profileFields) {
      fields[field] = await this.seleniumFunctions.getText({selector: By.css(this.userProfileFieldsGenerator({type: field}))})
    }

    return fields
  }

  async getSupportPinField() {
    return this.seleniumFunctions.getText({selector: this.supportPinFieldSelector})
  }

  async getNewsletterField() {
    return this.seleniumFunctions.getText({selector: this.newsletterFieldSelector})
  }

  async isUserDropdownMenuPresent() {
    return this.seleniumFunctions.isElementPresent({selector: this.userDropdownMenuSelector})
  }

  async logOut() {
    await this.clickUserEmaiButton()
    await this.seleniumFunctions.delay({})
    await this.seleniumFunctions.clickElement({selector: this.logOutButtonSelector})
    await this.seleniumFunctions.delay({})
  }

  async selectProfileItemInDropdown() {
    await this.seleniumFunctions.clickElement({selector: this.userEmaiButtonSelector})
    await this.seleniumFunctions.clickElement({selector: this.profileItemSelector})
  }
}