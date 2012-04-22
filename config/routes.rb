Hipster::Application.routes.draw do
  root :to => "home#index"
  match '/vinyl' => "home#vinyl"
  resources :users, :only => [ :show, :edit, :update ]
  match '/auth/:provider/callback' => 'sessions#create'
  match '/signin' => 'sessions#new', :as => :signin
  match '/signout' => 'sessions#destroy', :as => :signout
  match '/auth/failure' => 'sessions#failure'
end
