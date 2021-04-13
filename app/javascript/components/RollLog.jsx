import React from 'react'
import RollPart from 'components/RollPart'

const RollLog = props => (
  <div className="flex-grow-1 bg-light p-3 overflow-scroll d-flex flex-column-reverse">
    <div>
      <div className="text-center text-secondary mt-3">
        <h3>Thanks for joining</h3>
        <p className="lead">Room ID <span className="font-monospace">{props.roomId}</span></p>
      </div>

      { /* <h2 className="text-secondary fs-5">Alice</h2> */ }

      {
        props.rollData.map((data, i) =>
          <div key={i} className="card card-body mt-2">
            <h4 className="mb-2">
              {data.roll.name === null ? data.roll.result.value : `${data.roll.name} (${data.roll.result.value})`}
            </h4>

            <div className="d-flex flex-wrap align-items-center">
              {
                data.roll.result.parts.map((part, i) => (
                  <RollPart key={i} part={part} />
                ))
              }
            </div>

            <div className="text-muted">
              {data.roll.result.text}
            </div>
          </div>
        )
      }
    </div>
  </div>
)

export default RollLog
