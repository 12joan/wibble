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
      rollData: [],
    }
  }

  performRoll(roll) {
    this.roomChannel.send({
      roll,
    })
  }

  receivedRoll(data) {
    this.setState({
      rollData: [
        ...this.state.rollData,
        data,
      ]
    })
  }

  render() {
    return (
      <div className="d-flex h-100 text-break">
        <Sidebar eventDelegate={this.eventDelegate} />

        <div className="flex-grow-1 h-100 d-flex flex-column">
          <RollLogHeader eventDelegate={this.eventDelegate} />
          <RollLog eventDelegate={this.eventDelegate} roomId={this.props.roomId} rollData={this.state.rollData} />
          <RollLogFooter eventDelegate={this.eventDelegate} />
        </div>
      </div>
    )
  }
}

export default Application
