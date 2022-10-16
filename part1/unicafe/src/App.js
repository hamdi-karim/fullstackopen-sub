import { useState } from 'react'

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  const avg = (good - bad) / all;
  const positive = good * 100 / all + " %";

  if (all === 0) {
    return <p>No feedback given</p>
  }

  return (
    <>
      <StatisticRow text="good" value={good} />
      <StatisticRow text="neutral" value={neutral} />
      <StatisticRow text="bad" value={bad} />
      <StatisticRow text="all" value={all} />
      <StatisticRow text="average" value={avg} />
      <StatisticRow text="positive" value={positive} />
    </>
  )
}

const StatisticRow = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1);
  }

  const handleBadClick = () => {
    setBad(bad+1);
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />

      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App