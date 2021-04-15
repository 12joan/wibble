import React from 'react'
import RollMenu from 'components/RollMenu'

const Sidebar = props => (
  <div className="flex-shrink-0 d-none d-md-block border-end" style={{ flexBasis: '300px' }}>
    <div className="h-100 d-flex overflow-scroll flex-column flex-column-reverse">
      <RollMenu eventDelegate={props.eventDelegate} width="300px" className="show position-static border-0" />
    </div>
  </div>
)

export default Sidebar
