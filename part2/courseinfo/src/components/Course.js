import React from 'react'

import Header from './Header'
import Content from './Content'
import Total from './Total'

const Courses = ({ course }) => {
  const total = course.parts.reduce( (sum, p) => { 
    return sum + p.exercises
   }, 0 )

  return (
    <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total sum={total} />
    </>
  )
}

export default Courses