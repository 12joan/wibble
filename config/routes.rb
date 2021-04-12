Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  root 'application#home'

  resources :room, only: [:create, :show]
end
