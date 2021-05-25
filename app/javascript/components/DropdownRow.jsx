import React from 'react'

const DropdownRow = props => {
  const { icon, text, subtext, editButton, ...otherProps } = props

  return (
    <li>
      <div className="dropdown-item d-flex py-1 px-2">
        <button type="button" className="dropdown-item d-flex p-0" {...otherProps}>
          <span className="mx-1">{icon}</span>

          <div className="mx-1 flex-grow-1">
            <div className="text-wrap">{text}</div>
            <div className="text-wrap text-muted">{subtext}</div>
          </div>
        </button>

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
