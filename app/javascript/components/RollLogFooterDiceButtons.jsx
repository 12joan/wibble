import React from 'react'
import { useLongPress } from 'use-long-press'

import D4 from 'components/dice/D4Button'
import D6 from 'components/dice/D6Button'
import D8 from 'components/dice/D8Button'
import D10 from 'components/dice/D10Button'
import D12 from 'components/dice/D12Button'
import D20 from 'components/dice/D20Button'
import D100 from 'components/dice/D100Button'

const performDiceRoll = (count, dieType, append, performRoll) => (
  performRoll({
    name: null,
    notation: `${count}${dieType}${append}`,
  })
)

const DieButtonMenu = props => (
  <ul className="dropdown-menu dropdown-menu-end" style={{ minWidth: 0 }}>
    {
      [8, 7, 6, 5, 4, 3, 2, 1].map(n => (
        <li key={n}>
          <button
            className="dropdown-item"
            onClick={() => performDiceRoll(n, props.dieType, '', props.eventDelegate.performRoll)}>
            {n}{props.dieType}
          </button>
        </li>
      ))
    }

    {
      props.dieType === 'd20' && (
        <>
          <li><hr className="dropdown-divider" /></li>

          {
            ['Advantage', 'Disadvantage'].map(special => (
              <li key={special}>
                <button
                  className="dropdown-item"
                  onClick={() => performDiceRoll(1, props.dieType, ' ' + special, props.eventDelegate.performRoll)}>
                  {special}
                </button>
              </li>
            ))
          }
        </>
      )
    }
  </ul>
)

const DieButtonDropupToggle = props => (
  <button
    type="button"
    className={`btn btn-sm dropdown-toggle dropdown-toggle-split flex-grow-0 ${props.className || ''}`}
    data-bs-toggle="dropdown"
    data-bs-reference="parent"
    aria-expanded="false">
    <span className="visually-hidden">Toggle Dropup</span>
  </button>
)

let debounceClick = false

const DieButton = props => {
  // const openDropupForButton = btn => btn.parentNode.querySelector('.dropdown-toggle').click()

  // const bindLongPress = useLongPress(
  //   event => openDropupForButton(event.target),
  //   {
  //     captureEvent: true,
  //     onCancel: () => {
  //       if (!debounceClick) {
  //         debounceClick = true
  //         performDiceRoll(1, props.dieType, '', props.eventDelegate.performRoll)
  //         setTimeout(() => debounceClick = false, 50)
  //       }
  //     },
  //   },
  // )

  const DieComponent = { d4: D4, d6: D6, d8: D8, d10: D10, d12: D12, d20: D20, d100: D100 }[props.dieType]

  const prefersGraphicalDiceButtons = props.eventDelegate.getUserPreference('prefersGraphicalDiceButtons')
  const graphicalDiceButtonSize = props.eventDelegate.getUserPreference('graphicalDiceButtonSize')

  const buttonProps = {
    onClick: () => performDiceRoll(1, props.dieType, '', props.eventDelegate.performRoll),
    // onClick: event => event.stopPropagation(),
    // onContextMenu: event => {
    //   bindLongPress.onTouchEnd(event)
    //   event.preventDefault()
    // },
    // ...bindLongPress
    // onTouchStart: event => {
    //   bindLongPress.onTouchStart(event)
    //   document.body.classList.add('user-select-none')
    // },
    // onTouchEnd: event=> {
    //   bindLongPress.onTouchEnd(event)
    //   document.body.classList.remove('user-select-none')
    // },
  }

  if (prefersGraphicalDiceButtons) {
    return (
      <div className="col d-flex justify-content-center">
        <div className="btn-group dropup">
          <button
            type="button"
            className="btn p-0"
            style={{ fontSize: `${graphicalDiceButtonSize}rem` }}
            {...buttonProps}>
            <DieComponent />
          </button>

          <DieButtonDropupToggle />

          <DieButtonMenu eventDelegate={props.eventDelegate} dieType={props.dieType} />
        </div>
      </div>
    )
  } else {
    return (
      <div className="col d-grid">
        <div className="btn-group dropup">
          <button type="button" className="btn btn-sm btn-dark" {...buttonProps}>
            {props.dieType}
          </button>

          <DieButtonDropupToggle className="btn-dark" />

          <DieButtonMenu eventDelegate={props.eventDelegate} dieType={props.dieType} />
        </div>
      </div>
    )
  }
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
