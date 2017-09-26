'use strict'

const uuid = require('uuid')
const toDoListRepository = require('./repository')
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
      .then(() => toDoListRepository.getList(userId))
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
        expect(savedList.items[0].name).to.equal("New Item")
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