import React from 'react'
import { useLongPress } from 'use-long-press'

const performDiceRoll = (count, dieType, performRoll) => (
  performRoll({
    name: null,
    notation: `${count}${dieType}`,
  })
)

let debounceClick = false

const DieButton = props => {
  const openDropupForButton = btn => btn.parentNode.querySelector('.dropdown-toggle').click()

  const bindLongPress = useLongPress(
    event => openDropupForButton(event.target),
    {
      captureEvent: true,
      onCancel: () => {
        if (!debounceClick) {
          debounceClick = true
          performDiceRoll(1, props.dieType, props.eventDelegate.performRoll)
          setTimeout(() => debounceClick = false, 50)
        }
      }
    },
  )

  return (
    <div className="col d-grid">
      <div className="btn-group dropup">
        <button
          type="button"
          className="btn btn-sm btn-dark"
          onClick={event => event.stopPropagation()}
          onContextMenu={event => {
            bindLongPress.onTouchEnd(event)
            event.preventDefault()
          }}
          {...bindLongPress}>
          {props.dieType}
        </button>

        <button
          type="button"
          className="btn btn-sm btn-dark dropdown-toggle dropdown-toggle-split flex-grow-0"
          data-bs-toggle="dropdown"
          data-bs-reference="parent"
          aria-expanded="false">
          <span className="visually-hidden">Toggle Dropup</span>
        </button>

        <ul className="dropdown-menu dropdown-menu-end" style={{ minWidth: 0 }}>
          {
            [8, 7, 6, 5, 4, 3, 2, 1].map(n => (
              <li key={n}>
                <button
                  className="dropdown-item"
                  onClick={() => performDiceRoll(n, props.dieType, props.eventDelegate.performRoll)}>
                  {n}{props.dieType}
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

const RollLogFooterDiceButtons = props => (
  <div className="row g-2 mb-2 flex-wrap text-nowrap flex-wrap-reverse">
    {
      ['d20', 'd4', 'd6', 'd8', 'd10', 'd12', 'd100'].map(dieType => (
        <DieButton key={dieType} eventDelegate={props.eventDelegate} dieType={dieType} />
      ))
    }
  </div>
)

export default RollLogFooterDiceButtons
