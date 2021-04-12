require "test_helper"

class RoomControllerTest < ActionDispatch::IntegrationTest
  test 'create room' do
    post room_index_url
    assert_redirected_to %r(/room/[a-zA-Z0-9]+\Z)
  end

  test 'show room' do
    get room_url(id: 'MyRoom')
    assert_response :success
  end
end
