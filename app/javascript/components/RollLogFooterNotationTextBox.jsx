import React from 'react'
import { ThreeDotsVertical, ArrowUpSquareFill } from 'react-bootstrap-icons'

const handleSubmit = (event, performRoll) => {
  const { target } = event
  event.preventDefault()

  const rawNotation = target.querySelector('input[type=text]').value
  const [, name] = rawNotation.match(/"(.*)"/) || ["no match", null]
  const notation = rawNotation.replaceAll(/".*"/g, "").trim()

  performRoll({
    name,
    notation,
  })

  target.reset()
}

const RollLogFooterNotationTextBox = props => (
  <form className="border rounded d-flex" onSubmit={e => handleSubmit(e, props.eventDelegate.performRoll)}>
    <div className="align-self-stretch border-end my-2 px-2 dropup">
      <button
        type="button"
        className="three-dots-dropup-button"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        <ThreeDotsVertical />
      </button>

      <ul className="dropdown-menu">
        <li><span className="dropdown-header">Don't click the link below</span></li>
        <li><a className="dropdown-item" href="#">Hello world!</a></li>
      </ul>
    </div>

    <input
      type="text"
      className="form-control form-control-lg border-0 bg-transparent rounded-0"
      placeholder="Dice notation" />

    <div className="align-self-stretch my-2 px-2">
      <button type="submit" className="send-button">
        <ArrowUpSquareFill size="1.5em" />
      </button>
    </div>
  </form>
)

export default RollLogFooterNotationTextBox
