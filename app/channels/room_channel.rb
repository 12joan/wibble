class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from stream_name
  end

  def receive(data)
    Rails.logger.error stream_name.inspect
    ActionCable.server.broadcast stream_name, data
  end

  def unsubscribed
  end

  private

  def stream_name
    "room_#{params[:id]}"
  end
end
