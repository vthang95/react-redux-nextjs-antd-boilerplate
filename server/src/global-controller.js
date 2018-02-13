const next = require("next")
const { parse } = require("url")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

exports.handleNormalRequest = (req, res) => {
  const parsedUrl = parse(req.url, true)
  const { pathname, query } = parsedUrl
  if (dev) {
    const handleDev = req.app.getRequestHandler()
    return handleDev(req, res, parsedUrl)
  }
  return handle(req, res, parsedUrl)
}

exports.handleNextRequest = (req, res) => {
  const pathname = req.route.path
  const splittedPathname = pathname.split("/")
  const pathList = splittedPathname.filter(ele => ele.length > 0 && ele[0] !== ":")
  const path = "/".concat(pathList.join("/"))

  if (dev) return req.app.render(req, res, path, req.params)
  return app.render(req, res, path, req.params)
}