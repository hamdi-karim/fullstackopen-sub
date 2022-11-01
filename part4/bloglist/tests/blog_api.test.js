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

test('a valid blog can be added', async () => {
  const newBlog = {
    "author": "KarimTest2",
    "title": "repo of codes",
    "url": "https://github.com/fullstack-hy2020/part3-notes-backend/tree/part4-1",
    "likes": 27
  }

  await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const finalBlogsResult = await helper.blogsInDb()
  expect(finalBlogsResult).toHaveLength(helper.initialBlogs.length + 1)

  const titles = finalBlogsResult.map(blog => blog.title)
  expect(titles).toContain('repo of codes')
})

afterAll(() => {
  mongoose.connection.close()
})