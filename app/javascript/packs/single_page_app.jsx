import React from 'react'
import ReactDOM from 'react-dom'
import Application from 'components/Application'

document.addEventListener('DOMContentLoaded', () => {
  const applicationEl = document.querySelector('#application')

  ReactDOM.render(
    <Application {...applicationEl.dataset} />,
    applicationEl,
  )
})
