Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do 
      resources :connections, only: %i[create]
      # resources :user_groups
      # resources :groups
      # resources :user_specialties
      resources :specialties, only: %i[index]
      resources :users, only: %i[index create]
      # resources :reviews
      # resources :journals
      # resources :studies
      resources :conversations, only: %i[index create]
      resources :messages, only: %i[create]

      post '/login', to: 'auth#create'
      get '/profile', to: 'users#profile'

      patch '/accept_connection', to: 'connections#accept'
      delete '/reject_connection', to: 'connections#reject'
    end
  end

  mount ActionCable.server => '/cable'
end
