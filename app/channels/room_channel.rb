class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_#{params[:id]}"
  end

  def receive(data)
  end

  def unsubscribed
  end
end
