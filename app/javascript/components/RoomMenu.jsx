import React from 'react'
import { GearFill } from 'react-bootstrap-icons'
import DropdownRow from 'components/DropdownRow'

const copyToClipboard = data => {
  const input = document.createElement('input')
  input.value = data
  document.body.appendChild(input)
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
}

const RoomMenu = props => (
  <ul className="dropdown-menu">
    <DropdownRow
      icon={<GearFill className="bi" />}
      text="User preferences"
      onClick={props.eventDelegate.showPreferencesModal} />

    <li><hr className="dropdown-divider" /></li>

    <li>
      <h6 className="dropdown-header">
        <span className="fw-normal">Room ID</span> <span className="font-monospace">{props.roomId}</span>
      </h6>
    </li>

    <div className="px-3 py-2 d-grid gap-2">
      <button
        className="btn btn-dark px-5"
        onClick={() => copyToClipboard(window.location.href)}>
        Copy join link
      </button>

      <a href="/" className="btn btn-danger px-5">Leave room</a>
    </div>
  </ul>
)

export default RoomMenu
