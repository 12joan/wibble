import React from 'react'
import Modal from 'bootstrap/js/dist/modal'
import { PlusCircleFill } from 'react-bootstrap-icons'
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
    }
  }

  componentDidMount() {
    this.reset()

    this.bootstrapModal = new Modal(this.modalRef.current, {})
  }

  show() {
    this.bootstrapModal.show()
  }

  reset() {
    this.setState({
      diceCount: '1',
      dieType: 'd20',
      rollModifier: '',
      showRollName: false,
      rollName: '',
    })
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleDiceCountBlur(event) {
    this.setState({
      diceCount: Number.parseInt(event.target.value) || 1,
    })
  }

  handleRollModifierBlur(event) {
    this.setState({
      rollModifier: formatModifier(this.parseModifier(event.target.value)),
    })
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

  performRoll() {
    const { rollName } = this.state

    this.props.eventDelegate.performRoll({
      name: /[^\s]+/.test(rollName) ? rollName : null,
      notation: this.notation(),
    })
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
                setTimeout(this.reset.bind(this), 100)
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

                <div className="d-grid">
                  <button type="submit" className="btn btn-dark">
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
