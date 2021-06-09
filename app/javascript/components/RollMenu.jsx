import React from 'react'
import { ArrowCounterclockwise, HeartFill, PencilSquare, BoxArrowUpRight } from 'react-bootstrap-icons'
import SkipLink from 'components/SkipLink'
import DropdownRow from 'components/DropdownRow'

const RollRow = props => {
  const { roll, eventDelegate, ...otherProps } = props

  return (
    <DropdownRow
      text={roll.name === null ? roll.notation : roll.name}
      subtext={roll.name === null ? '' : roll.notation}
      onClick={() => eventDelegate.performRoll(roll, false)}
      {...otherProps} />
  )
}

class RollMenu extends React.Component {
  constructor(props) {
    super(props)

    this.containerRef = React.createRef()
  }

  scrollToBottom() {
    const container = this.containerRef.current
    container.scrollTop = container.scrollHeight
  }

  render() {
    const recentRolls = this.props.eventDelegate.getUserPreference('recentRolls')
    const favouriteRolls = this.props.eventDelegate.getUserPreference('favouriteRolls')

    return (
      <div
        ref={this.containerRef}
        className={`dropdown-menu ${this.props.className}`}
        style={{ width: this.props.width, maxWidth: '100vw', ...(this.props.style || {}) }}>
        {
          recentRolls.length > 0 && (
            <div
              role="group"
              aria-label="Recent rolls">
              {
                this.props.inSidebar && (
                  <SkipLink
                    linkId="top-of-recent-rolls"
                    linkText="Skip to most recent"
                    target="#bottom-of-recent-rolls" />
                )
              }

              {
                recentRolls.map((roll, i) => (
                  <RollRow
                    key={i}
                    roll={roll}
                    eventDelegate={this.props.eventDelegate}
                    icon={<ArrowCounterclockwise className="bi text-secondary" />} />
                ))
              }

              {
                this.props.inSidebar && (
                  <SkipLink
                    linkId="bottom-of-recent-rolls"
                    linkText="Skip to oldest"
                    target="#top-of-recent-rolls" />
                )
              }

              <hr className="dropdown-divider" />
            </div>
          )
        }

        {
          favouriteRolls.length > 0 && (
            <div
              role="group"
              aria-label="Favourite rolls">
              {
                favouriteRolls.map((rollData, i) => (
                  <RollRow
                    key={i}
                    roll={rollData.roll}
                    eventDelegate={this.props.eventDelegate}
                    icon={<HeartFill className="bi text-success" />}
                    editButton={
                      <button
                        type="button"
                        className="btn btn-link"
                        onClick={event => {
                          event.stopPropagation()
                          this.props.eventDelegate.showRollModal(rollData, i)
                        }}>
                        <PencilSquare className="bi" />
                        <span className="visually-hidden">Edit</span>
                      </button>
                    } />
                ))
              }

              <hr className="dropdown-divider" />
            </div>
          )
        }

        <DropdownRow
          icon={<BoxArrowUpRight className="bi" />}
          text="Custom dice roll"
          onClick={this.props.eventDelegate.showRollModal} />
      </div>
    )
  }
}

RollMenu.defaultProps = {
  className: '',
}

export default RollMenu
