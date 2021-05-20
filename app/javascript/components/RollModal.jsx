import React from 'react'
import Modal from 'bootstrap/js/dist/modal'
import { PlusCircleFill, HeartFill } from 'react-bootstrap-icons'
import formatModifier from 'lib/formatModifier'
import StepperInput from 'components/StepperInput'

class RollModal extends React.Component {
  constructor(props) {
    super(props)

    this.modalRef = React.createRef()

    this.state = {
      diceCount: '',
      dieType: '',
      rollModifier: '',
      showRollName: false,
      rollName: '',
      favourited: false,
      indexInFavouriteRollsArray: undefined,
    }
  }

  reset() {
    this.setState({
      diceCount: '1',
      dieType: 'd20',
      rollModifier: '',
      showRollName: false,
      rollName: '',
      favourited: false,
      indexInFavouriteRollsArray: undefined,
    })
  }

  componentDidMount() {
    this.bootstrapModal = new Modal(this.modalRef.current, {})
    this.reset()
  }

  show(rollData = null) {
    this.reset()

    if (rollData !== null) {
      this.setState(rollData.modalState)
    }

    this.bootstrapModal.show()
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => {
      this.tryUpdateFavourite()
    })
  }

  handleDiceCountBlur(event) {
    this.setState({
      diceCount: Number.parseInt(event.target.value) || 1,
    }, () => {
      this.tryUpdateFavourite()
    })
  }

  handleRollModifierBlur(event) {
    this.setState({
      rollModifier: formatModifier(this.parseModifier(event.target.value)),
    }, () => {
      this.tryUpdateFavourite()
    })
  }

  handleFavouriteCheckChange(event) {
    const favourited = event.target.checked

    this.setState({
      favourited,
    }, () => {
      if (favourited) {
        this.becomeFavourite()
      } else {
        this.unfavourite()
      }
    })
  }

  becomeFavourite() {
    this.setState({
      indexInFavouriteRollsArray: this.props.eventDelegate.getUserPreference('favouriteRolls').length,
    }, () => {
      this.props.eventDelegate.addFavouriteRoll(this.rollData())
    })
  }

  unfavourite() {
    this.props.eventDelegate.removeFavouriteRoll(this.state.indexInFavouriteRollsArray)

    this.setState({
      indexInFavouriteRollsArray: undefined,
    })
  }

  tryUpdateFavourite() {
    const { favourited, indexInFavouriteRollsArray } = this.state

    if (favourited && indexInFavouriteRollsArray !== undefined) {
      this.props.eventDelegate.updateFavouriteRoll(
        indexInFavouriteRollsArray,
        this.rollData(),
      )
    }
  }

  parseModifier(modifier) {
    return Number.parseFloat(modifier.replaceAll(/\s+/g, '')) || 0
  }

  notation() {
    const modifier = this.parseModifier(this.state.rollModifier) === 0
      ? ''
      : ' ' + this.state.rollModifier

    return `${this.state.diceCount}${this.state.dieType}${modifier}`
  }

  rollData() {
    const { rollName } = this.state

    return {
      modalState: this.state,

      roll: {
        name: /[^\s]+/.test(rollName) ? rollName : null,
        notation: this.notation(),
      },
    }
  }

  performRoll() {
    this.props.eventDelegate.performRoll(this.rollData().roll)
  }

  render() {
    return (
      <div ref={this.modalRef} className="modal fade" id="roll-modal" tabIndex="-1" aria-label="Custom roll" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body container-fluid">
              <form onSubmit={event => {
                event.preventDefault()
                this.performRoll()
                this.bootstrapModal.hide()
              }}>
                <div className="mb-3">
                  {
                    this.state.showRollName
                      ? (
                        <>
                          <label className="form-label mb-1" htmlFor="roll-name">
                            <small>Roll name</small>
                          </label>

                          <input
                            id="roll-name"
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Roll name"
                            name="rollName"
                            value={this.state.rollName}
                            onChange={this.handleInputChange.bind(this)}
                            autoFocus />
                        </>
                      )

                      : (
                        <button
                          type="button"
                          className="btn btn-link text-decoration-none d-block"
                          onClick={() => this.setState({
                            showRollName: true,
                          })}>
                          <PlusCircleFill className="bi" /> Add roll name
                        </button>
                      )
                  }
                </div>

                <div className="mb-3 row g-2 align-items-center">
                  <div className="col-3">
                    <StepperInput
                      type="text"
                      className="form-control text-center"
                      placeholder="1"
                      valuePredicate={value => value > 0}
                      name="diceCount"
                      value={this.state.diceCount}
                      onChange={this.handleInputChange.bind(this)}
                      onBlur={this.handleDiceCountBlur.bind(this)} />
                  </div>

                  <div className="col-6">
                    <select
                      className="form-select text-center"
                      name="dieType"
                      value={this.state.dieType}
                      onChange={this.handleInputChange.bind(this)}>
                      {
                        ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd20 (adv.)', 'd20 (dis.)', 'd100'].map(dieType => (
                          <option key={dieType} value={dieType}>{dieType}</option>
                        ))
                      }
                    </select>
                  </div>

                  <div className="col-3">
                    <StepperInput
                      type="text"
                      className="form-control text-center"
                      placeholder="+ 0"
                      preprocessValue={this.parseModifier.bind(this)}
                      postprocessValue={formatModifier}
                      name="rollModifier"
                      value={this.state.rollModifier}
                      onChange={this.handleInputChange.bind(this)}
                      onBlur={this.handleRollModifierBlur.bind(this)} />
                  </div>
                </div>

                <div className="d-flex flex-nowrap mx-n1">
                  <div className="mx-1">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="favourite-check"
                      autoComplete="off"
                      name="favourited"
                      checked={this.state.favourited}
                      onChange={this.handleFavouriteCheckChange.bind(this)} />

                    <label className="btn btn-outline-success" htmlFor="favourite-check">
                      <HeartFill />
                    </label>
                  </div>

                  <button type="submit" className="mx-1 flex-grow-1 btn btn-dark">
                    Roll {this.notation()}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RollModal
