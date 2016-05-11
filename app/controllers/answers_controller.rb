class AnswersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_quiz
  before_action :set_interview
  before_action :set_question, only: [:create]
  before_action :set_answer, only: [:show, :edit, :update, :destroy]

  # GET /answers/new
  def new
    if @interview.current_question_id != 0
      @answer = @interview.answers.build
    else
      redirect_to quiz_interviews_show_path, notice: 'You have alread passed this quiz!'
    end
  end

  # POST /answers
  # POST /answers.json
  def create
    @answer = @question.answers.new(answer_params)

    respond_to do |format|
      if @answer.save
        format.html do
          redirect_to new_quiz_answer_path(@quiz),
                      notice: 'Answer was successfully created.'
        end
        format.json { render :show, status: :created, location: [@quiz, @answer] }
        interview_next_question
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
      @interview = @quiz.interviews.started_by(current_user).last
    end
    # def set_interview
    #   @interview = if @quiz.interviews.started_by(current_user).exists?
    #                  @quiz.interviews.started_by(current_user).last
    #                else
    #                  @quiz.interviews.create(interview_params)
    #                end
    # end

    def set_question
      @question = @quiz.questions.find(@interview.current_question_id)
    end

    def set_answer
      @answer = Answer.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def answer_params
      params.require(:answer).permit(:video_token).merge(interview_id: @interview.id)
    end

    # def interview_params
    #   @first_question = @quiz.questions.first
    #   params.permit.merge(quiz_id: @quiz.id, user_id: current_user.id, current_question_id: @first_question.id)
    # end
    
    def interview_next_question
      if @interview.current_question_id != @quiz.questions.last.id
        @interview.update(current_question_id: @question.next.id, status: 'In progress')
      else
        @interview.update(current_question_id: 0, status: 'Completed')
      end
    end
end
