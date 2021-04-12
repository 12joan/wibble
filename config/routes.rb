Rails.application.routes.draw do
  root 'application#home'

  resources :room, only: [:create, :show]
end
