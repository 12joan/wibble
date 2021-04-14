import React from 'react'
import { userName as defaultUserName } from '../constants'
import RoomChannel from 'channels/room_channel'
import Sidebar from 'components/Sidebar'
import RollLogHeader from 'components/RollLogHeader'
import RollLog from 'components/RollLog'
import RollLogFooter from 'components/RollLogFooter'
import RollModal from 'components/RollModal'

class Application extends React.Component {
  constructor(props) {
    super(props)

    this.rollModalRef = React.createRef()

    this.eventDelegate = {
      performRoll: this.performRoll.bind(this),
      showRollModal: () => this.rollModalRef.current.show(),
      getUserPreferences: () => this.state.userPreferences,
      setUserPreference: this.setUserPreference.bind(this),
    }

    this.roomChannel = RoomChannel.subscribe({
      roomId: props.roomId,
      onReceived: this.receivedRoll.bind(this),
    })

    this.state = {
      rollData: [],
      userPreferences: {
        name: defaultUserName,
      },
    }
  }

  performRoll(roll) {
    this.roomChannel.send({
      user: {
        name: this.state.userPreferences.name,
      },

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

  setUserPreference(key, value) {
    this.setState({
      userPreferences: {
        ...this.state.userPreferences,
        [key]: value,
      },
    })
  }

  render() {
    return (
      <>
        <div className="d-flex h-100 text-break">
          <Sidebar eventDelegate={this.eventDelegate} />

          <div className="flex-grow-1 h-100 d-flex flex-column" style={{ maxWidth: '100%' }}>
            <RollLogHeader eventDelegate={this.eventDelegate} />
            <RollLog eventDelegate={this.eventDelegate} roomId={this.props.roomId} rollData={this.state.rollData} />
            <RollLogFooter eventDelegate={this.eventDelegate} />
          </div>
        </div>

        <RollModal ref={this.rollModalRef} eventDelegate={this.eventDelegate} />
      </>
    )
  }
}

export default Application
