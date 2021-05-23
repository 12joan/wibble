import React from 'react'
import RollPart from 'components/RollPart'

const Roll = props => {
  const prefersRollAnimation = props.eventDelegate.getUserPreference('prefersRollAnimation')
  const directionReversed = props.eventDelegate.getUserPreference('rollResultDirection') === 'reversed'

  const resultAndDiceBreakdown = [
    (
      <span
        key="result"
        className={`text-nowrap m${directionReversed ? 's' : 'e'}-3 mb-2 lh-1`}
        style={{ fontSize: '2rem' }}
        aria-label={ `Roll result ${props.result.value}` }>
        {props.result.value}
      </span>
    ),

    (
      <div
        key="breakdown"
        className={`d-flex flex-wrap justify-content-${directionReversed ? 'start' : 'end'} align-items-center mx-1` }>
        {
          props.result.parts.map((part, i) => (
            <RollPart key={i} part={part} />
          ))
        }
      </div>
    ),
  ]

  return (
    <div className="mt-2">
      <div className={`${prefersRollAnimation ? 'shimmer' : ''} p-1 m-n1 rounded`}>
        <div className="card card-body" aria-label={ `Dice roll ${props.name || ''} ${props.result.value}` } tabIndex="0">
          {
            props.name !== null && (
              <h4 className="mb-2">{props.name}</h4>
            )
          }

          <div className="d-flex justify-content-between" aria-label="Dice breakdown and result">
            {
              directionReversed
                ? resultAndDiceBreakdown.reverse()
                : resultAndDiceBreakdown
            }
          </div>

          <div className="text-muted">
            {props.result.text}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Roll
