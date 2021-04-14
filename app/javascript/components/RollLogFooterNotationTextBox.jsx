import React from 'react'
import { ThreeDotsVertical, ArrowUpSquareFill } from 'react-bootstrap-icons'
import RollMenu from 'components/RollMenu'

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
        data-bs-reference="parent"
        data-bs-offset="0,8"
        aria-expanded="false">
        <ThreeDotsVertical className="bi" />
      </button>

      <RollMenu eventDelegate={props.eventDelegate} width="calc(768px - 300px - 2em)" />
    </div>

    <input
      type="text"
      className="form-control form-control-lg border-0 bg-transparent rounded-0"
      placeholder="Dice notation" />

    <div className="align-self-stretch my-2 px-2">
      <button type="submit" className="send-button">
        <ArrowUpSquareFill className="bi" size="1.5em" />
      </button>
    </div>
  </form>
)

export default RollLogFooterNotationTextBox
