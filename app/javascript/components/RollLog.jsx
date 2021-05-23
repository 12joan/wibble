import React from 'react'
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
      <div ref={this.scrollEl} className="flex-grow-1 bg-light p-3 overflow-scroll d-flex flex-column-reverse" aria-label="Roll log">
        <div>
          <div className="visually-hidden-focusable" id="top-of-roll-log">
            This is the top of the roll log. <a href="#bottom-of-roll-log">Skip to most recent</a>
          </div>

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

          <div className="visually-hidden-focusable" id="bottom-of-roll-log">
            This is the bottom of the roll log. <a href="#top-of-roll-log">Skip to oldest</a>
          </div>
        </div>
      </div>
    )
  }
}

export default RollLog
