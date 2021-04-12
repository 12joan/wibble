import React from 'react'
import { ThreeDotsVertical, ArrowUpSquareFill } from 'react-bootstrap-icons'

const RollLogFooterNotationTextBox = props => (
  <div className="border rounded d-flex">
    <div className="align-self-stretch border-end my-2 px-2 dropup">
      <button
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
      <button className="send-button">
        <ArrowUpSquareFill size="1.5em" />
      </button>
    </div>
  </div>
)

export default RollLogFooterNotationTextBox
