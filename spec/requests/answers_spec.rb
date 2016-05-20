require 'rails_helper'

RSpec.describe "Answers", type: :request do
  before(:each) do
    @user = User.create!(email: "user@example.org", name: "Name")
    sign_in @user
    @quiz = Quiz.create!(name: 'This is quiz #1')
    @interview = Interview.create!(quiz_id: 1, user_id: 1, current_question_id: 1)
    @quiz.questions.create!(content: 'This is question #1', record_time_limit: 10)
    @first_question = @quiz.questions.first
  end

  describe "GET /answers" do
    it "works! (now write some real specs)" do
      get new_quiz_answer_path(@quiz)
      expect(response).to have_http_status(200)
    end
  end
end
