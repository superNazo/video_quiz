require 'rails_helper'

RSpec.describe "answers/new", type: :view do
  before(:each) do
    @user = assign(:user, User.create!(email: "user@example.org", name: "Name"))
    sign_in @user
    @quiz = assign(:quiz, Quiz.create!(
      :name => "Quiz #1"
    ))
    @quiz.questions.create!(content: "This is question #1")
    @first_question = @quiz.questions.first
    @interview = @quiz.interviews.create(quiz_id: @quiz.id, user_id: @user.id, current_question_id: @first_question.id)

    assign(:answer, Answer.new(
      :interview_id => 1,
      :video_token => "MyString"
    ))
  end

  it "renders new answer form" do
    render

    assert_select "form[action=?][method=?]", quiz_answers_path(@quiz), "post" do

      assert_select "input#answer_video_token[name=?]", "answer[video_token]"
    end
  end
end
