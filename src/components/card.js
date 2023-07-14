import React from 'react'
import '../style/card.css'

const Card = (props) => {
    return (
        <>
         <div className="card">
            <h1>{props.title}</h1>
          <img src={props.img} />
            <p>{props.desc}</p>
          </div>
        
        </>
    )
}

export default Card