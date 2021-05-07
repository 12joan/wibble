import React from 'react'
import ReactDOM from 'react-dom'
import JoinGameUI from 'components/JoinGameUI'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <JoinGameUI />,
    document.querySelector('#join-game'),
  )
})
