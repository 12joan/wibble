class RollController < ApplicationController
  skip_before_action :verify_authenticity_token

  # POST /rooms/:room_id/roll
  def create
    data = JSON.parse(params[:data])

    result = DiceRoller.perform_roll(data['roll'])

    if result[:ok]
      ActionCable.server.broadcast "room_#{params[:room_id]}", data.merge(
        roll: result[:data],
      )

      render json: { ok: true }
    else
      render json: result
    end
  end
end
