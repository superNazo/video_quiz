require 'rails_helper'

RSpec.describe "quizzes/index", type: :view do

  before(:each) do
    @user = assign(:user, User.create!(email: "user@example.org", name: "Name"))
    sign_in @user
    @completed_quizzes = Interview.where(user_id: @user.id)
    view.stub(:will_paginate)
    assign(:quizzes, [
      Quiz.create!(
        name: "Name"
      ),
      Quiz.create!(
        name: "Name2"
      )
    ])
  end

  it "renders a list of quizzes" do
    render
    assert_select "div=>span", :text => "Name".to_s, :count => 2
  end
end
