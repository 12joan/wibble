import React from 'react'
import Modal from 'bootstrap/js/dist/modal'

const PreferencesCheckbox = props => (
  <div className={`form-check ${props.className || ''}`}>
    <input
      className="form-check-input"
      id={`preferences-${props.name}`}
      type="checkbox"
      checked={props.eventDelegate.getUserPreference(props.name)}
      onChange={event => props.eventDelegate.setUserPreference(props.name, event.target.checked)} />

    <label className="form-check-label" htmlFor={`preferences-${props.name}`}>{props.label}</label>
  </div>
)

class PreferencesModal extends React.Component {
  constructor(props) {
    super(props)

    this.modalRef = React.createRef()
  }

  componentDidMount() {
    this.bootstrapModal = new Modal(this.modalRef.current, {})
  }

  show() {
    this.bootstrapModal.show()
  }

  render() {
    return (
      <div ref={this.modalRef} className="modal fade" id="preferences-modal" tabIndex="-1" aria-label="User preferences" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body container-fluid">
              <div className="row justify-content-between align-items-center">
                <div className="col-auto">
                  <h2 className="m-0">User preferences</h2>
                </div>

                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-white"
                    onClick={() => this.bootstrapModal.hide()}>
                    Close
                  </button>
                </div>
              </div>

              <h5 className="mt-3">Useful options</h5>

              <PreferencesCheckbox
                eventDelegate={this.props.eventDelegate}
                name="prefersRollAnimation"
                label="Show animation for new dice rolls" />

              <h5 className="mt-3">Useless options</h5>

              <PreferencesCheckbox
                eventDelegate={this.props.eventDelegate}
                name="testOption1"
                label="This is an option" />

              <PreferencesCheckbox
                eventDelegate={this.props.eventDelegate}
                name="testOption2"
                label="This is also an option" />

              <PreferencesCheckbox
                eventDelegate={this.props.eventDelegate}
                name="testOption3"
                label="This, however, is an option" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PreferencesModal
