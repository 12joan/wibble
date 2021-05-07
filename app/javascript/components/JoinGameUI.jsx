import React from 'react'
import moment from 'moment'
import 'moment.distance'
import Storage from 'lib/storage'

class JoinGameUI extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      roomIdRawValue: '',
      recentlyJoinedRooms: undefined,
      showAllRooms: false,
    }
  }

  componentDidMount() {
    Storage.getItem('recently-joined-rooms')
      .then(data => {
        if (data !== null) {
          this.setState({
            recentlyJoinedRooms: Object.entries(JSON.parse(data)).map(([roomId, dateString]) => ({
              roomId,
              date: new Date(dateString),
            })).sort((a, b) => b.date - a.date)
          })
        }
      })
      .catch(console.error)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  get roomId() {
    const parts = this.state.roomIdRawValue.split('/')
    return parts[parts.length - 1]
  }

  roomIdNonEmpty() {
    return /[^\s]/.test(this.roomId)
  }

  roomIdValid() {
    return this.roomIdNonEmpty() && this.roomId.length <= 64
  }

  render() {
    return (
      <>
        <div className="mt-3">
          <label htmlFor="room-id" className="form-label">Join an existing room</label>

          <form
            className="input-group"
            onSubmit={event => {
              event.preventDefault()

              if (this.roomIdValid()) {
                window.location.href = `/room/${this.roomId}`
              }
            }}>

            <input
              id="room-id"
              type="text"
              className="form-control"
              placeholder="Room ID"
              name="roomIdRawValue"
              value={this.state.roomIdRawValue}
              onChange={this.handleInputChange.bind(this)} />

            {
              this.roomIdNonEmpty() && (
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={!this.roomIdValid()}>
                  Join
                </button>
              )
            }
          </form>
        </div>

        <div className="mt-3">
          <label htmlFor="new-room" className="form-label">Or create a new one</label>
          <a href="/room" className="btn btn-dark d-block" rel="nofollow" data-method="post">
            New room
          </a>
        </div>

        {
          (this.state.recentlyJoinedRooms !== undefined && this.state.recentlyJoinedRooms.length > 0) && (
            <div className="mt-5">
              <h2>Recent rooms</h2>

              {
                this.state.recentlyJoinedRooms
                  .slice(0, this.state.showAllRooms ? Infinity : 3)
                  .map(({roomId, date}) => (
                    <div key={roomId} className="card card-body card-action mt-2">
                      <h5 className="card-title font-monospace">
                        <a href={`/room/${roomId}`} className="stretched-link text-decoration-none text-dark">
                          {roomId}
                        </a>
                      </h5>

                      <p className="card-text">
                        <small className="text-muted">
                          Last joined {moment.duration(moment().diff(moment(date))).distance()} ago
                        </small>
                      </p>
                    </div>
                  ))
              }

            {
              !this.state.showAllRooms && this.state.recentlyJoinedRooms.length > 3 && (
                <button className="btn btn-link text-decoration-none mt-3" onClick={() => this.setState({ showAllRooms: true })}>
                  Show all
                </button>
              )
            }
            </div>
          )
        }
      </>
    )
  }
}

export default JoinGameUI
