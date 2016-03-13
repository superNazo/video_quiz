Rails.application.routes.draw do
  get "video_recorder", to: "video_recorder#index"
  resources :quizzes
  root "application#hello"
end
