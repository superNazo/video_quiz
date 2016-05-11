Rails.application.routes.draw do
  get "video_recorder", to: "video_recorder#index"
  # get "interviews/new", to: "interviews#new"
  resources :quizzes do
    resources :answers
    get "interviews/new", to: "interviews#new"
    get "interviews/show", to: "interviews#show"
    post "interviews/create", to: "interviews#create"
  end

  devise_for :users, skip: [:password, :sessions],
                     controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  devise_scope :user do
    delete "sign_out", to: "devise/sessions#destroy", as: :destroy_user_session
  end

  root to: "home#index"
end
