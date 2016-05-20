class AnswersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_quiz
  before_action :set_interview
  before_action :set_question, only: [:create]
  
  def new
    if @interview.completed?
      redirect_to quiz_interview_path, notice: 'You have alread passed this quiz!'
    else
      @answer = @interview.answers.build
    end
  end

  def create
    @answer = @question.answers.new(answer_params)

    respond_to do |format|
      if @answer.save
        format.html do
          redirect_to new_quiz_answer_path(@quiz),
                      notice: 'Answer was successfully created.'
        end
        format.json { render :show, status: :created, location: [@quiz, @answer] }
        @interview.set_next_question!(@quiz)
      else
        format.html { render :new }
        format.json { render json: @answer.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def set_quiz
    @quiz = Quiz.find(params[:quiz_id])
  end

  def set_interview
    @interview = @quiz.interviews.started_by(current_user).first
  end

  def set_question
    @question = @quiz.questions.find(@interview.current_question_id)
  end

  def answer_params
    params.require(:answer).permit(:video_token).merge(interview_id: @interview.id)
  end
end
