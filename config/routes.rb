Rails.application.routes.draw do
  resources :quizzes
  root 'application#hello'
end
