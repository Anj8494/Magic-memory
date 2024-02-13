import './SingleCard.css'
export default function SingleCard ({card, handleChoice, flipped, disabled})
{
    const handleClick =()=>
    {
        if(!disabled)
        {
            handleChoice(card)
        }
    }

    return (
        <div class="card" >
            <div class={flipped ?  "flipped" : ""}>
              <img class="front" src={card.src} alt="card front"/>
              <img class="back" 
                src="/image/cover.png" 
                onClick={handleClick}
                alt="card back"/>
             </div>
          </div>
    )
}