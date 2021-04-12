import consumer from './consumer'

const subscribe = props => (
  consumer.subscriptions.create(
    {
      channel: 'RoomChannel',
      id: props.roomId,
    },

    {
      connected() {
        props.onConnect?.()
      },

      disconnected() {
        props.onDisconnect?.()
      },

      received(data) {
        props.onReceived?.(data)
      },
    }
  )
)

export default {
  subscribe,
}

