import React from 'react'
import Sidebar from 'components/Sidebar'
import RollLogHeader from 'components/RollLogHeader'
import RollLog from 'components/RollLog'
import RollLogFooter from 'components/RollLogFooter'

const Application = props => (
  <div className="row g-0">
    <Sidebar />

    <div className="col vh-100 d-flex flex-column">
      <RollLogHeader />
      <RollLog roomId={props.roomId} />
      <RollLogFooter />
    </div>
  </div>
)

export default Application
