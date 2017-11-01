"use strict"

const {apiGet, apiPost, dbHelper} = require('../../test/acceptance-specs-helper')
const config = require('../config/config')['test']

describe('/list ', function () {
  const userId = config.defaultUserId

  context('When the user does NOT have a list', () => {
    let actual
    before(() => {
      return apiGet(userId, 'list').then(data => actual = data)
    })

    it('should return a null list', () => {
      expect(actual).to.be.null
    })
  })

  context('When creating a new list and adding items to it', () => {
    let createdList
    const item1Name = "Go to bed"
    const item2Name = "Wake up"
    before(() => {
      return apiPost(userId, 'createList')
        .then(() => apiGet(userId, 'list')
          .then(list => {
            createdList = list
            apiPost(userId, 'addItem', { listId: createdList._id, newItemName: item1Name })
          })
          .then(() => apiPost(userId, 'addItem', { listId: createdList._id, newItemName: item2Name })))
    })

    afterEach(() => {
        return dbHelper.deleteEntireList(userId, createdList._id)
    })

    it('should create a new list', () =>{
      expect(createdList.name).to.equal("Default")
      expect(createdList.userId).to.equal(userId)
      expect(createdList._id).to.exist
    })
  })
})