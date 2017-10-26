"use strict"

const acceptanceSpecsHelper = require('../../test/acceptance-specs-helper')

describe('/list/test-user', function () {
  let actual
  before(() => {
    return acceptanceSpecsHelper.makeApiCall('list/test-user').then(data => actual = data)
  })

  it('should return a list', () => {
    expect(actual).to.equal({})
  })
})