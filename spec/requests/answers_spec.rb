require 'rails_helper'

RSpec.describe "Answers", type: :request do

  before(:each) do
    @user = User.create!(email: "user@example.org", name: "Name")
    sign_in @user
    @quiz = Quiz.create!(name: 'This is quiz #1')
    @quiz.questions.create!(content: 'This is question #1')
    @first_question = @quiz.questions.first
  end

  describe "GET /answers" do
    it "works! (now write some real specs)" do
      get quiz_answers_path(@quiz.id)
      expect(response).to have_http_status(200)
    end
  end
end
