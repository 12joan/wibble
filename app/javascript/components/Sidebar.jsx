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

  const positionClasses = {
    left: 'order-first border-end',
    right: 'order-last border-start',
  }[sidebarPosition]

  return (
    <div
      className={`flex-shrink-0 ${appearanceClasses} ${positionClasses}`}
      style={{ flexBasis: `${sidebarWidth}px` }}
      role="complementary"
      aria-label="Sidebar">
      <div className="h-100 d-flex overflow-scroll flex-column flex-column-reverse">
        <RollMenu
          eventDelegate={props.eventDelegate}
          width={`${sidebarWidth}px`}
          className="show position-static border-0"
          inSidebar />
      </div>
    </div>
  )
}

export default Sidebar
