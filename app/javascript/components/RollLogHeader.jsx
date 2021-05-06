import React from 'react'
import { List as Burger } from 'react-bootstrap-icons'
import RollLogHeaderPostingAs from 'components/RollLogHeaderPostingAs'
import RoomMenu from 'components/RoomMenu'

const RollLogHeader = props => (
  <div className="border-bottom p-3">
    <div className="row justify-content-between align-items-center">
      <div className="col-auto">
        <RollLogHeaderPostingAs eventDelegate={props.eventDelegate} />
      </div>

      <div className="col-auto">
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
