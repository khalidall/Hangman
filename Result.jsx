import React from 'react'

export default function Result({handleReplay, msg}) {
  return (
    <div className='result-component'>
        <h1>You {msg}</h1>
        <button onClick={handleReplay}>PLAY AGAIN</button>
    </div>
  )
}
