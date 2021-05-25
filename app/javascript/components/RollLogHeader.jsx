import React from 'react'
import { List as Burger } from 'react-bootstrap-icons'
import RollLogHeaderPostingAs from 'components/RollLogHeaderPostingAs'
import RoomMenu from 'components/RoomMenu'

const RollLogHeader = props => (
  <div className="border-bottom p-3">
    <div className="d-flex align-items-center mx-n2">
      <div className="flex-grow-1 mx-1">
        <RollLogHeaderPostingAs eventDelegate={props.eventDelegate} />
      </div>

      <div className="mx-1">
        <button
          type="button"
          className="burger-dropdown-button"
          data-bs-toggle="dropdown"
          data-bs-reference="parent"
          aria-expanded="false">
          <Burger className="bi align-middle" size="1.5em" />
        </button>

        <RoomMenu eventDelegate={props.eventDelegate} roomId={props.roomId} />
      </div>
    </div>
  </div>
)

export default RollLogHeader
