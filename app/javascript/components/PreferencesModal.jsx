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

const PreferencesSlider = props => {
  const value = props.eventDelegate.getUserPreference(props.name)

  return (
    <div className={`${props.className || ''} mb-n1`}>
      <label className="form-label" htmlFor={`preferences-${props.name}`}>{props.label} ({value})</label>

      <input
        className="form-range"
        id={`preferences-${props.name}`}
        type="range"
        value={value}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={event => props.eventDelegate.setUserPreference(props.name, event.target.value)} />
    </div>
  )
}

const PreferencesText = props => (
  <div className={props.className}>
    <label className="form-label" htmlFor={`preferences-${props.name}`}>{props.label}</label>

    <input
      className="form-control"
      id={`preferences-${props.name}`}
      type="text"
      value={props.eventDelegate.getUserPreference(props.name)}
      placeholder={props.placeholder}
      onChange={event => props.eventDelegate.setUserPreference(props.name, event.target.value)}
      onBlur={event => {
        if (!event.target.value.match(/[^\s]/)) {
          props.eventDelegate.setUserPreference(props.name, props.defaultIfEmpty)
        }
      }} />
  </div>
)

const PreferencesSelect = props => (
  <div className={props.className}>
    <label className="form-label" htmlFor={`preferences-${props.name}`}>{props.label}</label>

    <select
      className="form-select"
      id={`preferences-${props.name}`}
      value={props.eventDelegate.getUserPreference(props.name)}
      onChange={event => {
        props.eventDelegate.setUserPreference(props.name, props.mapValues(event.target.value))
      }}>
      {
        Object.entries(props.options).map(([label, value]) => (
          <option key={value} value={value}>{label}</option>
        ))
      }
    </select>
  </div>
)

PreferencesSelect.defaultProps = {
  mapValues: x => x,
}

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
    const prefersGraphicalDiceButtons = this.props.eventDelegate.getUserPreference('prefersGraphicalDiceButtons')
    const prefersDiceRollSound = this.props.eventDelegate.getUserPreference('prefersDiceRollSound')
    const sidebarAppears = this.props.eventDelegate.getUserPreference('sidebarAppears')

    return (
      <div ref={this.modalRef} className="modal fade" id="preferences-modal" tabIndex="-1" aria-label="User preferences" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body pt-0 container-fluid">
              <div className="row justify-content-between align-items-center mb-n3 py-3">
                <div className="col-auto">
                  <h2 className="mb-3">User preferences</h2>
                </div>

                <div className="col-auto ms-auto">
                  <button
                    type="button"
                    className="btn btn-white mb-3"
                    onClick={() => this.bootstrapModal.hide()}>
                    Close
                  </button>
                </div>
              </div>

              <div className="mx-n3 border-bottom" />

              <div className="row mt-4 mb-n4">
                <div className="col-md-auto mb-4">
                  <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    {
                      [
                        ['roll-log', 'Roll log', true],
                        ['dice-buttons', 'Dice buttons'],
                        ['sidebar', 'Sidebar'],
                        ['application-data', 'Application data'],
                      ].map(([tabId, tabName, active]) => (
                        <button
                          className={`nav-link ${active ? 'active' : ''} text-start py-1 px-3 mb-1`}
                          id={`v-pills-${tabId}-tab`}
                          data-bs-toggle="pill"
                          data-bs-target={`#v-pills-${tabId}`}
                          type="button"
                          role="tab"
                          aria-controls={`v-pills-${tabId}`}
                          aria-selected={active === true}>
                          {tabName}
                        </button>
                      ))
                    }
                  </div>
                </div>

                <div className="col-md tab-content mb-4" id="v-pills-tabContent">
                  <div class="tab-pane fade mt-n3 show active" id="v-pills-roll-log" role="tabpanel" aria-labelledby="v-pills-roll-log-tab">
                    <PreferencesSelect
                      eventDelegate={this.props.eventDelegate}
                      name="rollResultDirection"
                      className="mt-3"
                      label="Roll result position"
                      options={{
                        'Left': 'normal',
                        'Right': 'reversed',
                      }} />

                    <fieldset className="mt-3">
                      <legend className="fs-6">Dice theme</legend>

                      <div className="card card-body">
                        <div className="row g-2">
                          {
                            Object.entries({
                              'Dark': {
                                primary: '#404040',
                                secondary: '#ffffff',
                                buttonOutline: '#404040',
                              },

                              'Light': {
                                primary: '#eeeeee',
                                secondary: '#404040',
                                buttonOutline: '#404040',
                              },

                              'Metalic': {
                                primary: '#bbbbbb',
                                secondary: '#404040',
                                buttonOutline: '#404040',
                              },

                              'Red': {
                                primary: '#aa0000',
                                secondary: '#ffffff',
                                buttonOutline: '#aa0000',
                              },

                              'Green': {
                                primary: '#449944',
                                secondary: '#ffffff',
                                buttonOutline: '#449944',
                              },

                              'Blue': {
                                primary: '#004499',
                                secondary: '#ffffff',
                                buttonOutline: '#004499',
                              },
                            }).map(([themeName, themeData]) => (
                              <div key={themeName} className="col-12 col-sm-6 col-md-4 d-grid">
                                <button
                                  type="button"
                                  className="btn btn-white"
                                  onClick={() => this.props.eventDelegate.setUserPreference('diceTheme', themeData)}>
                                  {themeName}
                                </button>
                              </div>
                            ))
                          }
                        </div>

                        <PreferencesText
                          eventDelegate={this.props.eventDelegate}
                          name="diceTheme[primary]"
                          className="mt-3"
                          label="Fill colour"
                          placeholder="#404040"
                          defaultIfEmpty="#404040" />

                        <PreferencesText
                          eventDelegate={this.props.eventDelegate}
                          name="diceTheme[secondary]"
                          className="mt-3"
                          label="Text colour"
                          placeholder="#ffffff"
                          defaultIfEmpty="#ffffff" />

                        {
                          prefersGraphicalDiceButtons && (
                            <PreferencesText
                              eventDelegate={this.props.eventDelegate}
                              name="diceTheme[buttonOutline]"
                              className="mt-3"
                              label="Button outline colour"
                              placeholder="#404040"
                              defaultIfEmpty="#404040" />
                          )
                        }
                      </div>
                    </fieldset>

                    <PreferencesCheckbox
                      eventDelegate={this.props.eventDelegate}
                      name="prefersRollAnimation"
                      className="mt-3"
                      label="Show animation for new dice rolls" />

                    <PreferencesCheckbox
                      eventDelegate={this.props.eventDelegate}
                      name="prefersDiceRollSound"
                      className="mt-3"
                      label="Play dice roll sound" />

                    {
                      prefersDiceRollSound && (
                        <>
                          <PreferencesSlider
                            eventDelegate={this.props.eventDelegate}
                            name="diceRollSoundVolume"
                            className="mt-3"
                            label="Dice roll sound volume"
                            min={0}
                            max={1}
                            step={0.01} />

                          <button
                            className="btn btn-white mt-3"
                            onClick={this.props.eventDelegate.playDiceRollSound}>
                            Preview dice roll sound
                          </button>
                        </>
                      )
                    }
                  </div>

                  <div class="tab-pane fade mt-n3" id="v-pills-dice-buttons" role="tabpanel" aria-labelledby="v-pills-dice-buttons-tab">
                    <PreferencesSelect
                      eventDelegate={this.props.eventDelegate}
                      name="prefersGraphicalDiceButtons"
                      className="mt-3"
                      label="Dice button appearance"
                      options={{
                        'Text labels': false,
                        'Graphical labels': true,
                      }}
                      mapValues={x => x === 'true'} />

                    {
                      prefersGraphicalDiceButtons && (
                        <>
                          <PreferencesSlider
                            eventDelegate={this.props.eventDelegate}
                            name="graphicalDiceButtonSize"
                            className="mt-3"
                            label="Dice button size"
                            min={1}
                            max={10}
                            step={0.1} />

                          <PreferencesCheckbox
                            eventDelegate={this.props.eventDelegate}
                            name="showGrahicalDiceButtonsAsOutlines"
                            className="mt-3"
                            label="Show dice button icons as outlines" />
                        </>
                      )
                    }

                    <fieldset className="mt-3">
                      <legend className="fs-6">Show and hide dice buttons</legend>

                      <div className="card card-body">
                        <div className="row mx-0 gx-5">
                          {
                            ['d20', 'd4', 'd6', 'd8', 'd10', 'd12', 'd100'].map(dieType => (
                              <PreferencesCheckbox
                                key={dieType}
                                eventDelegate={this.props.eventDelegate}
                                name={`showDiceButtons[${dieType}]`}
                                className="col-6 col-sm-4 col-lg-3 form-switch"
                                label={dieType} />
                            ))
                          }
                        </div>
                      </div>
                    </fieldset>
                  </div>

                  <div class="tab-pane fade mt-n3" id="v-pills-sidebar" role="tabpanel" aria-labelledby="v-pills-sidebar-tab">
                    <PreferencesSelect
                      eventDelegate={this.props.eventDelegate}
                      name="sidebarAppears"
                      className="mt-3"
                      label="Sidebar appears"
                      options={{
                        'Always': 'always',
                        'On larger screens': 'sometimes',
                        'Never': 'never',
                      }} />

                    {
                      sidebarAppears !== 'never' && (
                        <>
                          <PreferencesSelect
                            eventDelegate={this.props.eventDelegate}
                            name="sidebarPosition"
                            className="mt-3"
                            label="Sidebar position"
                            options={{
                              'Left': 'left',
                              'Right': 'right',
                            }} />

                          <PreferencesSlider
                            eventDelegate={this.props.eventDelegate}
                            name="sidebarWidth"
                            className="mt-3"
                            label="Sidebar width"
                            min={50}
                            max={1200} />
                        </>
                      )
                    }
                  </div>

                  <div class="tab-pane fade mt-n3" id="v-pills-application-data" role="tabpanel" aria-labelledby="v-pills-application-data-tab">
                    <h5 className="mt-3 mb-0">Import/Export application data</h5>

                    <div className="mt-3 d-grid gap-2 d-md-block">
                      <button
                        type="button"
                        className="btn btn-white"
                        onClick={this.props.eventDelegate.importUserPreferences}>
                        Import JSON
                      </button>

                      {' '}

                      <button
                        type="button"
                        className="btn btn-white"
                        onClick={this.props.eventDelegate.exportUserPreferences}>
                        Export JSON
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PreferencesModal
