import React from 'react'
import { userName as defaultUserName } from 'lib/constants'
import { bindHotkeys } from 'lib/hotkeys'
import Storage from 'lib/storage'
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
      showRollModal: this.showRollModal.bind(this),
      getUserPreferences: () => this.state.userPreferences,
      setUserPreference: this.setUserPreference.bind(this),
      addFavouriteRoll: this.addFavouriteRoll.bind(this),
      removeFavouriteRoll: this.removeFavouriteRoll.bind(this),
      updateFavouriteRoll: this.updateFavouriteRoll.bind(this),
    }

    this.roomChannel = RoomChannel.subscribe({
      roomId: props.roomId,
      onReceived: this.receivedRoll.bind(this),
    })

    this.state = {
      rollData: [],
      userPreferences: {
        name: defaultUserName,
        recentRolls: [],
        favouriteRolls: [],
        upArrowHistory: [],
      },
    }
  }

  componentDidMount() {
    Storage.getItem('user-preferences')
      .then(data => {
        if (data !== null) {
          this.setState({
            userPreferences: {
              ...this.state.userPreferences,
              ...JSON.parse(data),
            }
          })
        }
      })
      .catch(console.error)

    bindHotkeys(document.body, this.eventDelegate)
  }

  performRoll(roll, showInRecents = true) {
    if (showInRecents) {
      this.setUserPreference('recentRolls', [
        ...this.state.userPreferences.recentRolls,
        roll,
      ])
    }

    this.roomChannel.send({
      ts: Date.now(),

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
      ].sort((d1, d2) => d1.ts - d2.ts),
    })
  }

  showRollModal(rollData = null) {
    this.rollModalRef.current.show(rollData)
  }

  setUserPreference(key, value, callback = () => {}) {
    this.setState({
      userPreferences: {
        ...this.state.userPreferences,
        [key]: value,
      },
    }, () => {
      Storage.setItem('user-preferences', JSON.stringify(this.state.userPreferences))
        .catch(console.error)
        .then(() => callback())
    })
  }

  addFavouriteRoll(rollData) {
    this.setUserPreference('favouriteRolls', [
      ...this.state.userPreferences.favouriteRolls,
      rollData,
    ])
  }

  removeFavouriteRoll(index) {
    const { favouriteRolls } = this.state.userPreferences

    this.setUserPreference('favouriteRolls', [
      ...favouriteRolls.slice(0, index),
      ...favouriteRolls.slice(index + 1),
    ])
  }

  updateFavouriteRoll(index, rollData) {
    const { favouriteRolls } = this.state.userPreferences

    this.setUserPreference('favouriteRolls', [
      ...favouriteRolls.slice(0, index),
      rollData,
      ...favouriteRolls.slice(index + 1),
    ])
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
