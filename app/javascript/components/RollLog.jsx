import React from 'react'
import SkipLink from 'components/SkipLink'
import Roll from 'components/Roll'

class RollLog extends React.Component {
  constructor(props) {
    super(props)

    this.scrollEl = React.createRef()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.rollData.length > prevProps.rollData.length) {
      // Scroll to most recent
      this.scrollEl.current.scrollTo(0, 0)
    }
  }

  render() {
    let previousName = undefined

    return (
      <div
        ref={this.scrollEl}
        className="flex-grow-1 bg-light p-3 overflow-scroll d-flex flex-column-reverse"
        role="main"
        aria-label="Roll log">
        <div role="log" aria-live="polite">
          <SkipLink
            linkId="top-of-roll-log"
            linkText="Skip to most recent"
            target="#bottom-of-roll-log" />

          <div className="text-center text-secondary mt-3">
            <h3>Thanks for joining</h3>
            <p className="lead">Room ID <span className="font-monospace">{this.props.roomId}</span></p>
          </div>

          {
            this.props.rollData.map((data, i) => {
              const { name } = data.user

              const showName = name !== previousName

              previousName = name

              return (
                <div key={i}>
                  {
                    showName && (
                      <h2 className="text-secondary fs-5 fw-normal mt-4">{name}</h2>
                    )
                  }

                  <Roll eventDelegate={this.props.eventDelegate} {...data.roll} />
                </div>
              )
            })
          }

          <SkipLink
            linkId="bottom-of-roll-log"
            linkText="Skip to oldest"
            target="#top-of-roll-log" />
        </div>
      </div>
    )
  }
}

export default RollLog
