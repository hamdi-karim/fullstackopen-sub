const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const maxReduce = (maxObject, item) => 
    maxObject.likes > item.likes ? 
      maxObject : 
        {
          author: item.author,
          title: item.title,
          likes: item.likes
        } 

  return blogs.length === 0 ?
    {} :
    blogs.reduce(maxReduce, {likes: 0}) 
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog
}