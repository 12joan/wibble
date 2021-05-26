import React from 'react'

const SkipLink = props => (
  <div className="visually-hidden-focusable">
    <a
      id={props.linkId}
      href={props.target}
      onClick={event => {
        event.preventDefault()
        document.querySelector(props.target).focus()
        console.log(document.querySelector(props.target))
      }}>
      {props.linkText}
    </a>
  </div>
)

export default SkipLink
