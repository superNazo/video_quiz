class AnswersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_quiz
  before_action :set_interview, only: [:index, :new, :create, :update]
  before_action :set_question, only: [:create]
  before_action :set_answer, only: [:show, :edit, :update, :destroy]

  # GET /answers
  # GET /answers.json
  def index
    @answers = @interview.answers.belonging_to(@interview)
  end

  # GET /answers/1
  # GET /answers/1.json
  def show
  end

  # GET /answers/new
  def new
    if @interview.current_question_id != 0
      @answer = @interview.answers.build
    else
      redirect_to quizzes_path, notice: 'You have alread passed this quiz!'
    end
  end

  # GET /answers/1/edit
  def edit
  end

  # POST /answers
  # POST /answers.json
  def create
    @answer = @question.answers.create(answer_params)
    interview_next_question

    respond_to do |format|
      if @answer.save
        format.html do
          redirect_to new_quiz_answer_path(@quiz),
                      notice: 'Answer was successfully created.'
        end
        format.json { render :show, status: :created, location: [@quiz, @answer] }
      else
        format.html { render :new }
        format.json { render json: @answer.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /answers/1
  # PATCH/PUT /answers/1.json
  def update
    respond_to do |format|
      if @answer.update(answer_params)
        format.html { redirect_to quiz_answer_path(@quiz, @answer), notice: 'Answer was successfully updated.' }
        format.json { render :show, status: :ok, location: [@quiz, @answer] }
      else
        format.html { render :edit }
        format.json { render json: @answer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /answers/1
  # DELETE /answers/1.json
  def destroy
    @answer.destroy
    respond_to do |format|
      format.html { redirect_to quiz_answers_url, notice: 'Answer was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_quiz
    @quiz = Quiz.find(params[:quiz_id])
  end

  def set_interview
    @interview = if @quiz.interviews.started_by(current_user).exists?
                   @quiz.interviews.started_by(current_user).last
                 else
                   @quiz.interviews.create(interview_params)
                 end
  end

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

  def interview_params
    @first_question = @quiz.questions.first
    params.permit.merge(quiz_id: @quiz.id, user_id: current_user.id, current_question_id: @first_question.id)
  end

  def interview_next_question
    if @interview.current_question_id != @quiz.questions.last.id
      @interview.update(current_question_id: @question.next.id, status: 'In progress')
    else
      @interview.update(current_question_id: 0, status: 'Completed')
    end
  end
end
