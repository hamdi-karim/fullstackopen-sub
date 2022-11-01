const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

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

  test('when likes is missing from the request it defaults to 0', async () => {
    const newBlog = {
      "author": "KarimTest4.11",
      "title": "space power",
      "url": "https://github.com/fullstack-hy2020/part3-notes-backend/tree/part4-10"
    }
  
    await api
      .post("/api/blogs")
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
      "author": "KarimTest4.12",
      "url": "https://github.com/fullstack-hy2020/part3-notes-backend/tree/part4-10"
    }
  
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
  
    const finalBlogsResult = await helper.blogsInDb()
    expect(finalBlogsResult).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deleting a blog', () => {
  test('succeeds with 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(res => res.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})






afterAll(() => {
  mongoose.connection.close()
})