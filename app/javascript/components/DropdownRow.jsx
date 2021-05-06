import React from 'react'

const DropdownRow = props => {
  const { icon, text, subtext, editButton, ...otherProps } = props

  return (
    <li>
      <div className="dropdown-item d-flex" role="button" {...otherProps}>
        <span className="mx-1">{icon}</span>
        <span className="mx-1 flex-grow-1 text-wrap">{text}</span>
        <span className="mx-1 text-muted">{subtext}</span>
        <span className="mx-1">{editButton}</span>
      </div>
    </li>
  )
}

DropdownRow.defaultProps = {
  subtext: '',
  editButton: <></>,
  onClick: () => {},
}

export default DropdownRow
