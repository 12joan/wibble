import React from 'react'
import RollLog from 'components/RollLog'
import RollLogFooter from 'components/RollLogFooter'

const Application = props => (
  <div className="vh-100 d-flex flex-column">
    <div className="border-bottom p-3">
      top bar
    </div>

    <RollLog roomId={props.roomId} />

    <RollLogFooter />
  </div>
)

export default Application
