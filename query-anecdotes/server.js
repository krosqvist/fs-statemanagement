import jsonServer from 'json-server'

const server = jsonServer.create()

const dbFile = process.env.DB_FILE || 'db.json'
const router = jsonServer.router(dbFile)

const middlewares = jsonServer.defaults()

const validator = (request, response, next) => {
  const { content } = request.body

  if (request.method === 'POST' && (!content || content.length < 5)) {
    return response.status(400).json({
      error: 'too short anecdote, must have length 5 or more',
    })
  }

  next()
}

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(validator)
server.use(router)

server.listen(3001, () => {
  console.log(`JSON Server is running using ${dbFile}`)
})