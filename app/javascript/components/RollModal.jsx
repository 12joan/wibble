import React from 'react'
import formatModifier from 'formatModifier'
import StepperInput from 'components/StepperInput'

class RollModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      diceCount: '',
      dieType: '',
      rollModifier: '',
    }
  }

  componentDidMount() {
    this.reset()
  }

  reset() {
    this.setState({
      diceCount: '1',
      dieType: 'd20',
      rollModifier: '',
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
    this.props.eventDelegate.performRoll({
      name: null,
      notation: this.notation(),
    })

    setTimeout(this.reset.bind(this), 100)
  }

  render() {
    return (
      <div className="modal fade" id="roll-modal" tabIndex="-1" aria-label="Custom roll" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body container-fluid">
              <div className="mb-3">
                <span className="text-primary">Add roll name</span>
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
                <button
                  type="button"
                  className="btn btn-dark"
                  data-bs-dismiss="modal"
                  onClick={this.performRoll.bind(this)}>
                  Roll {this.notation()}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RollModal
