import React from 'react'
import '../style/card.css'
import { Navigate } from 'react-router-dom'

const Card = (props) => {

  const routeChange = () =>{
    let path = `/product`;
    return <Navigate to={path} />
  }
    return (
        <>
         <div className="card" onClick={routeChange}>
            <h1>{props.title}</h1>
          <img src={props.img} />
            <p>{props.desc}</p>
          </div>
        
        </>
    )
}

export default Card