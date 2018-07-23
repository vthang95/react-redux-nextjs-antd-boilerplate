const next = require("next")
const { parse } = require("url")
const { app, handle }= require("./server")

exports.handleNormalRequest = (req, res) => {
  const parsedUrl = parse(req.url, true)
  const { pathname, query } = parsedUrl

  return handle(req, res, parsedUrl)
}

exports.handleNextRequest = (req, res) => {
  const pathname = req.route.path
  const splittedPathname = pathname.split("/")
  const pathList = splittedPathname.filter(ele => ele.length > 0 && ele[0] !== ":")
  const path = "/".concat(pathList.join("/"))

  return app.render(req, res, path, req.params)
}
