import React from 'react'
import { ArrowCounterclockwise, HeartFill, PencilSquare, BoxArrowUpRight } from 'react-bootstrap-icons'

const Row = props => {
  const { icon, text, subtext, editButton, ...otherProps } = props

  return (
    <li>
      <button type="button" className="dropdown-item d-flex" {...otherProps}>
        <span className="mx-1">{icon}</span>
        <span className="mx-1 flex-grow-1 text-wrap">{text}</span>
        <span className="mx-1 text-muted">{subtext}</span>
        <span className="mx-1">{editButton}</span>
      </button>
    </li>
  )
}

Row.defaultProps = {
  subtext: '',
  editButton: <></>,
  onClick: () => {},
}

const RollMenu = props => {
  const { recentRolls } = props.eventDelegate.getUserPreferences()

  return (
    <ul className={`dropdown-menu ${props.className}`} style={{ width: props.width, maxWidth: '100vw' }}>
      {
        recentRolls.map((roll, i) => (
          <Row
            key={i}
            icon={<ArrowCounterclockwise className="bi text-secondary" />}
            text={roll.name === null ? roll.notation : roll.name}
            subtext={roll.name === null ? '' : `(${roll.notation})`}
            onClick={() => props.eventDelegate.performRoll(roll, false)} />
        ))
      }

      {
        recentRolls.length > 0 && (
          <li><hr className="dropdown-divider" /></li>
        )
      }

      {
        [
        ['Dexterity save', '(1d20 + 5)'],
          ['Longsword attack', '(1d20 - 1)'],
          ['Longsword damage', '(1d8)'],
      ].map(([text, subtext], i) => (
        <Row
          key={i}
          icon={<HeartFill className="bi text-success" />}
          text={text}
          subtext={subtext}
          editButton={<PencilSquare className="bi text-primary" />}
          onClick={() => props.eventDelegate.performRoll({ name: null, notation: '1d4' })} />
      ))
      }

      <li><hr className="dropdown-divider" /></li>

      <Row
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
