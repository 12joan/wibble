import React from 'react'
import { CaretUpFill, CaretDownFill } from 'react-bootstrap-icons'

class StepperInput extends React.Component {
  constructor(props) {
    super(props)

    this.inputRef = React.createRef()
  }

  stepValue(delta) {
    const input = this.inputRef.current

    const newValue = this.props.postprocessValue(
      this.props.preprocessValue(input.value) + delta
    )

    if (this.props.valuePredicate(newValue)) {
      input.value = newValue
      this.props.onChange?.({ target: input })
    }
  }

  render() {
    const { className, preprocessValue, postprocessValue, valuePredicate, ...otherProps } = this.props

    return (
      <div className="d-flex flex-column align-items-center">
        <button
          type="button"
          className="btn text-primary w-100 p-0"
          onClick={() => this.stepValue(1)}>
          <CaretUpFill className="bi" size="3em" />
        </button>

        <input
          ref={this.inputRef}
          className={`${className}`}
          {...otherProps} />

        <button
          type="button"
          className="btn text-primary w-100 p-0"
          onClick={() => this.stepValue(-1)}>
          <CaretDownFill className="bi" size="3em" />
        </button>
      </div>
    )
  }
}

StepperInput.defaultProps = {
  preprocessValue: value => Number.parseFloat(value),
  postprocessValue: value => value,
  valuePredicate: value => true,
}

export default StepperInput
