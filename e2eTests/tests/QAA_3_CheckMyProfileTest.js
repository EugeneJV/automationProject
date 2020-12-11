const param = require('../app/AppParameters')
const {expect} = require('chai')
require('./hooks')

it('QAA_3_CheckMyProfileTest', async function () {
  this.timeout(30000)
  try {
    await param.app.openPage({url: param.systemUrl})
    await param.app.logInToAccountAndViewProfile()

    let profileFields = await param.app.pages.UserProfilePage.getProfileFieldsDescription({
      profileFields: ['name', 'email', 'password', 'phone', 'address']
    })

    profileFields.supportPin = await param.app.pages.UserProfilePage.getSupportPinField()
    profileFields.newsLetter = await param.app.pages.UserProfilePage.getNewsletterField()

    await param.app.pages.UserProfilePage.logOut()
    await param.app.logInToAccountAndViewProfile()

    const currentUrl = await param.app.getCurrentUrl()

    expect(currentUrl, `Current url is not correct`).to.equal(`${param.systemUrl}/user/profile`)

    let profileFieldsAfterRefresh = await param.app.pages.UserProfilePage.getProfileFieldsDescription({
      profileFields: ['name', 'email', 'password', 'phone', 'address']
    })

    profileFieldsAfterRefresh.supportPin = await param.app.pages.UserProfilePage.getSupportPinField()
    profileFieldsAfterRefresh.newsLetter = await param.app.pages.UserProfilePage.getNewsletterField()

    expect(profileFields, `Profile fields are not equal after page refresh`).to.deep.equal(profileFieldsAfterRefresh)
  } catch (error) {
    throw error
  }
})