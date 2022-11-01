const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs)
});


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

afterAll(() => {
  mongoose.connection.close()
})