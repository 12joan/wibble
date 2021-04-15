class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from stream_name
  end

  def receive(data)
    roll = DiceRoller.perform_roll(data['roll'])

    ActionCable.server.broadcast stream_name, data.merge(
      roll: roll,
    )
  end

  def unsubscribed
  end

  private

  def stream_name
    "room_#{params[:id]}"
  end
end
