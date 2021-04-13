import React from 'react'
import RollLogFooterNotationTextBox from 'components/RollLogFooterNotationTextBox'

const RollLogFooter = props => (
  <div className="border-top p-3">
    <div className="row gx-2 mb-2 flex-nowrap text-nowrap overflow-scroll">
      {
        ['d20', 'd4', 'd6', 'd8', 'd10', 'd12', 'd100'].map(die => (
          <div key={die} className="col d-grid">
            <button
              className="btn btn-sm btn-dark"
              onClick={() => {
                props.eventDelegate.performRoll({
                  name: null,
                  notation: `1${die}`,
                })
              }}>
              {die}
            </button>
          </div>
        ))
      }
    </div>

    <RollLogFooterNotationTextBox eventDelegate={props.eventDelegate} />
  </div>
)

export default RollLogFooter
