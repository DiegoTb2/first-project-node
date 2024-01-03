
/* -Query params => MediaQueryListEvent.com/users?name=diego&age=27 FILTROS
-Route params => /users/2 BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
- Request Body => {"name":"Diego", "age":}

-GET -> Buscar informação do back-end
-POST => Criar informação no back-end
-PUT / PATCH = Alternar/Atualizar informação no back end 
-DELETE -> Deletar informação no back-end

middleware => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição

nodemon -> serve pra atualizar a rota automaticamente / executar: npm run dev*/

const express = require('express')
const uuid = require('uuid') 
const port = 3000 //porta do site
const app = express()
app.use(express.json()) // indica que vamos usar o padrão JSON 

const users = []

const checkUserId = (request, response, next) => {
  const { id } = request.params
  const index = users.findIndex(user => user.id === id)

  if (index < 0) {
    return response.status(404).json({ message: "User not found" })
  }
  request.userIndex = index
  request.userId = id

  next()
}

app.get('/users', (request, response) => {
  return response.json(users)
})

app.post('/users', (request, response) => {

  const { name, age } = request.body

  const user = { id: uuid.v4(), name, age }

  users.push(user)
  return response.status(201).json(user)
})

app.listen(port, () => {
  console.log(`🚀Server started on port ${port}`)
})

app.put('/users/:id',checkUserId, (request, response) => {

  const { name, age } = request.body
  const index = request.userIndex
  const id = request.userId
  const updatedUser = { id, name, age }


  users[index] = updatedUser
  return response.json(updatedUser)
})

app.delete('/users/:id',checkUserId, (request, response) => {
  const index = request.userIndex

  users.splice(index, 1)
  return response.status(204).json()
}) 



