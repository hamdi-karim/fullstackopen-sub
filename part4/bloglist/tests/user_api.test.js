const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)
const User = require("../models/user")

describe("when there is initially one user saved", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("password", 10)
    await new User({ username: "root", passwordHash }).save()
  })

  test("creating a new user succeeds", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "thekhgdwb95dd",
      name: "Karim Hamdi",
      password: "password",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((user) => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test("creation fails if username is missing", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: "testUser",
      password: "password",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("username is required")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test("creation fails if password is missing", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "thekhgdwb",
      name: "karim",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("password is required")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test("creation fails if username is shorter than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "kk",
      name: "karim",
      password: "khgdwb95",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("username must contain a minimum of 3 charchters")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test("creation fails if password is shorter than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "thekhgdwbffffdsq",
      name: "Karim",
      password: "pa",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain(
      "password must contain a minimum of 3 charchters"
    )

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username already exists', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'khgdwb95',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

  

afterAll(() => {
  mongoose.connection.close()
})