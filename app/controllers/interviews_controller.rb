class InterviewsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_quiz
  
  def new
    # @quiz = Quiz.find(params[:quiz_id])
    # @interview = Interview.new
  end

  def create
    if @quiz.interviews.started_by(current_user).exists?
        redirect_to new_quiz_answer_path(@quiz)
     else
        @interview = @quiz.interviews.new(interview_params)
        @interview.save
        redirect_to new_quiz_answer_path(@quiz)
     end
  end

  def show
    render "interviews/show.html.erb"
  end

  private

    def interview_params
      @first_question = @quiz.questions.first
      params.permit.merge(quiz_id: @quiz.id, user_id: current_user.id, current_question_id: @first_question.id)
    end

    def set_quiz
      @quiz = Quiz.find(params[:quiz_id])
    end
end
