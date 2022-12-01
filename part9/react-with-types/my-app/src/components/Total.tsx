interface TotalProps {
    nbrOfExercices: number
}

const Total = (props: TotalProps) => {
  return (
    <p>
        Number of exercises{" "}
        {props.nbrOfExercices}
    </p>
  )
}

export default Total