import React from 'react'
import { PencilSquare } from 'react-bootstrap-icons'
import { userName as defaultUserName } from 'lib/constants'

class RollLogHeaderPostingAs extends React.Component {
  constructor(props) {
    super(props)

    this.inputRef = React.createRef()

    this.state = {
      editingName: false,
    }
  }

  startEditing() {
    this.setState({ editingName: true }, () => {
      const input = this.inputRef.current

      input.addEventListener('keyup', event => {
        if (event.key === 'Enter') {
          this.stopEditing()
        }
      })

      input.select()
    })
  }

  stopEditing() {
    this.setState({ editingName: false })

    if (/^\s*$/.test(this.getName())) {
      this.setName(defaultUserName)
    }
  }

  handleNameInputChange(event) {
    this.setName(event.target.value)
  }

  getName() {
    return this.props.eventDelegate.getUserPreference('name')
  }

  setName(value) {
    this.props.eventDelegate.setUserPreference('name', value)
  }

  render() {
    const name = this.getName()

    return (
      <>
        <div className="text-muted">Posting as</div>
        {
          this.state.editingName
            ? (
              <input
                ref={this.inputRef}
                type="text"
                className="form-control form-control-sm"
                onBlur={this.stopEditing.bind(this)}
                onChange={this.handleNameInputChange.bind(this)}
                value={name}
                autoFocus />
            )

            : (
              <button
                className="btn btn-link d-flex text-decoration-none text-start"
                onClick={this.startEditing.bind(this)}>
                <div className="me-1">
                  <PencilSquare className="bi" />
                </div>

                <div className="text-wrap">{name}</div>
              </button>
            )
        }
      </>
    )
  }
}

export default RollLogHeaderPostingAs
