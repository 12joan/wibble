import React from 'react'
import { List as Burger } from 'react-bootstrap-icons'
import RollLogHeaderPostingAs from 'components/RollLogHeaderPostingAs'

const RollLogHeader = props => (
  <div className="border-bottom p-3">
    <div className="row justify-content-between align-items-center">
      <div className="col-auto">
        <RollLogHeaderPostingAs eventDelegate={props.eventDelegate} />
      </div>

      <div className="col-auto">
        <Burger className="bi" size="1.5em" />
      </div>
    </div>
  </div>
)

export default RollLogHeader
