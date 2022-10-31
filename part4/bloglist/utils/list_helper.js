const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  const reducer = (sum, item) => sum + item.likes

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {

  if (blogs.length === 0) {
    return {}
  }

  const maxReduce = (maxObject, item) => 
    maxObject.likes > item.likes ? 
      maxObject : 
        {
          author: item.author,
          title: item.title,
          likes: item.likes
        } 

  return blogs.reduce(maxReduce, {likes: 0}) 
}

const mostBlogs = (blogs) => {

  if (blogs.length === 0) {
    return {}
  }

  if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      blogs: 1
    }
  }

  const groupByAuthorReduce = (authorsObject, blogItem) => {
    if (authorsObject[blogItem.author]) {
        authorsObject[blogItem.author].blogs ++
    } else {
      authorsObject[blogItem.author] = {}
      authorsObject[blogItem.author].author = blogItem.author
      authorsObject[blogItem.author].blogs = 1
    }
    return authorsObject
  }

  const mostBlogsAuthorReduce = (authObj, item) => {
    if (Object.keys(authObj).length === 0 || item.blogs > authObj.blogs) {
      authObj.author = item.author
      authObj.blogs = item.blogs
    }
    return authObj
  }

  return (
    Object.values(blogs.reduce(groupByAuthorReduce, {}))
      .reduce(mostBlogsAuthorReduce, {})
  )
}

const mostLikes = (blogs) => {

  if (blogs.length === 0) {
    return {}
  }

  if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      likes: blogs[0].likes
    }
  }

  const groupByAuthorReduce = (authorsObject, blogItem) => {
    if (authorsObject[blogItem.author]) {
      authorsObject[blogItem.author].likes += blogItem.likes
    } else {
      authorsObject[blogItem.author] = {}
      authorsObject[blogItem.author].author = blogItem.author
      authorsObject[blogItem.author].likes = blogItem.likes
    }
    return authorsObject
  }

  const mostLikesAuthorReduce = (authObj, item) => {
    if (Object.keys(authObj).length === 0 || item.likes > authObj.likes) {
      authObj.author = item.author
      authObj.likes = item.likes
    }
    return authObj
  }

  return (
    Object.values(blogs.reduce(groupByAuthorReduce, {}))
      .reduce(mostLikesAuthorReduce, {})
  )
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}