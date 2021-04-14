import React from 'react'
import RollLogFooterDiceButtons from 'components/RollLogFooterDiceButtons'
import RollLogFooterNotationTextBox from 'components/RollLogFooterNotationTextBox'

const RollLogFooter = props => (
  <div className="border-top p-3">
    <RollLogFooterDiceButtons eventDelegate={props.eventDelegate} />
    <RollLogFooterNotationTextBox eventDelegate={props.eventDelegate} />
  </div>
)

export default RollLogFooter
