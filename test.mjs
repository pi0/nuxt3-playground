import { handler } from './.netlify/functions-internal/server/server.mjs'
import serveStatic from 'serve-static'
import { createServer } from 'http'

const serve = serveStatic('./dist')

const server = createServer(async (req, res) => {
  if (req.url.startsWith('/_nuxt')) {
    return serve(req, res)
  }
  const r = await handler({
    path: req.url,
    headers: {}
  })
  res.statusCode = r.statusCode
  for (const n in r.headers) {
    res.setHeader(n, r.headers[n])
  }
  res.end(r.body)
})

server.listen(3000)

