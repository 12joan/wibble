import React from 'react'
import { ArrowCounterclockwise, HeartFill, PencilSquare, BoxArrowUpRight } from 'react-bootstrap-icons'
import DropdownRow from 'components/DropdownRow'

const RollRow = props => {
  const { roll, eventDelegate, ...otherProps } = props

  return (
    <DropdownRow
      text={roll.name === null ? roll.notation : roll.name}
      subtext={roll.name === null ? '' : `(${roll.notation})`}
      onClick={() => eventDelegate.performRoll(roll, false)}
      {...otherProps} />
  )
}

const RollMenu = props => {
  const recentRolls = props.eventDelegate.getUserPreference('recentRolls')
  const favouriteRolls = props.eventDelegate.getUserPreference('favouriteRolls')

  return (
    <ul className={`dropdown-menu ${props.className}`} style={{ width: props.width, maxWidth: '100vw' }}>
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
        recentRolls.length > 0 && (
          <li><hr className="dropdown-divider" /></li>
        )
      }

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

      {
        favouriteRolls.length > 0 && (
          <li><hr className="dropdown-divider" /></li>
        )
      }

      <DropdownRow
        icon={<BoxArrowUpRight className="bi" />}
        text="Custom dice roll"
        onClick={props.eventDelegate.showRollModal} />
    </ul>
  )
}

RollMenu.defaultProps = {
  className: '',
}

export default RollMenu
