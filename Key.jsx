import React from 'react'

export default function Key({keyStrock, handleClick}) {
  function sendKey(e){
    handleClick(e);
  }
  return <button className='key' onClick={sendKey}>{keyStrock}</button>
}
