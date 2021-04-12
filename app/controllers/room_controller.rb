class RoomController < ApplicationController
  # POST /rooms
  def create
    redirect_to room_path(id: SecureRandom.base58(8))
  end

  # GET /rooms/:id
  def show
    @room_id = params[:id]

    if @room_id.blank? || @room_id.length > 64
      redirect_to '/', notice: 'Invalid room ID'
    end
  end
end
