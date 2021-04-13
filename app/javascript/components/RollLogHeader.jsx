import React from 'react'
import { List } from 'react-bootstrap-icons'

const Burger = List

const RollLogHeader = props => (
  <div className="border-bottom p-3">
    <div className="row justify-content-between align-items-center">
      <div className="col-auto">
        <div className="text-muted">Posting as</div>
        <div className="text-primary">Alithaedriana</div>
      </div>

      <div className="col-auto">
        <Burger className="bi" size="1.5em" />
      </div>
    </div>
  </div>
)

export default RollLogHeader
