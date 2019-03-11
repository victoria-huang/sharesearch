import React from 'react'

const Welcome = (props) => {
    return (
        <>
        <h1>sharesearch</h1>
        <button onClick={ () => props.history.push('/login') }>login</button>
        <button onClick={ () => props.history.push('/signup') }>signup</button>
        </>
    )
}

export default Welcome