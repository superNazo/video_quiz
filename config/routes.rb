Rails.application.routes.draw do
  get "video_recorder", to: "video_recorder#index"
  resources :quizzes

  devise_for :users, skip: [:password, :sessions],
                     controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  devise_scope :user do
    delete "sign_out", to: "devise/sessions#destroy", as: :destroy_user_session
    get "omniauth_callbacks/success", to: "users/omniauth_callbacks#success", as: :logged_in_success
  end

  root to: "home#index"
end
