import React from 'react'
import RollLogHeader from 'components/RollLogHeader'
import RollLog from 'components/RollLog'
import RollLogFooter from 'components/RollLogFooter'

const Application = props => (
  <div className="vh-100 d-flex flex-column">
    <RollLogHeader />
    <RollLog roomId={props.roomId} />
    <RollLogFooter />
  </div>
)

export default Application
