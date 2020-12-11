'use strict'

module.exports = [
  'AuthorizationPage',
  'UserProfilePage'
].map(
  (page) => require(`./${page}`)
)