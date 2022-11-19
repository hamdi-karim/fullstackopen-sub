import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import CreateForm from './CreateForm'

test('<CreateForm /> calls event handler once with approriate details', async () => {
  const createFormMock = jest.fn()
  const user = userEvent.setup()

  render(<CreateForm createBlog={createFormMock} />)

  const blogTitleInput = screen.getByPlaceholderText('blog title (required)')
  const blogAuthorInput = screen.getByPlaceholderText('blog author (required)')
  const blogUrlInput = screen.getByPlaceholderText('blog url (required)')

  const createFormButton = screen.getByText('Create')

  await user.type(blogTitleInput, 'test title')
  await user.type(blogAuthorInput, 'test author')
  await user.type(blogUrlInput, 'www.testcreateurl.com')

  await user.click(createFormButton)

  expect(createFormMock.mock.calls).toHaveLength(1)

  expect(createFormMock.mock.calls[0][0]).toBe('test title')
  expect(createFormMock.mock.calls[0][1]).toBe('test author')
  expect(createFormMock.mock.calls[0][2]).toBe('www.testcreateurl.com')
})