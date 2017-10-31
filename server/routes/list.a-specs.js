"use strict"

const acceptanceSpecsHelper = require('../../test/acceptance-specs-helper')
const config = require('../config/config')['test']

describe('When ', function () {
  const userId = config.defaultUserId
  let actual
  before(() => {
    return acceptanceSpecsHelper.makeApiCall(`list`).then(data => actual = data)
  
  })

  it('should return a list', () => {
    expect(actual).to.equal({})
  })
})