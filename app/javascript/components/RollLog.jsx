import React from 'react'

const RollLog = props => (
  <div className="flex-grow-1 bg-light p-3 overflow-scroll d-flex flex-column-reverse">
    <div>
      <div className="text-center text-secondary mt-3">
        <h2>Thanks for joining</h2>
        <p className="lead">Room ID <span className="font-monospace">{props.roomId}</span></p>
      </div>

      <h2 className="text-secondary fs-5">Alice</h2>

      <div className="card card-body mt-3">
        <div className="text-muted">
          1d20 (12) + 3
        </div>
      </div>

      <div className="card card-body mt-3">
        <h3>Fireball (31)</h3>

        <div className="text-muted">
          8d6 (30) + 1
        </div>
      </div>
    </div>
  </div>
)

export default RollLog
