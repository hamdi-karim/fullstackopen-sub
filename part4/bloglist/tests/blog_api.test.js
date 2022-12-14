const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const helper = require('./test_helper')
const app = require('../app')
const config = require("../utils/config")

const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is intially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const blogsResult = await api.get('/api/blogs')
  
    expect(blogsResult.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique blogs identifiers are called id instead of _id', async () => {
    const blogsResult = await api.get('/api/blogs')
  
    const ids = blogsResult.body.map(blog => blog.id)
  
    for (const id of ids) {
      expect(id).toBeDefined()
    }
  })
})


describe('addition of new blogs', () => {
  let token = null
  beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("khgdwb95", 10)
    const user = await new User({ username: "root", passwordHash }).save()

    const userForToken = { username: "root", id: user.id }
    return (token = jwt.sign(userForToken, config.SECRET))
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      "author": "KarimTest2",
      "title": "repo of codes",
      "url": "https://github.com/fullstack-hy2020/part3-notes-backend/tree/part4-1",
      "likes": 27
    }
  
    await api 
      .post('/api/blogs')
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const finalBlogsResult = await helper.blogsInDb()
    expect(finalBlogsResult).toHaveLength(helper.initialBlogs.length + 1)
  
    const titles = finalBlogsResult.map(blog => blog.title)
    expect(titles).toContain('repo of codes')
  })

  test('when likes is missing from the request it defaults to 0', async () => {
    const newBlog = {
      "author": "KarimTest4.11",
      "title": "space power",
      "url": "https://github.com/fullstack-hy2020/part3-notes-backend/tree/part4-10"
    }
  
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const finalBlogsResult = await helper.blogsInDb()
    expect(finalBlogsResult).toHaveLength(helper.initialBlogs.length + 1)
  
    const addedBlogLikes = finalBlogsResult[finalBlogsResult.length - 1].likes
    expect(addedBlogLikes).toBe(0)
  })

  test("when url/title is missing server returns bad request", async () => {
    const newBlog = {
      "author": "KarimTest4.12"
    }

    await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
    
    const finalBlogsResult = await helper.blogsInDb()
    expect(finalBlogsResult).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deleting a blog', () => {
  let token = null

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("kh50027881", 10)
    const user = await new User({ username: "testRoot", passwordHash }).save()

    const userForToken = { username: "testRoot", id: user.id }
    token = jwt.sign(userForToken, config.SECRET)

    const newBlog = {
      title: "test delete blog",
      author: "karim",
      url: "https://www.thekarimhamdi.com",
    }

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    return token
  })

  test('succeeds with 204 if id is valid', async () => {
    const blogsAtStart =  await Blog.find({}).populate("user")
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204)
    
    const blogsAtEnd = await Blog.find({}).populate("user")

    expect(blogsAtEnd).toHaveLength(
      blogsAtStart.length - 1
    )

    const titles = blogsAtEnd.map(res => res.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test("returns 401 if it is a bad request", async () => {
    const blogsAtStart = await Blog.find({}).populate("user")
    const blogToDelete = blogsAtStart[0]

    token = "vdvddvxwxwxwcxwcxwcx"

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(401)

    const blogsAtEnd = await Blog.find({}).populate("user")

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(blogsAtStart).toEqual(blogsAtEnd)
  })
})


describe('updating a blog', () => {
  test('succeeds with a 200 status if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 36 })
      .expect(200)
    
    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )
    expect(updatedBlog.likes).toBe(36)
  })
})



afterAll(() => {
  mongoose.connection.close()
})