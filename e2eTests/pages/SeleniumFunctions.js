const {Condition, until} = require('selenium-webdriver')
const param = require('../app/AppParameters')

module.exports = class SeleniumFunctions {
  constructor (driver) {
    this.driver = driver
  }

  async clickElement({selector, waitVisible = false}) {
    const element = await this.driver.findElement(selector)

    if (waitVisible) {
      await this.waitUntil(
        until.elementIsVisible(element)
      )
    }

    await element.click()
  }

  async delay({mls = 1000}) {
    await this.driver.sleep(mls)
  }

  async getCurrentUrl () {
    return this.driver.getCurrentUrl()
  }

  async getText({selector}) {
    const element = await this.driver.findElement(selector)

    await this.waitUntil(
      until.elementIsVisible(element),
      param.implicitWait
    )

    return element.getText()
  }

  async isElementPresent({selector}) {
    await this.driver.manage().setTimeouts({
      implicit: 1000
    })
    const elements = await this.driver.findElements(selector)

    return elements.length > 0
  }

  async open(url) {
    await this.driver.get(url)
  }

  async quit() {
    await this.driver.quit()
  }

  async setValue({selector, value}) {
    const element = await this.driver.findElement(selector)

    await this.waitUntil(
      until.elementIsVisible(element),
      param.implicitWait
    )
    await this.driver.findElement(selector).clear()
    await this.driver.findElement(selector).sendKeys(value)

    console.log(`SET: ${value} to element with selector = ${selector}`)
  }

  untilElementIsPresent({selector, currentImplicitWait}) {
    return new Condition(
      [
        `until element = ${selector} is present`
      ].join(' '),
      async () => {
        const isPresent = await this.isElementPresent(
          {selector,
          currentImplicitWait}
        )

        return isPresent === true
      }
    )
  }

  async waitUntil(untilQ, timeout = param.implicitWait) {
    try {
      await this.driver.wait(untilQ, timeout)
    } catch (error) {
      throw new Error(
      )
    }
  }
}