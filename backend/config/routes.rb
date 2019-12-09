Rails.application.routes.draw do
  namespace :v1 do
      resources :posts
      get 'my-cv', controller: :cv, action: :get_cv
      resources :jobs
      namespace :users do
        post 'refresh', controller: :refresh, action: :create
        post 'signin', controller: :signin, action: :create
        post 'signup', controller: :signup, action: :create
        delete 'signin', controller: :signin, action: :destroy      
        get 'me', controller: :user, action: :me
        post 'update', controller: :user, action: :update_profile
        post 'reset-password', controller: :password_resets, action: :reset_password
        post 'update-password', controller: :password_resets, action: :update_password
      end
      namespace :admin do 
        get 'users', controller: :admin, action: :index
      end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
