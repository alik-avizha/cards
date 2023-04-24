import './App.css'
import {useState} from "react";

function App() {

    const [cardList, setCardList] = useState([
        {id: 1, order: 1, text: '1', color: "red"},
        {id: 2, order: 2, text: '2', color: "blue"},
        {id: 3, order: 3, text: '3', color: "green"},
        {id: 4, order: 4, text: '4', color: "orange"},
    ])

    const [currentCard, setCurrentCard] = useState(null)

    const dragStartHandler = (e, card) => {
        console.log('drag', card)
        setCurrentCard(card)
       // e.target.style.background = 'red'
    }
    const dragEndHandler = (e) => {
       // e.target.style.background = 'white'
    }
    const dragOverHandler = (e) => {
        e.preventDefault()
        //e.target.style.background = 'red'
    }
    const dropHandler = (e, card) => {
        console.log('drop', card)
        e.preventDefault()
        setCardList(cardList.map(c => {
            if (c.id === card.id) {
                return {...c, order: currentCard.order}
            }
            if (c.id === currentCard.id) {
                return {...c, order: card.order}
            }
            return c
        }))
    }

    const sortedCards = (a, b) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    return (
        <div className="App">
            {
                cardList.sort(sortedCards).map(card => {
                    return (
                        <div className='card'
                             draggable={true}
                             onDragStart={(e) => dragStartHandler(e, card)}
                             onDragLeave={(e) => dragEndHandler(e)}
                             onDragEnd={(e) => dragEndHandler(e)}
                             onDragOver={(e) => dragOverHandler(e)}
                             onDrop={(e) => dropHandler(e, card)}
                             style={{backgroundColor: `${card.color}`}}
                        >
                            {card.text}
                        </div>
                    )
                })}
        < /div>
    )
}

export default App
