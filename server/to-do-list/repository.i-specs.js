'use strict'

const uuid = require('uuid')
const mongoose = require('mongoose')

const toDoListRepository = require('./repository')
const {Item} = require('./schema')
const domainHelper = require('../../test/domain-helpers')

describe('toDoListRepository', () => {
  let userId

  beforeEach(() => {
    userId = uuid.v4()
  })

  context('when creating and adding an item to a todo list', () => {
    let savedList
    const listName = "My Test List"
    const itemName = "New Item"

    beforeEach(() => {
      return toDoListRepository.createEmptyList(userId, listName)
        .then(l => savedList = l)
        .then(() => toDoListRepository.addItem(userId, savedList._id, itemName))
        .then(l => savedList = l)
    })

    afterEach(() => {
      return domainHelper.deleteEntireList(userId, savedList._id)
    })

    it('should create the list', () => {
      expect(savedList.userId).to.equal(userId)
      expect(savedList.name).to.eql(listName)
    })

    it('should have the item', () => {
        expect(savedList.items.length).to.equal(1)
        expect(savedList.items[0].name).to.equal(itemName)
    })
  })

  context('when adding multiple items to a todo list', () => {
    let savedList
    const listName = "My Test List"
    const item1Name = "New Item 1"
    const item2Name = "New Item 2"
    const item3Name = "New Item 3"

    beforeEach(() => {
      return toDoListRepository.createEmptyList(userId, listName)
        .then(l => savedList = l)
        .then(() => toDoListRepository.addItem(userId, savedList._id, item1Name))
        .then(() => toDoListRepository.addItem(userId, savedList._id, item2Name))
        .then(() => toDoListRepository.addItem(userId, savedList._id, item3Name))
        .then(l => savedList = l)
    })

    afterEach(() => {
      return domainHelper.deleteEntireList(userId, savedList._id)
    })

    it('should have all 3 items in the list', () => {
      expect(savedList.items.length).to.equal(3)
    })

    it('should keep the order of the items', () => { 
        expect(savedList.items[0].name).to.equal(item1Name)
        expect(savedList.items[1].name).to.equal(item2Name)
        expect(savedList.items[2].name).to.equal(item3Name)
    })

    it('should mark items as incomplete by default', () => { 
        expect(savedList.items[0].complete).to.be.false
        expect(savedList.items[1].complete).to.be.false
        expect(savedList.items[2].complete).to.be.false
    })
  })

  context('when adding an item to a todo list that does not exist', () => {
    let savedList
    const listId = mongoose.Types.ObjectId()
    const itemName = "New Item 1"

    beforeEach(() => {
      return toDoListRepository.addItem(userId, listId, itemName)
        .then(l => savedList = l)
    })

    it('should NOT save a list', () => {
        expect(savedList).to.eql({})
    })

    it('should NOT save the item', () => {
        return Item.findOne({'name':itemName}).then(item => {
            expect(item).to.be.null
        })
    })
  })

  context('when checking an item as complete', () => {
    let listId, savedList, item1Id, returnedItem
    const item1Name = "Item 1"
    const item2Name = "Item 2"
    const expectedCompletedAt = new Date().toLocaleString()

    beforeEach(() => {
      return toDoListRepository.createEmptyList(userId, "My Test List")
        .then(l => listId = l._id)
        .then(() => toDoListRepository.addItem(userId, listId, item1Name))
        .then(list => item1Id = list.items[0]._id)
        .then(() => toDoListRepository.addItem(userId, listId, item2Name))
        .then(() => toDoListRepository.checkItem(item1Id, expectedCompletedAt)
            .then(i => returnedItem = i))
        .then(() => toDoListRepository.getList(userId))
        .then(l => savedList = l)
    })

    afterEach(() => {
      return domainHelper.deleteEntireList(userId, listId)
    })

    it('should return the updated item', () => {
        expect(returnedItem._id).to.eql(savedList.items[0]._id)
        expect(returnedItem.completedAt).to.eql(savedList.items[0].completedAt)
        expect(returnedItem.complete).to.eql(savedList.items[0].complete)
        expect(returnedItem.name).to.eql(savedList.items[0].name)
    })

    it('should mark the completed item as complete', () => {
        expect(savedList.items.length).to.equal(2)
        expect(savedList.items[0].complete).to.be.true
        let returnedDate = new Date(savedList.items[0].completedAt).toLocaleString()
        expect(returnedDate).to.equal(expectedCompletedAt)
    })

    it('should NOT mark the other item as complete', () => {
        expect(savedList.items[1].complete).to.be.false
    })
  })

  context('when checking an item as complete but the item DOES NOT exist', () => {
    let error
    const itemId = mongoose.Types.ObjectId()

    beforeEach(() => {
      return toDoListRepository.checkItem(itemId, new Date().toLocaleString())
        .catch(err => error = err)
    })

    it('should NOT save an item', () => {
        return Item.findOne({'_id':itemId}).then(item => {
            expect(item).to.be.null
        })
    })

    it('should throw an error', () => {
        expect(error).to.exist
        expect(error).to.contain('Unable to find item with id ' + itemId)
    })
  })

  context('when UNchecking an item', () => {
    let listId, savedList, item1Id, item2Id, updatedItem
    const item1Name = "Item 1"
    const item2Name = "Item 2"
    const expectedCompletedAt1 = new Date().toLocaleString()
    const expectedCompletedAt2 = new Date(2016).toLocaleString()

    beforeEach(() => {
      return toDoListRepository.createEmptyList(userId, "My Test List")
        .then(l => listId = l._id)
        .then(() => toDoListRepository.addItem(userId, listId, item1Name))
        .then(list => item1Id = list.items[0]._id)
        .then(() => toDoListRepository.addItem(userId, listId, item2Name))
        .then(list => item2Id = list.items[1]._id)
        .then(() => toDoListRepository.checkItem(item1Id, expectedCompletedAt1))
        .then(() => toDoListRepository.checkItem(item2Id, expectedCompletedAt2))
        .then(() => toDoListRepository.uncheckItem(item2Id))
        .then(item => updatedItem = item)
        .then(() => toDoListRepository.getList(userId))
        .then(l => savedList = l)
    })

    afterEach(() => {
      return domainHelper.deleteEntireList(userId, listId)
    })

    it('should return the updated item as unchecked', () => {
        expect(updatedItem._id).to.eql(item2Id)
        expect(updatedItem.completedAt).to.be.null
        expect(updatedItem.complete).to.be.false
        expect(updatedItem.name).to.eql(item2Name)
    })

    it('should mark the unchecked item as incomplete', () => {
        expect(savedList.items.length).to.equal(2)
        expect(savedList.items[1]._id).to.eql(item2Id)
        expect(savedList.items[1].complete).to.be.false
        expect(savedList.items[1].completedAt).to.be.null
    })

    it('should NOT mark the other item as incomplete', () => {
        expect(savedList.items[0]._id).to.eql(item1Id)
        expect(savedList.items[0].complete).to.be.true
        let returnedDate = new Date(savedList.items[0].completedAt).toLocaleString()
        expect(returnedDate).to.equal(expectedCompletedAt1)
    })
  })
  
  context('when unchecking an item but the item DOES NOT exist', () => {
    let error
    const itemId = mongoose.Types.ObjectId()

    beforeEach(() => {
      return toDoListRepository.uncheckItem(itemId)
        .catch(err => error = err)
    })

    it('should NOT save an item', () => {
        return Item.findOne({'id':itemId}).then(item => {
            expect(item).to.be.null
        })
    })

    it('should throw a meaningful error', () => {
        expect(error).to.exist
        expect(error).to.contain('Unable to find item with id ' + itemId)
    })
  })

  context('when removing an item', () => {
    let listId, itemId, savedList
    const itemName = "Item 1"

    beforeEach(() => {
      return toDoListRepository.createEmptyList(userId, "My Test List")
        .then(l => listId = l._id)
        .then(() => toDoListRepository.addItem(userId, listId, itemName))
        .then(list => itemId = list.items[0]._id)
        .then(() => toDoListRepository.removeItem(userId, listId, itemId)
        .then(list => savedList = list))
    })

    afterEach(() => {
      return domainHelper.deleteEntireList(userId, listId)
    })

    it('should return the list without the removed item', () => {
        expect(savedList.items).to.eql([])
    })

    it('should delete the removed item', () => {
        return Item.findOne({'_id':itemId}).then(item => {
           expect(item).to.be.null
        })
    })
  })

  context('when removing an item from a list and the item DOES NOT exist', () => {
    let listId, error
    const itemId = mongoose.Types.ObjectId()

    beforeEach(() => {
        return toDoListRepository.createEmptyList(userId, "My Test List")
        .then(l => listId = l._id) 
        .then(toDoListRepository.removeItem(userId, listId, itemId))
        .catch(err => error = err)
    })

    it('should NOT throw an error', () => {
        expect(error).to.be.undefined
    })
  })

  context('when removing an item from a list that DOES NOT exist', () => {
    let error
    const listId = mongoose.Types.ObjectId()

    beforeEach(() => {
      return toDoListRepository.removeItem(userId, listId, 'foo')
        .catch(err => error = err)
    })

    it('should NOT throw an error', () => {
        expect(error).to.be.undefined
    })
  })
})