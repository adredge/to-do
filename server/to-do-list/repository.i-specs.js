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

    afterEach(() => {
    //   return domainHelper.deleteEntireList(userId, savedList._id)
    })

    it('should NOT save a list', () => {
        expect(savedList).to.eql({})
    })

    it('should NOT save the item', () => {
        return Item.findOne({'name':itemName}).then(item => {
            console.log('here. item', item)
            expect(item).to.be.null
        })
    })
  })

  

//   context('when a user has bookmarks, but not the one we want to delete', () => {
//     let bookmark, firstResult, secondResult

//     beforeEach(() => {
//       bookmark = bookmarkMother.createBookmark(userId)

//       return userBookmarkRepository.save(bookmark)
//         .then(() => userBookmarkRepository.get({where:{userId}}))
//         .then(b => firstResult = b)
//         .then(() => userBookmarkRepository.deleteBookmark(userId, uuid.v4()))
//         .then(() => userBookmarkRepository.get({where:{userId}}))
//         .then(b => secondResult = b)
//     })

//     afterEach(() => {
//       return domainHelper.deleteAllBookmarksForUser(userId)
//     })

//     it('should not delete the existing user bookmark', () => {
//       expect(firstResult).to.eql(bookmark)
//       expect(secondResult).to.eql(bookmark)
//     })
//   })

//   context('when a user has no bookmarks', () => {
//     it('should not throw when attempting to delete', () => {
//       return expect(userBookmarkRepository.deleteBookmark(userId, uuid.v4())).to.be.fulfilled
//     })
//   })

//   context('when the bookmark does not belong to the user', () => {
//     let bookmark, firstResult, secondResult, otherUserId

//     beforeEach(() => {
//       otherUserId = uuid.v4()
//       bookmark = bookmarkMother.createBookmark(otherUserId)

//       return userBookmarkRepository.save(bookmark)
//         .then(() => userBookmarkRepository.get({where:{userId: otherUserId}}))
//         .then(b => firstResult = b)
//         .then(() => userBookmarkRepository.deleteBookmark(uuid.v4(), bookmark.bookmarkId))
//         .then(() => userBookmarkRepository.get({where:{userId: otherUserId}}))
//         .then(b => secondResult = b)
//     })

//     afterEach(() => {
//       return domainHelper.deleteAllBookmarksForUser(otherUserId)
//     })

//     it('should NOT delete the other user\'s bookmark', () => {
//       expect(firstResult).to.eql(bookmark)
//       expect(secondResult).to.eql(bookmark)
//     })
//   })

})