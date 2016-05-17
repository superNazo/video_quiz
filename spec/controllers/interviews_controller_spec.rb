require 'rails_helper'

RSpec.describe InterviewsController, type: :controller do
  before(:each) do
    @user = User.create!(email: "user@example.org", name: "Name")
    sign_in @user
    @quiz = Quiz.create!(name: 'This is quiz #1')
    @quiz.questions.create!(content: 'This is question #1', record_time_limit: 10)
    @first_question = @quiz.questions.first
  end

  let(:valid_attributes) {
    { user_id: 1, current_question_id: @first_question.id }
  }

  let(:valid_session) { {} }

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Interview" do
        expect {
          post :create, {:quiz_id => @quiz.id, :interview => valid_attributes}, valid_session
        }.to change(Interview, :count).by(1)
      end

      it "assigns a newly created answer as @answer" do
        post :create, {:quiz_id => @quiz.id, :answer => valid_attributes}, valid_session
        expect(assigns(:interview)).to be_a(Interview)
        expect(assigns(:interview)).to be_persisted
      end

      it "redirects to the created interview" do
        post :create, {:quiz_id => @quiz.id, :interview => valid_attributes}, valid_session
        expect(response).to redirect_to(new_quiz_answer_path)
      end
    end
  end
end
