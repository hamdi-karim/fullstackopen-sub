import { CoursePart } from '../types'

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const Part = ({part}: {part: CoursePart}) => {
  switch (part.type) {
    case "normal":
        return <div> {part.description} </div>  
    case "groupProject":
        return <div> Project exercices - {part.groupProjectCount} </div>  
    case "submission":
        return (
            <div>
                <div> {part.description} </div>
                <div> Submit to - {part.exerciseSubmissionLink} </div>
            </div>
        ) 
    case "special":
        return (
            <div>
                <div> {part.description} </div>
                <div> 
                    Skills required : 
                    {part.requirements.map((skill, skillIndex) => <span key={skillIndex}> {skill} </span>)}
                </div>
            </div>
        )
    default:
        return assertNever(part)
  }
}

export default Part