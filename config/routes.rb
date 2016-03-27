Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  resources :quizzes
  get "home/index"
  devise_for :users, skip: [:password, :sessions],
              controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  devise_scope :user do
    delete "sign_out", to: "devise/sessions#destroy", as: :destroy_user_session
  end

  root to: "home#index"
end
