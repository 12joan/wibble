import React from 'react'
import { useState } from 'react'

const RollLogNotificationBanner = props => {
  const [visible, setVisible] = useState(() => ('Notification' in window) && Notification.permission !== 'granted')
  const [denied, setDenied] = useState(false)

  const requestPermission = () => Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      setVisible(false)
      new Notification('Notifications enabled', {
        body: 'We\'ll notify you about any rolls that are made while this tab is hidden. You can disable this in user preferences.',
      })
    } else {
      setDenied(true)
    }
  })

  return visible && (
    <div className="border-bottom p-3">
      <div className="d-flex align-items-className gap-3">
        <button type="button" className="btn btn-white" onClick={requestPermission}>Enable Notifications</button>
        <button type="button" className="btn-close ms-auto" aria-label="Close" onClick={() => setVisible(false)} />
      </div>

      {
        denied && (
          <div className="text-danger mt-3" role="status">
            We couldn't get permission to send notifications. 😢
          </div>
        )
      }
    </div>
  )
}

export default RollLogNotificationBanner
