import React from 'react'
import { ThreeDotsVertical, ArrowUpSquareFill } from 'react-bootstrap-icons'
import RollMenu from 'components/RollMenu'


class RollLogFooterNotationTextBox extends React.Component {
  constructor(props) {
    super(props)

    this.inputRef = React.createRef()

    this.state = {
      historyPointer: 0,
      localHistory: [],
    }
  }

  componentDidMount() {
    this.inputRef.current.addEventListener('keydown', event => {
      switch (event.key) {
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

    const input = this.inputRef.current

    if (previousPointer !== newPointer) {
      this.setState({
        localHistory: [
          ...this.state.localHistory.slice(0, previousPointer),
          input.value,
          ...this.state.localHistory.slice(previousPointer + 1),
        ],
      })

      const localHistoryValue = this.state.localHistory[newPointer]
      const globalHistoryValue = this.globalHistory()[newPointer - 1]

      const newValue = localHistoryValue === undefined ? globalHistoryValue : localHistoryValue

      if (newValue !== undefined) {
        input.value = newValue
      }
    }
  }

  globalHistory() {
    return this.props.eventDelegate.getUserPreferences().upArrowHistory
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

    const inputValue = target.querySelector('input[type=text]').value

    this.addHistoryEntry(inputValue, () => {
      const rolls = inputValue.split(/;/)

      const performRolls = ([rawNotation, ...otherRolls]) => {
        const nameRegex = /["'‘’‚‛“”„‟〝〞〟＂＇](.*)["'‘’‚‛“”„‟〝〞〟＂＇]/

        const [, name] = rawNotation.match(nameRegex) || ["no match", null]
        const notation = rawNotation.replace(nameRegex, "").trim()

        this.props.eventDelegate.performRoll({
          name,
          notation,
        })

        if (otherRolls.length > 0) {
          setTimeout(() => performRolls(otherRolls), 100)
        }
      }

      performRolls(rolls)

      target.reset()
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
          </button>

          <RollMenu eventDelegate={this.props.eventDelegate} width="calc(768px - 300px - 2em)" />
        </div>

        <input
          ref={this.inputRef}
          type="text"
          className="form-control form-control-lg border-0 bg-transparent rounded-0"
          placeholder="Dice notation" />

        <div className="align-self-stretch my-2 px-2">
          <button type="submit" className="send-button">
            <ArrowUpSquareFill className="bi" size="1.5em" />
          </button>
        </div>
      </form>
    )
  }
}

export default RollLogFooterNotationTextBox
