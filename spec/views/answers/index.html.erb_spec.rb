require 'rails_helper'

RSpec.describe "answers/index", type: :view do
  before(:each) do
    @user = assign(:user, User.create!(email: "user@example.org", name: "Name"))
    sign_in @user
    @quiz = assign(:quiz, Quiz.create!(
      :name => "Quiz #1"
    ))
    @quiz.questions.create!(content: "This is question #1")
    @first_question = @quiz.questions.first
    @interview = @quiz.interviews.create(quiz_id: @quiz.id, user_id: @user.id, current_question_id: @first_question.id)

    assign(:answers, [
      Answer.create!(
        :interview_id => 1,
        :video_token => "Video Token"
      ),
      Answer.create!(
        :interview_id => 1,
        :video_token => "Video Token"
      )
    ])
  end

  it "renders a list of answers" do
    render
    assert_select "div=>p", :text => "Video Token".to_s, :count => 2
  end
end
