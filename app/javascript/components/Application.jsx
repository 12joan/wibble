import React from 'react'
import RollLog from 'components/RollLog'

const Application = props => (
  <div className="vh-100 d-flex flex-column">
    <div className="border-bottom p-3">
      top bar
    </div>

    <RollLog roomId={props.roomId} />

    <div className="border-top p-3">
      bottom bar
    </div>
  </div>
)

export default Application
