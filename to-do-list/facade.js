'use strict'

// const uuid = require('uuid')

// const logger = require('../utils/logger')
// const config = require('../config')
// const toDoListVmBuilder = require('./vm-builder')
const toDoListRepository = require('./repository')

module.exports = {
  getDefaultToDoList(userId) {
    var defaultList
    return toDoListRepository.getList(userId).then((data) => { 
      console.log('data', data) 
      defaultList = data
      console.log('defaultList', defaultList)
      return defaultList
    })
    
    
    // return Promise.resolve([{name: "Item One", id: 1, complete: false, completedAt: null}, {name: "Item Two", id: 2, complete: false, completedAt: null}, {name: "Item Three", id: 3, complete: true, completedAt: '2017-07-06T16:43:41Z'}]);
    // return toDoListRepository.getAll({where: {userId}})
    //   .then(bookmarks => {
    //     const uniqueCourseIds = R.uniq(bookmarks.map(b => b.oldCourseId))
    //     return courseRepository.getAll({where: {id: uniqueCourseIds}})
    //       .then(courses => {
    //         if (courses.length !== uniqueCourseIds.length) {
    //           const notFoundIds = R.difference(uniqueCourseIds, courses.map(c => c.id))
    //           logger.warn(`Failed to find courses for bookmarks with the following course ids: ["${notFoundIds.join('", "')}"]`)
    //           bookmarks = bookmarks.filter(b => !notFoundIds.includes(b.oldCourseId))
    //         }

    //         const sortedBookmarkVms = R.compose(R.reverse, R.sortBy(R.prop('createdAt')))(bookmarksVmBuilder.buildBookmarkVms(bookmarks, courses))
    //         return {collection: sortedBookmarkVms}
    //       })
    //   })
  },

  removeBookmark(userId, bookmarkId) {
    return bookmarkRepository.deleteBookmark(userId, bookmarkId)
  },

  createBookmark(userId, bookmark) {
    const bookmarkId = uuid.v4()
    return bookmarkRepository.save(Object.assign({}, bookmark, {bookmarkId, userId}))
  }
}