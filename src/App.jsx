import React from 'react'
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"
import './App.css'
import Die from './Die'

function App() {

  const [dice, setDice] = React.useState(allNewDice())

  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value == firstValue)

    if (allHeld && allSameValue) {
      setTenzies(true)
    }

  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  // console.log(dice)

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDice(id) {
    console.log(id)
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }

  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

  return (
    <main>
      {tenzies && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <div className="text">
        <h1 className="title">Tenzies</h1>
        <p className="guide">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className="main">
        {diceElements}
      </div>
      <button className="roll" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
