import express from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
const client = new PrismaClient()

const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.post('/user', async (req, res) => {
  const { name, email, password } = req.body
  const result = await client.userAccount.create({
    data: {
      name,
      email,
      password
    },
  })

  res.status(201).json(result)
})

app.get('/user', async (req, res) => {
  const result = await client.userAccount.findMany()
  res.status(200).json(result)
})

// create garden
app.post('/garden', async (req, res) => {
  const { gardenName, ownerId } = req.body
  const result = await client.garden.create({
    data: {
      name: gardenName,
      owner: {
        connect: {
          id: ownerId
        }
      }
    }
  })

  res.status(201).json(result)
})

app.get('/garden', async (req, res) => {
  const result = await client.garden.findMany()
  res.status(200).json(result)
})

// create plant
app.post('/plant', async (req, res) => {
  const { plantId, gardenId } = req.body
  const result = await client.plant.create({
    data: {
      plantId,
      garden: {
        connect: {
          id: gardenId
        }
      }
    }
  })

  res.status(201).json(result)
})

// get plant by garden
app.get('/plant/:gardenId', async (req, res) => {
  const { gardenId } = req.params
  const result = await client.plant.findMany({
    where: {
      gardenId: gardenId
    }
  })

  res.status(200).json(result)
})


const server = app.listen(process.env.PORT || 8092, () =>
  console.log(`
🚀 Server ready at: http://localhost:8092
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)
