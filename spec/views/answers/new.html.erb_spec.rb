require 'rails_helper'

RSpec.describe "answers/new", type: :view do
  before(:each) do
    assign(:answer, Answer.new(
      :interview => nil,
      :video_token => "MyString"
    ))
  end

  it "renders new answer form" do
    render

    assert_select "form[action=?][method=?]", answers_path, "post" do

      assert_select "input#answer_interview_id[name=?]", "answer[interview_id]"

      assert_select "input#answer_video_token[name=?]", "answer[video_token]"
    end
  end
end
