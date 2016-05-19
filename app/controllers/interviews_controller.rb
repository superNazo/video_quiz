class InterviewsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_quiz
  
  def new
  end

  def create
    @interview = @quiz.check_interview(current_user, interview_params)

    respond_to do |format|
      if @interview.save
        format.html { redirect_to new_quiz_answer_path(@quiz), notice: 'Interview was successfully created.' }
        format.json { render :show, status: :created, location: @interview }
      end
    end
  end

  def show
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
