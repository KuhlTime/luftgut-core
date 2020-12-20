// https://stackoverflow.com/a/51981393/4179020

export default function (middleware, ...paths) {
  return function (req, res, next) {
    const pathCheck = paths.some(path => path === req.path)
    pathCheck ? next() : middleware(req, res, next)
  }
}
