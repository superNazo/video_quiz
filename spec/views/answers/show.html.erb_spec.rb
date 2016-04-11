require 'rails_helper'

RSpec.describe "answers/show", type: :view do
  before(:each) do
    @user = assign(:user, User.create!(email: "user@example.org", name: "Name"))
    sign_in @user
    @quiz = assign(:quiz, Quiz.create!(
      :name => "Quiz #1"
    ))
    @quiz.questions.create!(content: "This is question #1")
    @first_question = @quiz.questions.first
    @interview = @quiz.interviews.create(quiz_id: @quiz.id, user_id: @user.id, current_question_id: @first_question.id)
    @answer = assign(:answer, Answer.create!(
      :interview_id => 1,
      :video_token => "Video Token"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(//)
    expect(rendered).to match(/Video Token/)
  end
end
