import "./SingleCard.css"

export default function SingleCard({card, handleChoice, flipped, disabled}){

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }


    return (
        <div className='card'>
            <div className={ flipped ? "flipped" : ""}>
            <img src={card.src} className='front' alt='Card Front'></img>
            <img 
                src='/img/cover.png' 
                className='back' 
                alt='Card Back'
                onClick={handleClick}
            ></img>
            </div>
        </div>
    )
}