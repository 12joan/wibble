import React from 'react'
import RoomChannel from 'channels/room_channel'
import Sidebar from 'components/Sidebar'
import RollLogHeader from 'components/RollLogHeader'
import RollLog from 'components/RollLog'
import RollLogFooter from 'components/RollLogFooter'

class Application extends React.Component {
  constructor(props) {
    super(props)

    this.eventDelegate = {
      performRoll: this.performRoll.bind(this),
    }

    this.roomChannel = RoomChannel.subscribe({
      roomId: props.roomId,
      onReceived: this.receivedRoll.bind(this),
    })

    this.state = {
      rolls: [],
    }
  }

  performRoll(rollSpec) {
    this.roomChannel.send({
      rollSpec,
    })
  }

  receivedRoll(rollResult) {
    this.setState({
      rolls: [
        ...this.state.rolls,
        rollResult.rollSpec,
      ]
    })
  }

  render() {
    return (
      <div className="row g-0">
        <Sidebar eventDelegate={this.eventDelegate} />

        <div className="col-md-8 vh-100 d-flex flex-column">
          <RollLogHeader eventDelegate={this.eventDelegate} />
          <RollLog eventDelegate={this.eventDelegate} roomId={this.props.roomId} rolls={this.state.rolls} />
          <RollLogFooter eventDelegate={this.eventDelegate} />
        </div>
      </div>
    )
  }
}

export default Application
