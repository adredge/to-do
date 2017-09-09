"use strict"

module.exports = function wrapRouteHandler(fn) {
  return function wrappedRouteHandler(req, res, next) {
    fn(req, res).catch(next)
  }
}