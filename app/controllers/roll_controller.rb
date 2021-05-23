class RollController < ApplicationController
  skip_before_action :verify_authenticity_token

  # POST /rooms/:room_id/roll
  def create
    data = JSON.parse(params[:data])

    roll = DiceRoller.perform_roll(data['roll'])

    ActionCable.server.broadcast "room_#{params[:room_id]}", data.merge(
      roll: roll,
    )
  end
end
