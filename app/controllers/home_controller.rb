class HomeController < ApplicationController
  def index
    redirect_to quizzes_path if user_signed_in?
  end
end
