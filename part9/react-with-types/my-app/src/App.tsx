import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

import { CoursePart } from './types'

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      type: "groupProject",
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      type: "submission",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest", "ExpressJS"],
      type: "special"
    }
  ]

  const nbrOfExercices = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName} />

      <Content parts={courseParts} />

      <Total nbrOfExercices={nbrOfExercices} />
    </div>
  );
};

export default App;