import React from 'react'
import _ from 'lodash'
import { Howl } from 'howler'
import { userName as defaultUserName } from 'lib/constants'
import { bindHotkeys } from 'lib/hotkeys'
import Storage from 'lib/storage'
import RoomChannel from 'channels/room_channel'
import Sidebar from 'components/Sidebar'
import RollLogHeader from 'components/RollLogHeader'
import RollLog from 'components/RollLog'
import RollLogFooter from 'components/RollLogFooter'
import RollModal from 'components/RollModal'
import PreferencesModal from 'components/PreferencesModal'

class Application extends React.Component {
  constructor(props) {
    super(props)

    this.rollModalRef = React.createRef()
    this.preferencesModalRef = React.createRef()

    this.diceRollSound = new Howl({
      src: ['/dice-roll.mp3', '/dice-roll.wav'],
    })

    this.state = {
      rollData: [],
      userPreferences: {
        name: defaultUserName,
        recentRolls: [],
        favouriteRolls: [],
        upArrowHistory: [],
        prefersRollAnimation: true,
        prefersDiceRollSound: false,
        diceRollSoundVolume: 0.5,
        sidebarAppears: 'sometimes',
        sidebarPosition: 'left',
        sidebarWidth: 300,
        rollResultDirection: 'normal',
        prefersGraphicalDiceButtons: false,
        showGrahicalDiceButtonsAsOutlines: true,
        graphicalDiceButtonSize: 4,
        showDiceButtons: {
          d20: true,
          d4: true,
          d6: true,
          d8: true,
          d10: true,
          d12: true,
          d100: true,
        },
        diceTheme: {
          primary: '#404040',
          secondary: '#ffffff',
          buttonOutline: '#404040',
        },
      },
      connected: false,
      connectedOnce: false,
      windowUnloading: false,
    }

    this.eventDelegate = {
      performRoll: this.performRoll.bind(this),
      showRollModal: this.showRollModal.bind(this),
      showPreferencesModal: this.showPreferencesModal.bind(this),
      getUserPreference: this.getUserPreference.bind(this),
      setUserPreference: this.setUserPreference.bind(this),
      addFavouriteRoll: this.addFavouriteRoll.bind(this),
      removeFavouriteRoll: this.removeFavouriteRoll.bind(this),
      updateFavouriteRoll: this.updateFavouriteRoll.bind(this),
      playDiceRollSound: this.playDiceRollSound.bind(this),
    }

    this.roomChannel = RoomChannel.subscribe({
      roomId: props.roomId,
      onReceived: this.receivedRoll.bind(this),
      onConnect: () => this.setState({ connected: true, connectedOnce: true }),
      onDisconnect: () => this.setState({ connected: false }),
    })
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

    Storage.getItem('recently-joined-rooms')
      .then(recentlyJoinedRooms => {
        Storage.setItem(
          'recently-joined-rooms',
          JSON.stringify({
            ...JSON.parse(recentlyJoinedRooms || '{}'),
            [this.props.roomId]: new Date().toISOString(),
          }),
        )
      })
      .catch(console.error)

    bindHotkeys(document.body, this.eventDelegate)

    window.addEventListener('beforeunload', () => this.setState({ windowUnloading: true }))
  }

  componentDidUpdate(prevProps, prevState) {
    const { primary, secondary, buttonOutline } = this.getUserPreference('diceTheme')

    document.body.style.setProperty('--dice-primary', primary)
    document.body.style.setProperty('--dice-secondary', secondary)
    document.body.style.setProperty('--dice-button-outline', buttonOutline)
  }

  performRoll(roll, showInRecents = true, successCallback = () => {}) {
    return fetch(
      `/room/${encodeURIComponent(this.props.roomId)}/roll.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: JSON.stringify({
            ts: Date.now(),

            user: {
              name: this.getUserPreference('name'),
            },

            roll,
          }),
        }),
      },
    )
      .then(response => response.json())
      .then(response => response.ok ? Promise.resolve() : Promise.reject(response.error))
      .then(() => {
        if (showInRecents) {
          this.setUserPreference('recentRolls', [
            ...this.getUserPreference('recentRolls'),
            roll,
          ])
        }
      })
  }

  receivedRoll(data) {
    this.setState({
      rollData: [
        ...this.state.rollData,
        data,
      ].sort((d1, d2) => d1.ts - d2.ts),
    }, () => {
      if (this.getUserPreference('prefersDiceRollSound')) {
        this.playDiceRollSound()
      }
    })
  }

  playDiceRollSound() {
    this.diceRollSound.volume(this.getUserPreference('diceRollSoundVolume'))
    this.diceRollSound.play()
  }

  showRollModal(rollData = null, indexInFavouriteRollsArray = undefined) {
    this.rollModalRef.current.show(rollData, indexInFavouriteRollsArray)
  }

  showPreferencesModal() {
    this.preferencesModalRef.current.show()
  }

  digUserPreference(userPreferences, key, callback) {
    let keys = key.split(/\]\[|\[|\]/).filter(x => x.length > 0)
    const finalKey = keys.pop()

    return callback(
      keys.reduce((obj, key) => obj[key], userPreferences),
      finalKey,
    )
  }

  getUserPreference(key) {
    return this.digUserPreference(
      this.state.userPreferences,
      key,
      (obj, finalKey) => obj[finalKey]
    )
  }

  setUserPreference(key, value, callback = () => {}) {
    let newUserPreferences = _.cloneDeep(this.state.userPreferences)

    this.digUserPreference(
      newUserPreferences,
      key,
      (obj, finalKey) => {
        obj[finalKey] = value
      }
    )

    this.setState({ userPreferences: newUserPreferences }, () => {
      Storage.setItem('user-preferences', JSON.stringify(this.state.userPreferences))
        .catch(console.error)
        .then(() => callback())
    })
  }

  addFavouriteRoll(rollData) {
    this.setUserPreference('favouriteRolls', [
      ...this.getUserPreference('favouriteRolls'),
      rollData,
    ])
  }

  removeFavouriteRoll(index) {
    const favouriteRolls = this.getUserPreference('favouriteRolls')

    this.setUserPreference('favouriteRolls', [
      ...favouriteRolls.slice(0, index),
      ...favouriteRolls.slice(index + 1),
    ])
  }

  updateFavouriteRoll(index, rollData) {
    const favouriteRolls = this.getUserPreference('favouriteRolls')

    this.setUserPreference('favouriteRolls', [
      ...favouriteRolls.slice(0, index),
      rollData,
      ...favouriteRolls.slice(index + 1),
    ])
  }

  render() {
    const sidebarPosition = this.getUserPreference('sidebarPosition')

    return (
      <>
        <div className="d-flex h-100 text-break">
          {
            sidebarPosition === 'left' && (
              <Sidebar eventDelegate={this.eventDelegate} />
            )
          }

          <div className="flex-grow-1 h-100 d-flex flex-column" style={{ maxWidth: '100%' }}>
            <RollLogHeader eventDelegate={this.eventDelegate} roomId={this.props.roomId} />

            <div aria-live="assertive" role="alert">
              {
                (!this.state.connectedOnce || this.state.connected || this.state.windowUnloading)
                  ? (
                    <span className="visually-hidden">Connected</span>
                  )
                  : (
                    <div className="bg-danger text-white border-bottom p-3">
                      <span className="d-inline-block">Lost connection to server.&nbsp;</span>
                      <span className="d-inline-block">Trying to reconnect&hellip; <span className="spinner-border spinner-border-sm"></span></span>
                    </div>
                  )
              }
            </div>

            <RollLog eventDelegate={this.eventDelegate} roomId={this.props.roomId} rollData={this.state.rollData} />

            <RollLogFooter eventDelegate={this.eventDelegate} />
          </div>

          {
            sidebarPosition === 'right' && (
              <Sidebar eventDelegate={this.eventDelegate} />
            )
          }
        </div>

        <RollModal ref={this.rollModalRef} eventDelegate={this.eventDelegate} />
        <PreferencesModal ref={this.preferencesModalRef} eventDelegate={this.eventDelegate} />
      </>
    )
  }
}

export default Application
