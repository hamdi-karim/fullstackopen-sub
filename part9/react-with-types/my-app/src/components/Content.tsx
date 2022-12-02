import { CoursePart } from '../types'
import Part from './Part'

const Content = ({parts}: {parts: CoursePart[]}) => {
  return (
    <>
        {parts.map((part, keyIndex) => 
            <div key={keyIndex} style={{ marginTop: "1rem" }}>
              <b>{part.name} {part.exerciseCount}</b>
              <Part part={part} />
            </div>
        )}
    </>
  )
}

export default Content