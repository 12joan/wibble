import React from 'react'
import { ThreeDotsVertical } from 'react-bootstrap-icons'
import ArrowUp from 'components/ArrowUp'
import RollMenu from 'components/RollMenu'

class RollLogFooterNotationTextBox extends React.Component {
  constructor(props) {
    super(props)

    this.inputRef = React.createRef()

    this.state = {
      inputValue: '',
      historyPointer: 0,
      localHistory: [],
    }
  }

  componentDidMount() {
    const input = this.inputRef.current

    input.addEventListener('keydown', event => {
      switch (event.key) {
        case 'Escape':
          input.blur()
          break

        case 'ArrowUp':
          this.changePointer(1)
          event.preventDefault()
          break

        case 'ArrowDown':
          this.changePointer(-1)
          event.preventDefault()
          break
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const previousPointer = prevState.historyPointer
    const newPointer = this.state.historyPointer

    if (previousPointer !== newPointer) {
      this.setState({
        localHistory: [
          ...this.state.localHistory.slice(0, previousPointer),
          this.state.inputValue,
          ...this.state.localHistory.slice(previousPointer + 1),
        ],
      })

      const localHistoryValue = this.state.localHistory[newPointer]
      const globalHistoryValue = this.globalHistory()[newPointer - 1]

      const newValue = localHistoryValue === undefined ? globalHistoryValue : localHistoryValue

      if (newValue !== undefined) {
        this.setState({
          inputValue: newValue,
        })
      }
    }
  }

  globalHistory() {
    return this.props.eventDelegate.getUserPreference('upArrowHistory')
  }

  addHistoryEntry(value, callback = () => {}) {
    this.props.eventDelegate.setUserPreference('upArrowHistory', [
      value,
      ...this.globalHistory(),
    ], () => {
      this.setState({
        historyPointer: 0,
        localHistory: [],
      }, callback)
    })
  }

  changePointer(delta) {
    this.setState({
      historyPointer: Math.min(
        Math.max(this.state.historyPointer + delta, 0),
        this.globalHistory().length,
      ),
    })
  }

  handleSubmit(event) {
    const { target } = event
    event.preventDefault()

    const { inputValue } = this.state

    const rolls = inputValue.split(/;/)

    const performRoll = rawNotation => {
      const nameRegex = /["'‘’‚‛“”„‟〝〞〟＂＇](.*)["'‘’‚‛“”„‟〝〞〟＂＇]/

      const [, name] = rawNotation.match(nameRegex) || ["no match", null]
      const notation = rawNotation.replace(nameRegex, "").trim()

      return this.props.eventDelegate.performRoll({
        name,
        notation,
      })
    }

    const performRolls = ([rawNotation, ...otherRolls]) => {
      performRoll(rawNotation)

      if (otherRolls.length > 0) {
        setTimeout(() => performRolls(otherRolls), 100)
      }

      return Promise.resolve()
    }

    const rollsPromise = rolls.length > 1
      ? performRolls(rolls)
      : performRoll(rolls[0])

    this.setState({
      inputValue: '',
    }, () => {
      rollsPromise
        .then(() => this.addHistoryEntry(inputValue))
        .catch(() => {
          const input = this.inputRef.current

          this.setState({
            inputValue,
          }, () => input.select())
        })
    })
  }

  render() {
    return (
      <form className="border rounded d-flex" onSubmit={this.handleSubmit.bind(this)}>
        <div className="align-self-stretch border-end my-2 px-2 dropup">
          <button
            type="button"
            className="three-dots-dropup-button"
            data-bs-toggle="dropdown"
            data-bs-reference="parent"
            data-bs-offset="0,8"
            aria-expanded="false">
            <ThreeDotsVertical className="bi" />
            <span className="visually-hidden">Toggle roll menu dropdown</span>
          </button>

          <RollMenu
            eventDelegate={this.props.eventDelegate}
            width="calc(768px - 300px - 2em)" />
        </div>

        <input
          ref={this.inputRef}
          id="notation-input"
          type="text"
          className="form-control form-control-lg border-0 bg-transparent rounded-0"
          value={this.state.inputValue}
          onChange={event => this.setState({ inputValue: event.target.value })}
          placeholder="Dice notation" />

        <div className="align-self-stretch my-2 px-2">
          <button type="submit" className="send-button" disabled={this.state.inputValue.length === 0}>
            <ArrowUp className="bi" />
            <span className="visually-hidden">Submit roll</span>
          </button>
        </div>
      </form>
    )
  }
}

export default RollLogFooterNotationTextBox
