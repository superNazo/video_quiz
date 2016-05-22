require 'rails_helper'

RSpec.describe AnswersController, type: :controller do
  before(:each) do
    @user = User.create!(email: "user@example.org", name: "Name")
    sign_in @user
    @quiz = Quiz.create!(name: 'This is quiz #1')
    @interview = Interview.create!(quiz_id: 1, user_id: 1, current_question_id: 1)
    @quiz.questions.create!(content: 'This is question #1', record_time_limit: 10)
    @first_question = @quiz.questions.first
  end

  let(:valid_attributes) {
    { interview_id: 1, video_token: 'myString' }
  }

  let(:invalid_attributes) {
    { interview_id: '', video_token: '' }
  }

  let(:valid_session) { {} }

  describe "GET #new" do
    it "assigns a new answer as @answer" do
      get :new, {:quiz_id => @quiz.id}, valid_session
      expect(assigns(:answer)).to be_a_new(Answer)
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Answer" do
        expect {
          post :create, {:quiz_id => @quiz.id, :answer => valid_attributes}, valid_session
        }.to change(Answer, :count).by(1)
      end

      it "assigns a newly created answer as @answer" do
        post :create, {:quiz_id => @quiz.id, :answer => valid_attributes}, valid_session
        expect(assigns(:answer)).to be_a(Answer)
        expect(assigns(:answer)).to be_persisted
      end

      it "redirects to the quiz_interview_path" do
        post :create, {:quiz_id => @quiz.id, :answer => valid_attributes}, valid_session
        get :new, {:quiz_id => @quiz.id}, valid_session
        expect(response).to redirect_to(quiz_interview_path)
      end
    end

    context "with invalid params" do
      it "assigns a newly created but unsaved answer as @answer" do
        post :create, {:quiz_id => @quiz.id, :answer => invalid_attributes}, valid_session
        expect(assigns(:answer)).to be_a_new(Answer)
      end

      it "re-renders the 'new' template" do
        post :create, {:quiz_id => @quiz.id, :answer => invalid_attributes}, valid_session
        expect(response).to render_template("new")
      end
    end
  end
end
