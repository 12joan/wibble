import React from 'react'
import RollMenu from 'components/RollMenu'

const Sidebar = props => {
  const sidebarAppears = props.eventDelegate.getUserPreference('sidebarAppears')
  const sidebarWidth = props.eventDelegate.getUserPreference('sidebarWidth')
  const sidebarPosition = props.eventDelegate.getUserPreference('sidebarPosition')

  const appearanceClasses = {
    always: 'd-block',
    sometimes: 'd-none d-md-block',
    never: 'd-none',
  }[sidebarAppears]

  const borderClass = {
    left: 'border-end',
    right: 'border-start',
  }[sidebarPosition]

  return (
    <div className={`flex-shrink-0 ${appearanceClasses} ${borderClass}`} style={{ flexBasis: `${sidebarWidth}px` }}>
      <div className="h-100 d-flex overflow-scroll flex-column flex-column-reverse">
        <RollMenu eventDelegate={props.eventDelegate} width={`${sidebarWidth}px`} className="show position-static border-0" />
      </div>
    </div>
  )
}

export default Sidebar
