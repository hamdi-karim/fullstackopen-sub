import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('Should render blog title & author and NOT url & likes', () => {
  const blog = {
    title: 'testBlog title',
    author: 'testBlog author',
    likes: 81,
    url: 'www.testing.com'
  }

  const container = render(<Blog blog={blog} />)

  screen.getByText(blog.title)
  screen.getByText(blog.author)

  const url = container.queryByText(blog.url)
  expect(url).not.toBeInTheDocument()

  const likes = container.queryByText(blog.likes)
  expect(likes).not.toBeInTheDocument()
})