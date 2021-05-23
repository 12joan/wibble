Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  root 'application#home'

  resources :room, only: [:create, :show] do
    resources :roll, only: [:create]
  end
end
