import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/logo-c-1.png", matched: false},
  { "src": "/img/logo-c++-1.jpg", matched: false},
  { "src": "/img/logo-java-1.png", matched: false},
  { "src": "/img/logo-js-1.jpg", matched: false},
  { "src": "/img/logo-kotlin-1.png", matched: false},
  { "src": "/img/logo-php-1.png", matched: false},
  { "src": "/img/logo-python-1.png", matched: false},
  { "src": "/img/logo-ruby-1.png", matched: false},
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
    
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card) 
  }

  useEffect(() => {
    
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 700)
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, [])


  return (
    <div className="App">
        <h1> Programming Memory </h1> 
        <button onClick={shuffleCards} >New Game</button>

        <div className='card-grid'>
          {cards.map(card => (
            <SingleCard 
              key={card.id} 
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched }
              disabled={disabled}
            ></SingleCard>
          ))}
         </div>
         <p> Turns: {turns} </p>
    </div>
  );
}

export default App;