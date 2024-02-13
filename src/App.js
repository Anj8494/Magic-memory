import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './Components/SingleCard';

const cardImge = 
[
  {"src": "/image/helmet-1.png", matched: false},
  {"src": "/image/potion-1.png",matched: false},
  {"src": "/image/ring-1.png",matched: false},
  {"src": "/image/scroll-1.png",matched: false},
  {"src": "/image/shield-1.png",matched: false},
  {"src": "/image/sword-1.png",matched: false} 
];

function App() {
  const [cards,setCards] = useState([])
  const [turns,setTurns] = useState(0)
  const [choiceOne,setChoiceOne] = useState(null)
  const [choiceTwo,setChoiceTwo] = useState(null)
  const [disable,setDisable] = useState(false)


  const shuffleCards = () => 
  {
    const shuffledCards = [...cardImge, ...cardImge]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
      setChoiceOne(null)
      setChoiceTwo(null)
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice =(card) =>
  {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  useEffect(()=>
  {
    if(choiceOne && choiceTwo)
    {
      setDisable(true)
      if(choiceOne.src === choiceTwo.src)
      {
        setCards(prevCards =>
          {
            return prevCards.map(card =>
              {
                if(card.src === choiceOne.src)
                {
                  return {...card, matched: true}
                }
                else 
                {
                  return card
                }
              })
          })
        resetTurn()
      }
      else
      {
        setTimeout(()=> resetTurn(),1000)
      }
    }
  },[choiceOne, choiceTwo])

  const resetTurn =()=>
  {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns+1)
    setDisable(false)
  }

  useEffect(()=>
  {
    shuffleCards()
  },[])

  return (<div class="container">
    <div class="App">
      <h1 style={{color: "white",fontFamily: "cursive"}}>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div class="card-grid">
         {cards.map(card => (
          <SingleCard 
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disable}
          />
         ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  </div>  
  );
}

export default App;
