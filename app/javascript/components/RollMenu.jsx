import React from 'react'
import { ArrowCounterclockwise, HeartFill, PencilSquare, BoxArrowUpRight } from 'react-bootstrap-icons'
import SkipLink from 'components/SkipLink'
import DropdownRow from 'components/DropdownRow'

const RollRow = props => {
  const { roll, eventDelegate, ...otherProps } = props

  return (
    <DropdownRow
      text={roll.name === null ? roll.notation : roll.name}
      subtext={roll.name === null ? '' : roll.notation}
      onClick={() => eventDelegate.performRoll(roll, false)}
      {...otherProps} />
  )
}

const RollMenu = props => {
  const recentRolls = props.eventDelegate.getUserPreference('recentRolls')
  const favouriteRolls = props.eventDelegate.getUserPreference('favouriteRolls')

  return (
    <div className={`dropdown-menu ${props.className}`} style={{ width: props.width, maxWidth: '100vw' }}>
      {
        recentRolls.length > 0 && (
          <div
            role="group"
            aria-label="Recent rolls">
            {
              props.inSidebar && (
                <SkipLink
                  linkId="top-of-recent-rolls"
                  linkText="Skip to most recent"
                  target="#bottom-of-recent-rolls" />
              )
            }

            {
              recentRolls.map((roll, i) => (
                <RollRow
                  key={i}
                  roll={roll}
                  eventDelegate={props.eventDelegate}
                  icon={<ArrowCounterclockwise className="bi text-secondary" />} />
              ))
            }

            {
              props.inSidebar && (
                <SkipLink
                  linkId="bottom-of-recent-rolls"
                  linkText="Skip to oldest"
                  target="#top-of-recent-rolls" />
              )
            }

            <hr className="dropdown-divider" />
          </div>
        )
      }

      {
        favouriteRolls.length > 0 && (
          <div
            role="group"
            aria-label="Favourite rolls">
            {
              favouriteRolls.map((rollData, i) => (
                <RollRow
                  key={i}
                  roll={rollData.roll}
                  eventDelegate={props.eventDelegate}
                  icon={<HeartFill className="bi text-success" />}
                  editButton={
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={event => {
                        event.stopPropagation()
                        props.eventDelegate.showRollModal(rollData, i)
                      }}>
                      <PencilSquare className="bi" />
                    </button>
                  } />
              ))
            }

            <hr className="dropdown-divider" />
          </div>
        )
      }

      <DropdownRow
        icon={<BoxArrowUpRight className="bi" />}
        text="Custom dice roll"
        onClick={props.eventDelegate.showRollModal} />
    </div>
  )
}

RollMenu.defaultProps = {
  className: '',
}

export default RollMenu
