import React from 'react'

const DropdownRow = props => {
  const { icon, text, subtext, editButton, ...otherProps } = props

  return (
    <li>
      <button className="dropdown-item d-flex" {...otherProps}>
        <span className="mx-1">{icon}</span>

        <div className="mx-1 flex-grow-1">
          <div className="text-wrap">{text}</div>
          <div className="text-wrap text-muted">{subtext}</div>
        </div>

        <span className="mx-1">{editButton}</span>
      </button>
    </li>
  )
}

DropdownRow.defaultProps = {
  subtext: '',
  editButton: <></>,
  onClick: () => {},
}

export default DropdownRow
