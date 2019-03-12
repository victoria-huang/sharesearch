Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do 
      # resources :connections
      # resources :user_groups
      # resources :groups
      # resources :user_specialties
      resources :specialties, only: %i[index]
      resources :users, only: %i[index create]
      # resources :reviews
      # resources :journals
      # resources :studies

      post '/login', to: 'auth#create'
      get '/profile', to: 'users#profile'
    end
  end

  mount ActionCable.server => '/cable'
end
